'use client';

import { useEffect, useState } from 'react';

interface Exchange {
    _id: string;
    exchangeName: string;
    uid: string;
    tradingVolume: number;
    cashbackRate: number;
    totalEarned: number;
    status: string;
}

export default function ExchangesSection() {
    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExchanges();
    }, []);

    const fetchExchanges = async () => {
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
            }
        } catch (error) {
            console.error('Error fetching exchanges:', error);
        } finally {
            setLoading(false);
        }
    };

    const exchangeColors: Record<string, string> = {
        Bybit: 'from-orange-500 to-red-600',
        OKX: 'from-gray-700 to-gray-900',
        MEXC: 'from-purple-600 to-indigo-600',
        BingX: 'from-blue-500 to-cyan-500',
        Bitget: 'from-pink-600 to-rose-600',
        LBank: 'from-yellow-500 to-orange-500',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff88]"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exchanges.map((exchange) => (
                <div key={exchange._id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                                <img
                                    src={`/logos/${exchange.exchangeName.toLowerCase()}.${exchange.exchangeName === 'Bitget' || exchange.exchangeName === 'LBank' ? 'jpg' : 'webp'}`}
                                    alt={`${exchange.exchangeName} logo`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{exchange.exchangeName}</h4>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30">
                                    Connected
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between py-2 border-b border-gray-800">
                            <span className="text-sm text-gray-400">Trading Volume</span>
                            <span className="font-semibold text-white">${exchange.tradingVolume.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-800">
                            <span className="text-sm text-gray-400">Cashback Rate</span>
                            <span className="font-semibold text-[#00ff88]">{exchange.cashbackRate}%</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-400">Total Earned</span>
                            <span className="font-semibold text-[#00ff88]">${exchange.totalEarned.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <p className="text-xs text-gray-500">UID: {exchange.uid}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
