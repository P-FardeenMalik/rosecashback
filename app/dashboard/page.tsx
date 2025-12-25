'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import OverviewSection from '@/components/sections/OverviewSection';
import ExchangesSection from '@/components/sections/ExchangesSection';
import VolumeSection from '@/components/sections/VolumeSection';
import CashbackSection from '@/components/sections/CashbackSection';
import GiveawaysSection from '@/components/sections/GiveawaysSection';

export default function DashboardPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('overview');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/');
            return;
        }

        setUser(JSON.parse(userData));
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        setShowMobileSidebar(false); // Close mobile sidebar after selection
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff88]"></div>
                    <p className="mt-4 text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} onLogout={handleLogout} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {showMobileSidebar && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileSidebar(false)}>
                    <div className="w-64 h-full" onClick={(e) => e.stopPropagation()}>
                        <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} onLogout={handleLogout} />
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-y-auto flex flex-col">
                {/* Mobile Menu Button */}
                <div className="lg:hidden bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setShowMobileSidebar(true)}
                        className="text-white p-2"
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🌹</span>
                        <span className="text-lg font-bold text-white">Rose Street</span>
                    </div>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>

                <Header user={user} activeSection={activeSection} />

                <div className="p-4 sm:p-6 md:p-8">
                    {activeSection === 'overview' && <OverviewSection />}
                    {activeSection === 'exchanges' && <ExchangesSection />}
                    {activeSection === 'volume' && <VolumeSection />}
                    {activeSection === 'cashback' && <CashbackSection />}
                    {activeSection === 'giveaways' && <GiveawaysSection />}
                </div>
            </main>
        </div>
    );
}
