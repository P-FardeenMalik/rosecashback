'use client';

import { useEffect, useState } from 'react';

interface Exchange {
    exchangeName: string;
    tradingVolume: number;
}

export default function VolumeSection() {
    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [totalVolume, setTotalVolume] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVolumeData();
    }, []);

    const fetchVolumeData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/exchanges', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setExchanges(data.exchanges);
                const total = data.exchanges.reduce((sum: number, ex: Exchange) => sum + ex.tradingVolume, 0);
                setTotalVolume(total);
            }
        } catch (error) {
            console.error('Error fetching volume data:', error);
        } finally {
            setLoading(false);
        }
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
            {/* Total Volume Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-400">Overall Trading Volume</h3>
                <div className="text-5xl font-bold mb-2 text-[#00ff88]">${(totalVolume / 1000000).toFixed(1)}M</div>
                <p className="text-gray-400">Last 30 days</p>
            </div>

            {/* Volume Table */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                    <h3 className="text-lg font-semibold text-white">Volume Breakdown by Exchange</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Exchange</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Daily Volume</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weekly Volume</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Monthly Volume</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {exchanges.map((exchange, index) => {
                                const dailyVolume = exchange.tradingVolume / 30;
                                const weeklyVolume = exchange.tradingVolume / 4.3;
                                const trends = [15, 8, -3, 12, 5, 0];
                                const trend = trends[index] || 0;

                                return (
                                    <tr key={index} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-semibold text-white">{exchange.exchangeName}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            ${dailyVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            ${weeklyVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            ${exchange.tradingVolume.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trend > 0 ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30' :
                                                    trend < 0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                        'bg-gray-700 text-gray-300 border border-gray-600'
                                                }`}>
                                                {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
