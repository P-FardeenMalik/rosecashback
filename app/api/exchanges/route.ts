import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Return static exchange data
    const exchanges = [
        {
            _id: '1',
            exchangeName: 'Bybit',
            uid: 'BYBIT123456',
            tradingVolume: 850000,
            cashbackRate: 50,
            totalEarned: 4250,
            status: 'connected',
        },
        {
            _id: '2',
            exchangeName: 'OKX',
            uid: 'OKX789012',
            tradingVolume: 620000,
            cashbackRate: 45,
            totalEarned: 2790,
            status: 'connected',
        },
        {
            _id: '3',
            exchangeName: 'MEXC',
            uid: 'MEXC345678',
            tradingVolume: 450000,
            cashbackRate: 40,
            totalEarned: 1800,
            status: 'connected',
        },
        {
            _id: '4',
            exchangeName: 'BingX',
            uid: 'BINGX901234',
            tradingVolume: 320000,
            cashbackRate: 45,
            totalEarned: 1440,
            status: 'connected',
        },
        {
            _id: '5',
            exchangeName: 'Bitget',
            uid: 'BITGET567890',
            tradingVolume: 280000,
            cashbackRate: 42,
            totalEarned: 1176,
            status: 'connected',
        },
        {
            _id: '6',
            exchangeName: 'LBank',
            uid: 'LBANK123456',
            tradingVolume: 180000,
            cashbackRate: 38,
            totalEarned: 684,
            status: 'connected',
        },
    ];

    return NextResponse.json({
        success: true,
        exchanges,
    });
}
