import { NextRequest, NextResponse } from 'next/server'

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    // TODO: Validate against database
    // TODO: Generate JWT token

    return NextResponse.json(
      {
        message: 'Login successful',
        token: 'sample-jwt-token',
        user: {
          id: '1',
          email,
          name: 'User',
        },
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 401 })
  }
}
