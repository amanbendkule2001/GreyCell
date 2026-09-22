import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verify minimum required fields for DPDP compliance audit
    const { consentId, policyVersion, timestamp, preferences } = body;

    if (!consentId || !policyVersion || !timestamp || !preferences) {
      return NextResponse.json(
        { error: 'Missing required consent audit fields' },
        { status: 400 }
      );
    }

    // In a production setup, write to your audit database table (e.g. PostgreSQL, MongoDB, or Cloud Logging):
    // await db.consentLogs.create({ data: { consentId, policyVersion, timestamp, preferences, ... } });
    console.info('[DPDP Audit Log Server Entry]:', {
      consentId,
      policyVersion,
      timestamp,
      language: body.language || 'en',
      preferences,
      userAgent: body.userAgent,
    });

    return NextResponse.json({
      status: 'success',
      message: 'Consent audit log successfully recorded',
      loggedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error logging DPDP consent:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
