interface HeaderProps {
    user: any;
    activeSection: string;
}

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
    overview: {
        title: 'Dashboard Overview',
        subtitle: 'Welcome back! Here\'s your trading summary',
    },
    exchanges: {
        title: 'Linked Exchanges',
        subtitle: 'Manage your connected trading platforms',
    },
    volume: {
        title: 'Trading Volume',
        subtitle: 'Track your trading activity across all exchanges',
    },
    cashback: {
        title: 'Cashback History',
        subtitle: 'View your earnings and payment history',
    },
    giveaways: {
        title: 'Giveaways & Rewards',
        subtitle: 'Complete tasks to earn bonuses',
    },
};

export default function Header({ user, activeSection }: HeaderProps) {
    const section = sectionTitles[activeSection] || sectionTitles.overview;

    return (
        <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h1>
                    <p className="text-gray-400 mt-1 text-sm sm:text-base">{section.subtitle}</p>
                </div>

                <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-3 sm:px-4 py-2 border border-gray-700 w-full sm:w-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#00ff88] rounded-full flex items-center justify-center text-black font-semibold text-sm sm:text-base">
                        {user?.name?.charAt(0).toUpperCase() || 'T'}
                    </div>
                    <div className="flex-1 sm:flex-none">
                        <p className="font-semibold text-white text-sm sm:text-base">{user?.name || 'Test User'}</p>
                        <p className="text-xs sm:text-sm text-gray-400">Premium Member</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
