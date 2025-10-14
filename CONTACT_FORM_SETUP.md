# Contact Form Setup Instructions

## Overview
The "Personalize Your Tour" contact form has been added to all tour pages. It sends emails to `julien@lilja-tours.com` with the subject line `LT Contact - [Tour Name]`.

## Testing the Form

### 1. Test Locally (Development)
```bash
npm run dev
```
Visit any tour page and scroll to the "Personalize Your Tour" section.

### 2. Test in Production Build
```bash
npm run build
npm run preview
```

### 3. Test the PHP Endpoint Directly
After deploying to Hostgator, visit:
```
https://www.lilja-tours.com/test-contact.html
```
This standalone test page will verify if the PHP mail function is working correctly.

## Deployment Instructions

### For Hostgator (or traditional hosting):

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Upload these files to your server:**
   - All files from `dist/` folder
   - The `contact-tour.php` file should be in the root directory

3. **Verify PHP mail() is enabled:**
   - Most Hostgator Baby Plans have PHP mail() enabled by default
   - If emails aren't sending, contact Hostgator support to ensure mail() is enabled

4. **Test the form:**
   - Visit `https://www.lilja-tours.com/test-contact.html`
   - Fill out and submit the test form
   - Check if the email arrives at `julien@lilja-tours.com`

### For Vercel (if using):

The current setup uses PHP which doesn't work on Vercel. If you deploy to Vercel, you'll need to either:

1. **Use a serverless function** (I can create this if needed)
2. **Use a third-party service** like:
   - FormSubmit.co (free, no signup required)
   - Web3Forms (free with API key)
   - EmailJS (free tier available)

## Troubleshooting

### Email not sending from Hostgator:

1. **Check PHP mail() is enabled:**
   Create a file `test-mail.php` with:
   ```php
   <?php
   $to = "julien@lilja-tours.com";
   $subject = "Test Email";
   $message = "This is a test email.";
   $headers = "From: noreply@lilja-tours.com";

   if (mail($to, $subject, $message, $headers)) {
       echo "Email sent successfully";
   } else {
       echo "Email failed to send";
   }
   ?>
   ```
   Visit this file in browser and check result.

2. **Check spam folder:**
   Emails from the contact form might initially land in spam.

3. **Verify email headers:**
   The "From" address should be from your domain (`noreply@lilja-tours.com`)
   The "Reply-To" address is set to the visitor's email

4. **Contact Hostgator support:**
   If mail() still doesn't work, ask them to enable it or configure SMTP.

### Form shows error in browser:

1. **Check browser console** (F12) for errors
2. **Verify the PHP file exists** at `/contact-tour.php`
3. **Check file permissions** (should be 644 or 755)

## Email Format

Recipients will receive emails formatted like this:

```
Subject: LT Contact - Westman Islands Adventure
Reply-To: customer@example.com

New Tour Personalization Request

Tour: Westman Islands Adventure

Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: John Doe
Email: customer@example.com
Phone: +1 234 567 8900

Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Customer's message here]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the Lilja Tours website contact form.
```

## Features

✓ Works with Hostgator Baby Plan
✓ Easy to read email format
✓ Reply-To header set to visitor's email
✓ Subject includes tour name
✓ Form validation
✓ Success/error messages
✓ Responsive design
✓ Matches website styling
✓ Auto-scrolls to success/error messages

## Files Modified/Created

1. **Modified:**
   - `src/pages/private-day-tours-iceland/[...slug].astro` - Added form section and JavaScript
   - `astro.config.mjs` - Set output to 'static' and site URL

2. **Created:**
   - `public/contact-tour.php` - PHP email handler
   - `public/test-contact.html` - Standalone test page
   - `src/pages/api/contact-tour.ts` - API endpoint (for future Vercel deployment)
   - `CONTACT_FORM_SETUP.md` - This file

## Need Help?

If you need to switch to a different email service or have issues, let me know and I can help configure an alternative solution.
