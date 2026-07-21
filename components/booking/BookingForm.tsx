"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ServiceItem {
    id: string;
    nameVi: string;
    nameEn: string;
    price: number;
    priceStr: string;
    duration: number;
    groupId: string;
}

interface BarberItem {
    id: string;
    nameVi: string;
    nameEn: string;
}

interface SelectedServiceState {
    groupId: string;
    serviceId: string;
    barberId: string;
}

interface BookingDetails {
    phoneNumber: string;
    fullName: string;
    totalGuests: number;
    branchName: string;
    date: string;
    time: string;
    services: Array<{
        name: string;
        price: string;
        duration: number;
        barberName: string;
    }>;
    notes: string;
    totalPrice: string;
    totalDuration: number;
}

export default function BookingForm({ locale }: { locale: string }) {
    const t = useTranslations("Booking");

    // Static Data
    const branches = useMemo(() => [
        { id: "branch_1", name: "33/1 Quốc Hương, P.AN KHÁNH, Q2, Hồ Chí Minh" },
        { id: "branch_2", name: "136 TRẦN NÃO, P.AN KHÁNH, TP. HỒ CHÍ MINH" }
    ], []);

    const serviceGroups = useMemo(() => [
        { id: "group_1", nameVi: "1. DỊCH VỤ LẺ", nameEn: "1. SINGLE SERVICES" },
        { id: "group_2", nameVi: "2. COMBO TIẾT KIỆM", nameEn: "2. SAVING COMBOS" }
    ], []);

    const services: ServiceItem[] = useMemo(() => [
        {
            id: "adult_haircut",
            nameVi: "CẮT - HAIR CUT",
            nameEn: "HAIRCUT",
            price: 110000,
            priceStr: "110,000đ",
            duration: 30,
            groupId: "group_1"
        },
        {
            id: "kids_haircut",
            nameVi: "CẮT TÓC TRẺ EM",
            nameEn: "KIDS HAIRCUT",
            price: 70000,
            priceStr: "70,000đ",
            duration: 20,
            groupId: "group_1"
        },
        {
            id: "beard_trim",
            nameVi: "TỈA RÂU - BEARD TRIM",
            nameEn: "BEARD TRIM",
            price: 50000,
            priceStr: "50,000đ",
            duration: 20,
            groupId: "group_1"
        },
        {
            id: "neck_shave",
            nameVi: "CẠO MẶT CỔ",
            nameEn: "NECK SHAVE",
            price: 40000,
            priceStr: "40,000đ",
            duration: 15,
            groupId: "group_1"
        },
        {
            id: "scalp_moisturizing",
            nameVi: "COMBO CẮT + DƯỠNG ẨM DA ĐẦU",
            nameEn: "COMBO HAIRCUT + SCALP MOISTURIZING",
            price: 180000,
            priceStr: "180,000đ",
            duration: 45,
            groupId: "group_2"
        },
        {
            id: "beard_grooming",
            nameVi: "COMBO CẮT + CHĂM SÓC RÂU TOÀN DIỆN",
            nameEn: "COMBO HAIRCUT + BEARD GROOMING",
            price: 240000,
            priceStr: "240,000đ",
            duration: 60,
            groupId: "group_2"
        }
    ], []);

    const barbers: BarberItem[] = useMemo(() => [
        { id: "suggested", nameVi: "Đề xuất nhân viên", nameEn: "Suggested Stylist" },
        { id: "barber_huy", nameVi: "Thợ Huy", nameEn: "Barber Huy" },
        { id: "barber_nam", nameVi: "Thợ Nam", nameEn: "Barber Nam" },
        { id: "barber_khanh", nameVi: "Thợ Khánh", nameEn: "Barber Khanh" }
    ], []);

    const timeSlots = useMemo(() => [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
    ], []);

    // Form States
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [totalGuests, setTotalGuests] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState("branch_1");
    const [bookingDate, setBookingDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [selectedServices, setSelectedServices] = useState<SelectedServiceState[]>([
        { groupId: "", serviceId: "", barberId: "suggested" }
    ]);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

    // App Navigation Step State
    const [step, setStep] = useState<"form" | "success">("form");
    const [showModal, setShowModal] = useState(false);
    const [confirmedDetails, setConfirmedDetails] = useState<BookingDetails | null>(null);

    // Validation Errors State
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Calculations based on chosen services
    const currentServicesSummary = useMemo(() => {
        let total = 0;
        let mins = 0;
        const validList: ServiceItem[] = [];

        selectedServices.forEach(item => {
            if (item.serviceId) {
                const found = services.find(s => s.id === item.serviceId);
                if (found) {
                    total += found.price;
                    mins += found.duration;
                    validList.push(found);
                }
            }
        });

        return {
            totalPriceStr: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total).replace("₫", "đ"),
            totalPrice: total,
            totalDuration: mins,
            validList
        };
    }, [selectedServices, services]);

    // Handlers
    const handleAddServiceRow = () => {
        setSelectedServices(prev => [...prev, { groupId: "", serviceId: "", barberId: "suggested" }]);
    };

    const handleRemoveServiceRow = (index: number) => {
        if (selectedServices.length > 1) {
            setSelectedServices(prev => prev.filter((_, idx) => idx !== index));
        } else {
            setSelectedServices([{ groupId: "", serviceId: "", barberId: "suggested" }]);
        }
    };

    const handleServiceChange = (index: number, field: keyof SelectedServiceState, value: string) => {
        setSelectedServices(prev => {
            const next = [...prev];
            if (field === "groupId") {
                next[index] = { groupId: value, serviceId: "", barberId: "suggested" };
            } else {
                next[index] = { ...next[index], [field]: value };
            }
            return next;
        });
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};

        if (!phoneNumber.trim()) {
            nextErrors.phone = t("validationPhone");
        }
        if (!fullName.trim()) {
            nextErrors.name = t("validationName");
        }

        const hasValidService = selectedServices.some(s => s.serviceId !== "");
        if (!hasValidService) {
            nextErrors.services = t("validationServices");
        }

        if (!selectedTimeSlot) {
            nextErrors.time = t("validationTime");
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            // Scroll to errors or top
            window.scrollTo({ top: 300, behavior: "smooth" });
            return;
        }

        // Prepare Summary
        const branchObj = branches.find(b => b.id === selectedBranch);
        const bookingSummary: BookingDetails = {
            phoneNumber,
            fullName,
            totalGuests,
            branchName: branchObj ? branchObj.name : "",
            date: bookingDate,
            time: selectedTimeSlot,
            services: selectedServices
                .filter(s => s.serviceId !== "")
                .map(s => {
                    const serv = services.find(item => item.id === s.serviceId);
                    const barb = barbers.find(item => item.id === s.barberId);
                    return {
                        name: serv ? (locale === "vi" ? serv.nameVi : serv.nameEn) : "",
                        price: serv ? serv.priceStr : "0đ",
                        duration: serv ? serv.duration : 0,
                        barberName: barb ? (locale === "vi" ? barb.nameVi : barb.nameEn) : ""
                    };
                }),
            notes,
            totalPrice: currentServicesSummary.totalPriceStr,
            totalDuration: currentServicesSummary.totalDuration
        };

        setConfirmedDetails(bookingSummary);
        setShowModal(true);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
        setStep("success");
    };

    const handleBookOther = () => {
        setPhoneNumber("");
        setFullName("");
        setTotalGuests(1);
        setSelectedBranch("branch_1");
        setSelectedServices([{ groupId: "", serviceId: "", barberId: "suggested" }]);
        setShowNotes(false);
        setNotes("");
        setSelectedTimeSlot("");
        setStep("form");
        setConfirmedDetails(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (step === "success" && confirmedDetails) {
        return (
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Left: Detail Card */}
                    <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-sm p-6 md:p-8 text-zinc-950 dark:text-white">
                        <h2 className="text-xl font-bold uppercase tracking-wider mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            {t("detailsTitle")}
                        </h2>

                        <div className="flex flex-col gap-5">
                            {/* Branch */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-extrabold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                    {t("detailsBranch")}
                                </span>
                                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{confirmedDetails.branchName}</span>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-extrabold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                    {t("detailsDate")}
                                </span>
                                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{confirmedDetails.date} | {confirmedDetails.time}</span>
                                </div>
                            </div>

                            {/* Total Guests */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-extrabold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                    {t("detailsGuests")}
                                </span>
                                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>{confirmedDetails.totalGuests}</span>
                                </div>
                            </div>

                            {/* Services List */}
                            <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-extrabold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                                    {t("detailsServices")}
                                </span>
                                <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-900 rounded-xl p-4 flex flex-col gap-3.5">
                                    {confirmedDetails.services.map((s, idx) => (
                                        <div key={idx} className="flex justify-between items-start gap-4 text-xs font-bold uppercase border-b border-zinc-100 dark:border-zinc-800/60 pb-3 last:border-b-0 last:pb-0">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-zinc-900 dark:text-white tracking-wide">{s.name}</span>
                                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 lowercase font-medium">
                                                    {t("detailsMinutes", { minutes: s.duration, barber: s.barberName })}
                                                </span>
                                            </div>
                                            <span className="text-zinc-950 dark:text-amber-500 text-right">{s.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <button
                            onClick={handleBookOther}
                            className="w-full py-4 mt-8 bg-[#d4c3a3] hover:bg-[#c8b695] active:scale-[0.98] text-zinc-950 text-[11px] font-extrabold tracking-wider rounded transition-all duration-300 uppercase shadow-md flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {t("detailsBookOther")}
                        </button>
                    </div>

                    {/* Right: Salon Info */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        {/* Salon Summary Block */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm text-zinc-900 dark:text-white">
                            <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-950 p-1 flex items-center justify-center text-amber-500 shadow-md">
                                    <Image src="/common/logo.png" alt="Logo" width={50} height={50} className="object-contain" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-extrabold text-sm tracking-wider uppercase">{t("sidebarTitle")}</h3>
                                    <span className="text-[10px] text-zinc-400 font-semibold mt-0.5">{t("sidebarHours")}: 09:00 - 19:30</span>
                                </div>
                            </div>

                            {/* Total summary info */}
                            <div className="flex flex-col gap-3 pt-4 text-xs font-bold uppercase">
                                <div className="flex justify-between text-zinc-500">
                                    <span>{t("sidebarSubtotal")}</span>
                                    <span>{confirmedDetails.totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-zinc-500">
                                    <span>{t("sidebarDuration")}</span>
                                    <span className="lowercase font-medium">{confirmedDetails.totalDuration} phút</span>
                                </div>
                                <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 text-sm text-zinc-950 dark:text-amber-500 font-black">
                                    <span>{t("sidebarTotal")}</span>
                                    <span>{confirmedDetails.totalPrice}</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Banner */}
                        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 relative bg-zinc-950 shadow-sm">
                            <Image
                                src="/images/contact-bg.png"
                                alt="Shop Interior"
                                fill
                                className="object-cover opacity-60"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
            <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Left Column: Form Elements */}
                <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-6 text-zinc-950 dark:text-white">

                    {/* Header Intro */}
                    <div className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                        <h2 className="text-base font-bold uppercase tracking-wider">{t("customerInfoTitle")}</h2>
                        <span className="text-[10px] text-amber-500 font-bold">{t("customerInfoSubtitle")}</span>
                    </div>

                    {/* SĐT & Họ Tên side-by-side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                        {/* Phone */}
                        <div className="flex flex-col items-start gap-1.5 w-full">
                            <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                                {t("phoneLabel")}
                            </label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder={t("phonePlaceholder")}
                                className={`w-full bg-zinc-50 dark:bg-zinc-950/40 border ${errors.phone ? 'border-red-500' : 'border-zinc-200/60 dark:border-zinc-800/60'} rounded-lg px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors`}
                            />
                            {errors.phone && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{errors.phone}</span>}
                        </div>

                        {/* Name */}
                        <div className="flex flex-col items-start gap-1.5 w-full">
                            <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                                {t("nameLabel")}
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={t("namePlaceholder")}
                                className={`w-full bg-zinc-50 dark:bg-zinc-950/40 border ${errors.name ? 'border-red-500' : 'border-zinc-200/60 dark:border-zinc-800/60'} rounded-lg px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors`}
                            />
                            {errors.name && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{errors.name}</span>}
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="flex flex-col items-start gap-1.5 w-full">
                        <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                            {t("guestsLabel")}
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={totalGuests}
                            onChange={(e) => setTotalGuests(Number(e.target.value))}
                            className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-lg px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors"
                        />
                    </div>

                    {/* Service Info Block Header */}
                    <div className="flex flex-col gap-1 border-b border-zinc-100 dark:border-zinc-800 pb-3 mt-4">
                        <h2 className="text-base font-bold uppercase tracking-wider">{t("serviceInfoTitle")}</h2>
                    </div>

                    {/* Choose Branch */}
                    <div className="flex flex-col items-start gap-2 w-full">
                        <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                            {t("branchLabel")}
                        </label>
                        <div className="flex flex-col gap-2.5 w-full">
                            {branches.map(b => (
                                <label
                                    key={b.id}
                                    className={`flex items-start gap-3 p-3.5 bg-zinc-50 dark:bg-zinc-950/20 border ${selectedBranch === b.id ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-200/60 dark:border-zinc-800/60'} rounded-lg cursor-pointer transition-all duration-300 text-xs font-semibold`}
                                >
                                    <input
                                        type="radio"
                                        name="branch"
                                        checked={selectedBranch === b.id}
                                        onChange={() => setSelectedBranch(b.id)}
                                        className="mt-0.5 text-amber-500 focus:ring-amber-500 accent-amber-500"
                                    />
                                    <span>{b.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-col items-start gap-1.5 w-full">
                        <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                            {t("dateLabel")}
                        </label>
                        <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-lg px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors"
                        />
                    </div>

                    {/* Services rows selector */}
                    <div className="flex flex-col gap-4 w-full">
                        <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                            {t("servicesLabel")}
                        </label>

                        <div className="flex flex-col gap-4">
                            {selectedServices.map((row, index) => {
                                const availableServices = services.filter(s => s.groupId === row.groupId);

                                return (
                                    <div key={index} className="flex flex-col md:flex-row items-center gap-3 w-full bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/60 rounded-xl p-4 relative">

                                        {/* Label 'Khách 1' */}
                                        <div className="absolute top-2.5 left-4 md:static text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                                            {t("guestIndexLabel", { index: index + 1 })}
                                        </div>

                                        {/* Service Dropdowns wrapper */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-4 md:pt-0">
                                            {/* Group Select */}
                                            <select
                                                value={row.groupId}
                                                onChange={(e) => handleServiceChange(index, "groupId", e.target.value)}
                                                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-bold focus:outline-none"
                                            >
                                                <option value="">-- {t("selectGroupPlaceholder")} --</option>
                                                {serviceGroups.map(g => (
                                                    <option key={g.id} value={g.id}>
                                                        {locale === "vi" ? g.nameVi : g.nameEn}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Service Item Select */}
                                            <select
                                                disabled={!row.groupId}
                                                value={row.serviceId}
                                                onChange={(e) => handleServiceChange(index, "serviceId", e.target.value)}
                                                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-bold focus:outline-none disabled:opacity-50"
                                            >
                                                <option value="">-- {t("selectServicePlaceholder")} --</option>
                                                {availableServices.map(s => (
                                                    <option key={s.id} value={s.id}>
                                                        {locale === "vi" ? s.nameVi : s.nameEn} ({s.priceStr})
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Stylist/Barber Select */}
                                            <select
                                                value={row.barberId}
                                                onChange={(e) => handleServiceChange(index, "barberId", e.target.value)}
                                                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-bold focus:outline-none"
                                            >
                                                {barbers.map(b => (
                                                    <option key={b.id} value={b.id}>
                                                        {locale === "vi" ? b.nameVi : b.nameEn}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Remove row button */}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveServiceRow(index)}
                                            className="p-2 text-zinc-400 hover:text-red-500 transition-colors flex-shrink-0"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Error state and Info row */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-1 w-full">
                            <button
                                type="button"
                                onClick={handleAddServiceRow}
                                className="px-4 py-2 border border-amber-500 hover:bg-amber-500/5 text-amber-500 text-[10px] font-extrabold uppercase rounded tracking-wider transition-colors"
                            >
                                + {t("addServiceBtn")}
                            </button>

                            <div className="flex items-center gap-4 text-xs font-black text-zinc-900 dark:text-amber-500">
                                <span>{selectedServices.filter(s => s.serviceId !== "").length} | {currentServicesSummary.totalDuration} phút</span>

                                {/* Toggle notes */}
                                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-semibold cursor-pointer select-none">
                                    <span className="text-[10px] uppercase font-extrabold">{t("showNotesLabel")}</span>
                                    <input
                                        type="checkbox"
                                        checked={showNotes}
                                        onChange={() => setShowNotes(!showNotes)}
                                        className="w-8 h-4 rounded-full bg-zinc-300 dark:bg-zinc-800 checked:bg-amber-500 accent-amber-500 cursor-pointer appearance-none transition-colors relative before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-3 before:h-3 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4 shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        {errors.services && <span className="text-[10px] text-red-500 font-semibold">{errors.services}</span>}
                    </div>

                    {/* Notes text area */}
                    {showNotes && (
                        <div className="flex flex-col items-start gap-1.5 w-full">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder={t("notesPlaceholder")}
                                className="w-full min-h-[80px] bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-lg px-4 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-semibold focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-500 transition-colors resize-none"
                            />
                        </div>
                    )}

                    {/* Time Slot Selector */}
                    <div className="flex flex-col items-start gap-3 w-full mt-4">
                        <label className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                            {t("timeSlotLabel")}
                        </label>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => setSelectedTimeSlot(time)}
                                    className={`py-3 rounded-lg border text-xs font-bold text-center transition-all duration-300 ${selectedTimeSlot === time
                                        ? 'bg-amber-500 border-amber-500 text-zinc-950'
                                        : 'bg-zinc-50 dark:bg-zinc-950/30 border-zinc-200/60 dark:border-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:border-zinc-950 dark:hover:border-zinc-500'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        {errors.time && <span className="text-[10px] text-red-500 font-semibold mt-1">{errors.time}</span>}
                    </div>

                    {/* Policies note */}
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-5 mt-4">
                        {t("policyNote")}
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-zinc-950 text-xs font-black tracking-wider rounded-lg transition-all duration-300 uppercase shadow-md flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {t("bookBtn")}
                    </button>

                </div>

                {/* Right Column: Salon Summary Sidebar */}
                <div className="md:col-span-5 flex flex-col gap-6">
                    {/* Salon Summary Block */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm text-zinc-900 dark:text-white">
                        <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                            <div className="w-12 h-12 rounded-xl bg-zinc-950 p-1 flex items-center justify-center text-amber-500 shadow-md">
                                <Image src="/common/logo.png" alt="Logo" width={50} height={50} className="object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-extrabold text-sm tracking-wider uppercase">{t("sidebarTitle")}</h3>
                                <span className="text-[10px] text-zinc-400 font-semibold mt-0.5">{t("sidebarHours")}: 09:00 - 19:30</span>
                            </div>
                        </div>

                        {/* Selected Services Summary Details */}
                        {currentServicesSummary.validList.length > 0 && (
                            <div className="flex flex-col gap-3 py-4 border-b border-zinc-100 dark:border-zinc-800">
                                <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">
                                    {t("sidebarServicesTitle", { count: currentServicesSummary.validList.length })}
                                </span>
                                <div className="flex flex-col gap-3">
                                    {selectedServices.map((row, idx) => {
                                        if (!row.serviceId) return null;
                                        const serv = services.find(s => s.id === row.serviceId);
                                        if (!serv) return null;
                                        return (
                                            <div key={idx} className="flex justify-between items-start text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase">
                                                <div className="flex flex-col">
                                                    <span>{locale === "vi" ? serv.nameVi : serv.nameEn}</span>
                                                    <span className="text-[10px] text-zinc-400 font-normal lowercase">{serv.duration} phút</span>
                                                </div>
                                                <span>{serv.priceStr}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Final summary info */}
                        <div className="flex flex-col gap-3 pt-4 text-xs font-bold uppercase">
                            <div className="flex justify-between text-zinc-500">
                                <span>{t("sidebarSubtotal")}</span>
                                <span>{currentServicesSummary.totalPriceStr}</span>
                            </div>
                            <div className="flex justify-between text-zinc-500">
                                <span>{t("sidebarDiscount")}</span>
                                <span>0đ</span>
                            </div>
                            <div className="flex justify-between text-zinc-500">
                                <span>{t("sidebarDuration")}</span>
                                <span className="lowercase font-medium">{currentServicesSummary.totalDuration} phút</span>
                            </div>
                            <div className="flex justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 text-sm text-zinc-950 dark:text-amber-500 font-black">
                                <span>{t("sidebarTotal")}</span>
                                <span>{currentServicesSummary.totalPriceStr}</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Banner */}
                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 relative bg-zinc-950 shadow-sm">
                        <Image
                            src="/images/contact-bg.png"
                            alt="Shop Interior"
                            fill
                            className="object-cover opacity-60"
                        />
                    </div>
                </div>

            </form>

            {/* Success Booking Popup Modal */}
            {showModal && confirmedDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/65 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-5">

                        {/* Success Icon */}
                        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center shadow-inner">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Title & Info */}
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-base font-extrabold uppercase text-zinc-900 dark:text-white tracking-wide">
                                {t("successTitle")}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed px-2">
                                {t("successDesc")}
                            </p>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    handleBookOther();
                                }}
                                className="w-full py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-[10px] font-extrabold uppercase rounded tracking-wider transition-colors"
                            >
                                {t("successOk")}
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmModal}
                                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 text-[10px] font-extrabold uppercase rounded tracking-wider transition-all duration-300 shadow-sm"
                            >
                                {t("successView")}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
