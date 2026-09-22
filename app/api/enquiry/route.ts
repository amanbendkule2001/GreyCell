import { NextResponse } from 'next/server';

// Recipient email for enquiry notifications.
const RECIPIENT_EMAIL = process.env.ENQUIRY_RECIPIENT_EMAIL || 'sales@graycellpower.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const refId = 'GC-' + Math.floor(100000 + Math.random() * 900000);

    const productName = body.productName || '';
    const requirementType = body.requirementType || 'Technical Requirement';
    const clientIdentifier = body.company || body.name || 'Client';

    const getSourceLabel = (src?: string) => {
      switch (src) {
        case 'modal':
          return 'Product Enquiry Modal (Popup)';
        case 'contact-page':
          return 'Contact Page Technical Form';
        case 'build-your-requirement':
          return 'Build Your Requirement Intake Tool';
        default:
          return src || 'Website Enquiry Form';
      }
    };

    const emailPayload: Record<string, string> = {
      _subject: `⚡ New Graycell Enquiry [${refId}]: ${productName ? `${productName} — ` : ''}${requirementType} (${clientIdentifier})`,
      _template: 'table',
      _captcha: 'false',
      'Reference ID': refId,
      'Product / Requirement': productName ? `${productName} (${requirementType})` : requirementType,
      'Client Name': body.name || 'N/A',
      'Company / Organization': body.company || 'N/A',
      'Work Email': body.email || 'N/A',
      'Phone / WhatsApp': body.phone || body.mobile || 'N/A',
      'Capacity / Rating': body.capacity || body.capacityVoltage || 'N/A',
      'Primary / Secondary Voltage': body.voltage || body.voltageRatio || 'N/A',
      'Industry / Segment / Application': body.application || body.segment || 'N/A',
      'Installation Context': body.installation || 'N/A',
      'Quantity': body.quantity ? String(body.quantity) : 'N/A',
      'Project Location': body.location || 'N/A',
      'Specifications / Message': body.message || body.specifications || 'N/A',
      'Submission Source': getSourceLabel(body.source),
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
