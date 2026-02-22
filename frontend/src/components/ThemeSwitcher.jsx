import React, { useEffect, useState } from "react";

const themes = [
    { id: "purple", label: "Purple", color: "#9083d5" },
    { id: "emerald", label: "Emerald", color: "#10b981" },
    { id: "ocean", label: "Ocean", color: "#3b82f6" },
    { id: "rose", label: "Rose", color: "#f43f5e" },
];

const ThemeSwitcher = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(() => localStorage.getItem("theme") || "purple");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", active);
        localStorage.setItem("theme", active);
    }, [active]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {/* Theme circles */}
            {open && (
                <div className="flex flex-col gap-2 bg-white rounded-2xl p-3 shadow-2xl border border-gray-100">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => { setActive(t.id); setOpen(false); }}
                            title={t.label}
                            className={`w-8 h-8 rounded-full border-4 transition-transform hover:scale-110 ${active === t.id ? "border-gray-800 scale-110" : "border-white"
                                }`}
                            style={{ backgroundColor: t.color }}
                        />
                    ))}
                </div>
            )}
            {/* Toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className="w-12 h-12 rounded-full shadow-2xl flex items-center justify-center text-white text-xl bg-theme-gradient border-4 border-white"
                title="Change Theme"
            >
                🎨
            </button>
        </div>
    );
};

export default ThemeSwitcher;
