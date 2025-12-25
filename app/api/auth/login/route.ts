import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { telegramId, password } = body;

        if (!telegramId || !password) {
            return NextResponse.json(
                { error: 'Telegram ID and password are required' },
                { status: 400 }
            );
        }

        // Static credentials check
        if (telegramId === 'rose' && password === 'rose') {
            // Return success with user data
            return NextResponse.json({
                success: true,
                token: 'static-token-rose-user',
                user: {
                    id: 'rose-user-001',
                    telegramId: 'rose',
                    name: 'Rose User',
                    email: 'rose@rosecashback.com',
                    role: 'user',
                },
            });
        }

        // Invalid credentials
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
