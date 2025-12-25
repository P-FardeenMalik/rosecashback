'use client';

import { useEffect, useState } from 'react';

interface Giveaway {
    _id: string;
    title: string;
    description: string;
    icon: string;
    targetType: string;
    targetValue: number;
    reward: string;
    rewardAmount?: number;
    deadline: string;
    featured: boolean;
    userProgress: number;
    userStatus: string;
}

export default function GiveawaysSection() {
    const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGiveaways();
    }, []);

    const fetchGiveaways = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/giveaways', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setGiveaways(data.giveaways);
            }
        } catch (error) {
            console.error('Error fetching giveaways:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDaysRemaining = (deadline: string) => {
        const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff88]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Active Giveaways</h2>
                    <p className="text-gray-400 mt-1">Complete tasks to earn rewards and bonuses</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-xl shadow-lg">
                    <span className="text-sm font-medium text-gray-400">Your Points:</span>
                    <span className="text-2xl font-bold ml-2 text-[#00ff88]">2,450</span>
                </div>
            </div>

            {/* Giveaways Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {giveaways.map((giveaway) => {
                    const progressPercentage = (giveaway.userProgress / giveaway.targetValue) * 100;
                    const daysRemaining = getDaysRemaining(giveaway.deadline);
                    const isCompleted = giveaway.userStatus === 'completed';

                    return (
                        <div
                            key={giveaway._id}
                            className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-sm border-2 p-6 hover:border-gray-700 transition-all ${giveaway.featured ? 'border-[#00ff88]' : 'border-gray-800'
                                }`}
                        >
                            {giveaway.featured && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 mb-4">
                                    ⭐ Featured
                                </div>
                            )}

                            <div className="flex items-start gap-4 mb-4">
                                <div className="text-4xl">{giveaway.icon}</div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-1">{giveaway.title}</h3>
                                    <p className="text-sm text-gray-400">Ends in {daysRemaining} days</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-4">{giveaway.description}</p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-400">Progress</span>
                                    <span className="text-sm font-semibold text-white">
                                        {giveaway.userProgress.toLocaleString()} / {giveaway.targetValue.toLocaleString()}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-3">
                                    <div
                                        className="h-3 rounded-full transition-all duration-500 bg-[#00ff88]"
                                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Reward */}
                            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl mb-4 border border-gray-700">
                                <span className="text-sm font-medium text-gray-400">Reward:</span>
                                <span className="font-bold text-[#00ff88]">{giveaway.reward}</span>
                            </div>

                            {/* Action Button */}
                            <button
                                className="w-full bg-[#00ff88] text-black py-3 px-6 rounded-xl font-semibold hover:bg-[#00dd77] transition-all"
                            >
                                {isCompleted ? '✓ Claim Reward' : 'Continue'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Completed Giveaways */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Completed Giveaways</h3>
                <div className="space-y-3">
                    <CompletedItem title="Welcome Bonus" date="Dec 1, 2025" reward="+$50" />
                    <CompletedItem title="First Trade Milestone" date="Nov 15, 2025" reward="+$25" />
                </div>
            </div>
        </div>
    );
}

function CompletedItem({ title, date, reward }: { title: string; date: string; reward: string }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="w-10 h-10 bg-[#00ff88]/20 rounded-full flex items-center justify-center text-xl border border-[#00ff88]/30">
                ✅
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-sm text-gray-400">Completed on {date}</p>
            </div>
            <span className="font-bold text-[#00ff88]">{reward}</span>
        </div>
    );
}
