import { NextRequest, NextResponse } from 'next/server'

// GET /api/leads
export async function GET() {
  try {
    // TODO: Fetch from database using Prisma
    const leads = [
      {
        id: '1',
        name: 'Sample Lead',
        email: 'sample@example.com',
        company: 'Sample Co',
        message: 'Interested in digital design services',
        status: 'new',
        createdAt: new Date().toISOString(),
      },
    ]
    return NextResponse.json({ leads })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

// POST /api/leads
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: Save to database using Prisma
    // TODO: Send confirmation email

    return NextResponse.json(
      {
        message: 'Lead created successfully',
        lead: {
          id: '1',
          name,
          email,
          company,
          message,
          status: 'new',
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
