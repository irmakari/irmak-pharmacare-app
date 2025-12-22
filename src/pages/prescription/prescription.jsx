import React, { useEffect, useMemo, useState } from "react";
import TabBar from "../../components/tab-navigator/tabNavigator";
import { AllPharmaciesService, PrescriptionsService } from "../../collections";
import { PickupModal } from "../../components";
import "./prescription.css";
import PrescriptionHeader from "../../components/prescription-components/PrescriptionHeader";
import PrescriptionLookupCard from "../../components/prescription-components/PrescriptionLookupCard";
import PrescribedMedicinesCard from "../../components/prescription-components/PrescribedMedicinesCard";
import PrescriptionSummaryCard from "../../components/prescription-components/PrescriptionSummaryCard";
import PickupPharmacyCard from "../../components/prescription-components/PickupPharmacyCard";
import PickupTimeCard from "../../components/prescription-components/PickupTimeCard";

const Prescription = () => {
    const [prescriptionCode, setPrescriptionCode] = useState("");
    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [reservedMap, setReservedMap] = useState({});
    const [selectAll, setSelectAll] = useState(false);

    const [pharmacies, setPharmacies] = useState([]);
    const [pharmaciesLoading, setPharmaciesLoading] = useState(true);
    const [pharmaciesError, setPharmaciesError] = useState("");
    const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [neighborhoodFilter, setNeighborhoodFilter] = useState("");
    const [pickupTime, setPickupTime] = useState("ready-now");
    const [pickupCode, setPickupCode] = useState("");
    const [showPickupModal, setShowPickupModal] = useState(false);
    const [reservationError, setReservationError] = useState("");


    const statusTone = useMemo(() => {
        if (!prescription) return "";
        return prescription.status?.toLowerCase() === "active"
            ? "status-pill--active"
            : "status-pill--inactive";
    }, [prescription]);

    const handleRetrieve = async (e) => {
        e.preventDefault();
        const trimmed = prescriptionCode.trim();
        if (!trimmed) {
            setError("Lütfen geçerli bir reçete kodu girin.");
            return;
        }
        setLoading(true);
        setError("");
        setPrescription(null);
        try {
            const data = await PrescriptionsService.fetchByCode(trimmed);
            const found = Array.isArray(data) ? data[0] : null;

            const initialReserved = found.medicines?.reduce((acc, med) => {
                acc[med.id] = Boolean(med.reserved);
                return acc;
            }, {}) || {};

            setSelectAll(
                found.medicines?.length
                    ? found.medicines.every((med) => initialReserved[med.id])
                    : false
            );

            setReservedMap(initialReserved);
            setPrescription(found);
        } catch (err) {
            console.error("PRESCRIPTION_FETCH_ERROR", err);
            setError("Reçete bilgileri alınamadı. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadPharmacies = async () => {
            setPharmaciesLoading(true);
            setPharmaciesError("");
            try {
                const data = await AllPharmaciesService.fetchAllPharmacies();
                const list = Array.isArray(data) ? data : [];
                setPharmacies(list);
            } catch (err) {
                console.error("PHARMACIES_FETCH_ERROR", err);
                setPharmaciesError("Eczane listesi yüklenemedi. Lütfen tekrar deneyin.");
            } finally {
                setPharmaciesLoading(false);
            }
        };

        loadPharmacies();
    }, []);

    const cityOptions = useMemo(
        () => Array.from(new Set(pharmacies.map((p) => p.city).filter(Boolean))),
        [pharmacies]
    );
    const districtOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    pharmacies
                        .filter((p) => (cityFilter ? p.city === cityFilter : true))
                        .map((p) => p.district)
                        .filter(Boolean)
                )
            ),
        [pharmacies, cityFilter]
    );
    const neighborhoodOptions = useMemo(
        () =>
            Array.from(
                new Set(
                    pharmacies
                        .filter((p) =>
                            districtFilter ? p.district === districtFilter : cityFilter ? p.city === cityFilter : true
                        )
                        .map((p) => p.neighborhood)
                        .filter(Boolean)
                )
            ),
        [pharmacies, cityFilter, districtFilter]
    );

    const filteredPharmacies = useMemo(() => {
        return pharmacies.filter((p) => {
            const matchesSearch = searchTerm
                ? `${p.name} ${p.address} ${p.city} ${p.district} ${p.neighborhood}`
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                : true;
            const matchesCity = cityFilter ? p.city === cityFilter : true;
            const matchesDistrict = districtFilter ? p.district === districtFilter : true;
            const matchesNeighborhood = neighborhoodFilter ? p.neighborhood === neighborhoodFilter : true;
            return matchesSearch && matchesCity && matchesDistrict && matchesNeighborhood;
        });
    }, [pharmacies, searchTerm, cityFilter, districtFilter, neighborhoodFilter]);

    const selectedPharmacy = useMemo(
        () => pharmacies.find((p) => p.id === selectedPharmacyId),
        [pharmacies, selectedPharmacyId]
    );

    const pickupTimeText = useMemo(() => {
        const map = {
            "ready-now": "Ready now",
            "15-min": "15 minutes",
            "30-min": "30 minutes",
            "45-min": "45 minutes",
            "60-min": "1 hour",
        };
        return map[pickupTime] || "Ready now";
    }, [pickupTime]);

    const handleToggleMedicine = (id) => {
        setReservedMap((prev) => {
            const updated = { ...prev, [id]: !prev[id] };
            const meds = prescription?.medicines || [];
            const allSelected = meds.every((med) => updated[med.id]);
            setSelectAll(allSelected);
            return updated;
        });
    };

    const handleSelectAll = () => {
        if (!prescription?.medicines?.length) return;
        const next = !selectAll;
        const updated = {};
        prescription.medicines.forEach((med) => {
            updated[med.id] = next;
        });
        setReservedMap(updated);
        setSelectAll(next);
    };

    const handleReserve = () => {
        if (!prescription) return;
        if (!selectedPharmacy) {
            setReservationError("Lütfen pickup için bir eczane seçin.");
            return;
        }

        setReservationError("");
        const code = `#PC-${Math.floor(Math.random() * 90000 + 10000)}`;
        setPickupCode(code);
        setShowPickupModal(true);
    };

    return (
        <div className="prescription-page">
            <TabBar />

            <main className="prescription-content">
                <PrescriptionHeader/>
                <PrescriptionLookupCard
                    prescriptionCode={prescriptionCode}
                    onPrescriptionCodeChange={setPrescriptionCode}
                    onSubmit={handleRetrieve}
                    loading={loading}
                    error={error}
                />


                {prescription && (
                    <section className="prescription-cards">
                        <PrescriptionSummaryCard
                            prescription={prescription}
                            statusTone={statusTone}
                        />

                        <PrescribedMedicinesCard
                            medicines={prescription.medicines || []}
                            reservedMap={reservedMap}
                            selectAll={selectAll}
                            onSelectAll={handleSelectAll}
                            onToggleMedicine={handleToggleMedicine}
                        />
                    </section>
                )}

                {prescription && (
                    <PickupPharmacyCard
                        search={searchTerm}
                        onSearchChange={setSearchTerm}
                        city={cityFilter}
                        onCityChange={setCityFilter}
                        district={districtFilter}
                        onDistrictChange={setDistrictFilter}
                        neighborhood={neighborhoodFilter}
                        onNeighborhoodChange={setNeighborhoodFilter}
                        cityOptions={cityOptions}
                        districtOptions={districtOptions}
                        neighborhoodOptions={neighborhoodOptions}
                        pharmaciesLoading={pharmaciesLoading}
                        pharmaciesError={pharmaciesError}
                        pharmacies={filteredPharmacies}
                        selectedPharmacyId={selectedPharmacyId}
                        onSelectPharmacy={setSelectedPharmacyId}
                    />
                )}

                {prescription && (
                    <PickupTimeCard
                        pickupTime={pickupTime}
                        onPickupTimeChange={setPickupTime}
                        reservationError={reservationError}
                        onReserve={handleReserve}
                    />
                )}
            </main>

            <PickupModal
                open={showPickupModal}
                onClose={() => setShowPickupModal(false)}
                prescriptionNumber={prescription?.code}
                pharmacyName={selectedPharmacy?.name}
                pickupTimeText={pickupTimeText}
                pickupCode={pickupCode}
                medicines={prescription?.medicines?.filter((med) => reservedMap[med.id]) || []}
            />
        </div>
    );
};

export default Prescription;
