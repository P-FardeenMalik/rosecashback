'use client';

import { useEffect, useState } from 'react';

interface Cashback {
    _id: string;
    exchangeName: string;
    tradingVolume: number;
    cashbackRate: number;
    amount: number;
    status: string;
    createdAt: string;
    paidAt?: string;
}

export default function CashbackSection() {
    const [cashbacks, setCashbacks] = useState<Cashback[]>([]);
    const [stats, setStats] = useState({ total: 0, thisMonth: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCashbackData();
    }, []);

    const fetchCashbackData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/cashback', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCashbacks(data.cashbacks);
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Error fetching cashback data:', error);
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
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Cashback Received</h3>
                    <div className="text-4xl font-bold">${stats.total.toLocaleString()}</div>
                    <p className="text-green-100 mt-2">All time earnings</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">This Month</h3>
                    <div className="text-4xl font-bold">${stats.thisMonth.toLocaleString()}</div>
                    <p className="text-blue-100 mt-2">+15% from last month</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Pending Cashback</h3>
                    <div className="text-4xl font-bold">$350</div>
                    <p className="text-orange-100 mt-2">Processing on Jan 1, 2026</p>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Payment History</h3>
                    <div className="flex gap-3">
                        <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88]">
                            <option>All Exchanges</option>
                            <option>Bybit</option>
                            <option>OKX</option>
                            <option>MEXC</option>
                            <option>BingX</option>
                            <option>Bitget</option>
                            <option>LBank</option>
                        </select>
                        <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88]">
                            <option>Last 6 Months</option>
                            <option>Last Month</option>
                            <option>Last 3 Months</option>
                            <option>All Time</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Exchange</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trading Volume</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cashback Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {cashbacks.map((cashback) => (
                                <tr key={cashback._id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {new Date(cashback.paidAt || cashback.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-white">{cashback.exchangeName}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        ${cashback.tradingVolume.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {cashback.cashbackRate}%
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-[#00ff88]">+${cashback.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cashback.status === 'paid' ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30' :
                                                cashback.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                                    'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                            {cashback.status === 'paid' ? 'Paid' : cashback.status === 'pending' ? 'Pending' : 'Cancelled'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
