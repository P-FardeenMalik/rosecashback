import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Return static cashback data
    const cashbacks = [
        {
            _id: '1',
            exchangeName: 'Bybit',
            tradingVolume: 50000,
            cashbackRate: 50,
            amount: 250,
            status: 'paid',
            createdAt: '2025-12-20T00:00:00Z',
            paidAt: '2025-12-20T00:00:00Z',
        },
        {
            _id: '2',
            exchangeName: 'OKX',
            tradingVolume: 40000,
            cashbackRate: 45,
            amount: 180,
            status: 'paid',
            createdAt: '2025-12-15T00:00:00Z',
            paidAt: '2025-12-15T00:00:00Z',
        },
        {
            _id: '3',
            exchangeName: 'MEXC',
            tradingVolume: 35000,
            cashbackRate: 40,
            amount: 140,
            status: 'paid',
            createdAt: '2025-12-10T00:00:00Z',
            paidAt: '2025-12-10T00:00:00Z',
        },
        {
            _id: '4',
            exchangeName: 'BingX',
            tradingVolume: 30000,
            cashbackRate: 45,
            amount: 135,
            status: 'paid',
            createdAt: '2025-12-05T00:00:00Z',
            paidAt: '2025-12-05T00:00:00Z',
        },
        {
            _id: '5',
            exchangeName: 'Bitget',
            tradingVolume: 25000,
            cashbackRate: 42,
            amount: 105,
            status: 'paid',
            createdAt: '2025-12-01T00:00:00Z',
            paidAt: '2025-12-01T00:00:00Z',
        },
        {
            _id: '6',
            exchangeName: 'LBank',
            tradingVolume: 20000,
            cashbackRate: 38,
            amount: 76,
            status: 'paid',
            createdAt: '2025-11-28T00:00:00Z',
            paidAt: '2025-11-28T00:00:00Z',
        },
        {
            _id: '7',
            exchangeName: 'Bybit',
            tradingVolume: 45000,
            cashbackRate: 50,
            amount: 225,
            status: 'paid',
            createdAt: '2025-11-25T00:00:00Z',
            paidAt: '2025-11-25T00:00:00Z',
        },
        {
            _id: '8',
            exchangeName: 'OKX',
            tradingVolume: 38000,
            cashbackRate: 45,
            amount: 171,
            status: 'paid',
            createdAt: '2025-11-20T00:00:00Z',
            paidAt: '2025-11-20T00:00:00Z',
        },
    ];

    const stats = {
        total: 12450,
        thisMonth: 1200,
    };

    return NextResponse.json({
        success: true,
        cashbacks,
        stats,
    });
}
