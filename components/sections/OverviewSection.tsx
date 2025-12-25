'use client';

import { useEffect, useState } from 'react';

export default function OverviewSection() {
    const [stats, setStats] = useState({
        linkedExchanges: 6,
        totalVolume: '$2.4M',
        totalCashback: '$12,450',
        activeGiveaways: 3,
    });

    const activities = [
        { icon: '📊', title: 'Cashback Received', time: '2 hours ago', amount: '+$250', type: 'positive' },
        { icon: '🎁', title: 'Giveaway Task Completed', time: '5 hours ago', badge: 'Completed', type: 'badge' },
        { icon: '⚡', title: 'New Exchange Linked', time: '1 day ago', badge: 'Bitget', type: 'badge' },
        { icon: '💰', title: 'Trading Volume Milestone', time: '2 days ago', amount: '$1M', type: 'neutral' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon="⚡"
                    label="Linked Exchanges"
                    value={stats.linkedExchanges}
                    change="+2 this month"
                    gradient="from-blue-600 to-cyan-600"
                />
                <StatCard
                    icon="📈"
                    label="Total Volume"
                    value={stats.totalVolume}
                    change="+12.5% vs last month"
                    gradient="from-cyan-600 to-teal-600"
                />
                <StatCard
                    icon="💰"
                    label="Total Cashback"
                    value={stats.totalCashback}
                    change="+$1,200 this month"
                    gradient="from-emerald-600 to-green-600"
                />
                <StatCard
                    icon="🎁"
                    label="Active Giveaways"
                    value={stats.activeGiveaways}
                    change="2 tasks completed"
                    gradient="from-orange-600 to-yellow-600"
                />
            </div>

            {/* Activity and Chart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                    </div>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors">
                                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl border border-gray-700">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">{activity.title}</p>
                                    <p className="text-sm text-gray-400">{activity.time}</p>
                                </div>
                                {activity.amount && (
                                    <span className={`font-semibold ${activity.type === 'positive' ? 'text-[#00ff88]' : 'text-white'}`}>
                                        {activity.amount}
                                    </span>
                                )}
                                {activity.badge && (
                                    <span className="px-3 py-1 bg-[#00ff88]/20 text-[#00ff88] rounded-full text-sm font-medium border border-[#00ff88]/30">
                                        {activity.badge}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Performance */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Monthly Performance</h3>
                        <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88]">
                            <option>December 2025</option>
                            <option>November 2025</option>
                            <option>October 2025</option>
                        </select>
                    </div>
                    <div className="space-y-4">
                        <PerformanceBar label="Trading Volume" value={85} color="bg-blue-600" />
                        <PerformanceBar label="Cashback Earned" value={72} color="bg-cyan-600" />
                        <PerformanceBar label="Active Days" value={90} color="bg-[#00ff88]" />
                        <PerformanceBar label="Giveaway Progress" value={60} color="bg-orange-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, change, gradient }: any) {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {icon}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-400 mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
                <p className="text-sm text-[#00ff88] mt-2">{change}</p>
            </div>
        </div>
    );
}

function PerformanceBar({ label, value, color }: any) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className="text-sm font-semibold text-white">{value}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
                <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}
