import { NextResponse } from 'next/server';

// Recipient email for enquiry notifications.
const RECIPIENT_EMAIL = process.env.ENQUIRY_RECIPIENT_EMAIL || 'sales@graycellpower.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refId = 'GC-' + Math.floor(100000 + Math.random() * 900000);

    const emailPayload: Record<string, string> = {
      _subject: `⚡ New Graycell Enquiry [${refId}]: ${body.requirementType || 'Technical Requirement'} - ${body.name || 'Client'}`,
      _template: 'table',
      _captcha: 'false',
      'Reference ID': refId,
      'Client Name': body.name || 'N/A',
      'Company / Organization': body.company || 'N/A',
      'Work Email': body.email || 'N/A',
      'Phone / WhatsApp': body.phone || 'N/A',
      'Equipment / Requirement Type': body.requirementType || 'N/A',
      'Capacity / Rating': body.capacity || body.capacityVoltage || 'N/A',
      'Primary / Secondary Voltage': body.voltage || 'N/A',
      'Quantity': body.quantity ? String(body.quantity) : 'N/A',
      'Project Location': body.location || 'N/A',
      'Specifications / Requirements': body.message || 'N/A',
      'Source': body.source === 'modal' ? 'Enquiry Modal (Popup)' : 'Contact Page Technical Form',
      'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const formSubmitUrl = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://graycell.knowletive.in',
        'Referer': 'https://graycell.knowletive.in/',
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      refId,
      result,
      recipient: RECIPIENT_EMAIL,
    });
  } catch (error: any) {
    console.error('Failed to route enquiry email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
