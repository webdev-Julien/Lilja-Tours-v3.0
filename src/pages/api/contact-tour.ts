import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();
    const { name, email, phone, message, tourName } = formData;

    // Validate required fields
    if (!name || !email || !message || !tourName) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create email body
    const emailBody = `
New Tour Personalization Request

Tour: ${tourName}

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the Lilja Tours website contact form.
    `.trim();

    // Try to use fetch API to send email (works on Vercel and modern hosting)
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: import.meta.env.EMAILJS_SERVICE_ID || 'default_service',
        template_id: import.meta.env.EMAILJS_TEMPLATE_ID || 'default_template',
        user_id: import.meta.env.EMAILJS_PUBLIC_KEY || '',
        template_params: {
          to_email: 'julien@lilja-tours.com',
          reply_to: email,
          from_name: name,
          subject: `LT Contact - ${tourName}`,
          message: emailBody,
        },
      }),
    });

    if (emailResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, message: 'Email sent successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fallback: If EmailJS fails, try native email (requires server-side setup)
    throw new Error('Email service unavailable');

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to send email. Please try again or contact us directly.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
