interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    onLogout: () => void;
}

export default function Sidebar({ activeSection, setActiveSection, onLogout }: SidebarProps) {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'exchanges', label: 'Linked Exchanges', icon: '⚡' },
        { id: 'volume', label: 'Trading Volume', icon: '📈' },
        { id: 'cashback', label: 'Cashback History', icon: '💰' },
        { id: 'giveaways', label: 'Giveaways', icon: '🎁' },
    ];

    return (
        <aside className="w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🌹</span>
                    <h2 className="text-xl font-bold text-white">Rose Street</h2>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                                ? 'bg-[#00ff88] text-black shadow-lg font-semibold'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-900/30 hover:text-red-400 transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 17H4a2 2 0 01-2-2V5a2 2 0 012-2h3M13 13l4-4-4-4M17 9H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
