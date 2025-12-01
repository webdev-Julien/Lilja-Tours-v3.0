# Contact Form Setup Instructions - UPDATED 2025

## Overview

All contact forms on the Lilja Tours website now send emails via **Google Workspace SMTP** to `julien@lilja-tours.com`.

**Email Configuration:**

- Website hosted on: Hostgator (Baby Plan)
- Emails hosted on: Google Workspace
- SMTP Server: smtp.gmail.com
- SMTP Port: 587 (TLS)
- Authentication: Required

## All Forms on the Website

### 1. Main Contact Page (`/contact/`)

- **Location**: `src/pages/contact.astro`
- **PHP Handler**: `public/contact.php`
- **Fields**: Name, Email, Phone, Tour Type, Message
- **Subject Line**: `LT Contact - General Inquiry`

### 2. Day Tour "Personalize Your Tour" Form

- **Location**: All day tour pages `src/pages/private-day-tours-iceland/[...slug].astro`
- **PHP Handler**: `public/contact-tour.php`
- **Fields**: Name, Email, Phone, Message, Tour Name (hidden)
- **Subject Line**: `LT Contact - [Tour Name]`

### 3. Multiday Tours Custom Form

- **Location**: `src/pages/multiday-tours-iceland/index.astro`
- **PHP Handler**: `public/contact-multiday.php`
- **Fields**: First Name, Last Name, Email, Phone, Num People, Num Children, Children Ages, Num Days, Travel Dates, Interests (checkboxes), Accommodation Type, Budget, Details
- **Subject Line**: `LT Multiday Tour Request - [First Name] [Last Name]`

### 4. Multiday Tour Booking Modal

- **Location**: `src/components/TourBookingModal.astro` (used on individual multiday tour pages)
- **PHP Handler**: `public/contact-tour-booking.php`
- **Fields**: Name, Email, Num People, Activities (checkboxes), Departure Date, Accommodation, Tour Name (hidden)
- **Subject Line**: `LT-MD - [Tour Name]`

---

## Initial Setup Steps

### Step 1: Create Google App Password

Since you're using Google Workspace with 2-factor authentication (recommended), you need to create an **App Password** for SMTP:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already enabled)
3. Scroll down to **App passwords** (or go directly to: https://myaccount.google.com/apppasswords)
4. You may be asked to sign in again for security
5. In the "App name" field, type: **Lilja Tours Website** (or any name you prefer)
6. Click **Create**
7. **IMPORTANT**: Copy the 16-character password shown (format: `cjtl oylj ecaq xsno`)
8. **Save this password securely** - you'll need it for the next step
9. Click **Done**

**Note**: Google's interface has been simplified. You no longer select "app" or "device" - just name your app password and generate it.

### Step 2: Configure SMTP Credentials

1. Open the file `public/smtp-config.php` (I'll create this for you)
2. Replace `YOUR_GOOGLE_APP_PASSWORD_HERE` with the app password from Step 1
3. **IMPORTANT**: This file contains sensitive credentials
   - It's already in `.gitignore` (I'll add it)
   - Never commit this file to Git
   - Keep a backup copy somewhere secure

### Step 3: Configure SPF and DKIM Records (CRITICAL for Email Deliverability)

To prevent your emails from going to spam, you MUST configure these DNS records:

#### What are SPF and DKIM?

- **SPF**: Tells email servers which servers are allowed to send emails from your domain
- **DKIM**: Cryptographically signs your emails to prove they're legitimate

#### Setting Up SPF Record

1. Log into your **Hostgator cPanel**
2. Go to **Zone Editor** or **DNS Management**
3. Find `lilja-tours.com` domain
4. Look for existing **TXT** records
5. If you already have an SPF record (starts with `v=spf1`):
   - Edit it to include: `include:_spf.google.com include:lilja-tours.com`
   - Full example: `v=spf1 include:_spf.google.com include:lilja-tours.com ~all`
6. If you DON'T have an SPF record, create a new **TXT** record:
   - **Name**: `@` (or leave blank, or `lilja-tours.com`)
   - **Type**: `TXT`
   - **Value**: `v=spf1 include:_spf.google.com include:lilja-tours.com ~all`
   - **TTL**: 3600 (or default)

#### Setting Up DKIM Record

1. In your **Google Workspace Admin Console**: https://admin.google.com/
2. Go to **Apps** → **Google Workspace** → **Gmail**
3. Click **Authenticate email**
4. Click **Generate new record** for DKIM
5. Google will provide you with:
   - A **DNS Host/Name** (something like `google._domainkey`)
   - A **TXT Record Value** (long string starting with `v=DKIM1`)
6. Go back to **Hostgator cPanel** → **Zone Editor**
7. Create a new **TXT** record:
   - **Name**: The DNS Host/Name from Google (e.g., `google._domainkey`)
   - **Type**: `TXT`
   - **Value**: The TXT Record Value from Google
   - **TTL**: 3600
8. Click **Save**
9. Go back to Google Admin Console and click **Start Authentication**
10. Wait 24-48 hours for DNS propagation, then verify it's working

#### Verify Your DNS Settings

After 24-48 hours, verify your SPF/DKIM are working:

1. Send a test email from your contact form
2. Check if it arrives (not in spam)
3. Use MXToolbox to verify:
   - SPF: https://mxtoolbox.com/spf.aspx
   - DKIM: https://mxtoolbox.com/dkim.aspx
   - Enter your domain: `lilja-tours.com`

---

## Deployment Instructions

### For Hostgator:

**IMPORTANT**: All files in the `public/` folder are **automatically copied** to `dist/` during build. You don't need to upload PHP files separately!

1. **Ensure PHPMailer is in place:**

   - Download PHPMailer from: https://github.com/PHPMailer/PHPMailer/releases
   - Extract and copy these 3 files to `public/PHPMailer/`:
     - `src/PHPMailer.php` → `public/PHPMailer/PHPMailer.php`
     - `src/SMTP.php` → `public/PHPMailer/SMTP.php`
     - `src/Exception.php` → `public/PHPMailer/Exception.php`

2. **Configure SMTP credentials:**

   - Open `public/smtp-config.php`
   - Replace `YOUR_GOOGLE_APP_PASSWORD_HERE` with your actual Google App Password
   - Save the file

3. **Build the site:**

   ```bash
   npm run build
   ```

   This automatically copies all files from `public/` to `dist/`:

   - `public/smtp-config.php` → `dist/smtp-config.php`
   - `public/contact.php` → `dist/contact.php`
   - `public/contact-tour.php` → `dist/contact-tour.php`
   - `public/contact-multiday.php` → `dist/contact-multiday.php`
   - `public/contact-tour-booking.php` → `dist/contact-tour-booking.php`
   - `public/PHPMailer/` → `dist/PHPMailer/`

4. **Upload to Hostgator:**

   - Upload the **entire `dist/` folder** to your server root directory
   - That's it! All PHP files and PHPMailer are already included.

5. **Set correct file permissions via cPanel File Manager or FTP:**

   - Most PHP files: `644` (default is usually fine)
   - `smtp-config.php`: `600` (more restrictive for security)
   - To set permissions in cPanel:
     - Right-click file → Change Permissions
     - For `smtp-config.php`: Check only "Owner: Read" and "Owner: Write"

6. **Verify PHP version:**
   - Minimum required: PHP 7.4
   - Check in cPanel → **Select PHP Version**
   - Recommended: PHP 8.1 or higher

---

## Testing the Forms

### 1. Test Each Form Individually

After deployment, test each form:

1. **Main Contact Page**: https://www.lilja-tours.com/contact/

   - Fill out and submit
   - Check `julien@lilja-tours.com` inbox
   - Check spam folder if not received
   - Subject should be: `LT Contact - General Inquiry`

2. **Day Tour Form**: Visit any day tour page, scroll to "Personalize Your Tour"

   - Example: https://www.lilja-tours.com/private-day-tours-iceland/golden-circle-complete-farm-to-table/
   - Fill out and submit
   - Subject should be: `LT Contact - [Tour Name]`

3. **Multiday Custom Form**: https://www.lilja-tours.com/multiday-tours-iceland/

   - Scroll to "Design Your Perfect Journey" section
   - Fill out and submit
   - Subject should be: `LT Multiday Tour Request - [Your Name]`

4. **Multiday Booking Modal**: Visit any multiday tour page
   - Example: https://www.lilja-tours.com/multiday-tours-iceland/golden-circle-south-coast/
   - Click "Book This Tour" button
   - Fill out modal and submit
   - Subject should be: `LT-MD - [Tour Name]`

### 2. Test in Browser Console

Open browser Developer Tools (F12) → Console tab before submitting each form to see any JavaScript errors.

### 3. Check Server PHP Error Logs

If emails aren't sending:

1. Log into **Hostgator cPanel**
2. Go to **Errors** or **Error Log**
3. Look for PHP errors related to mail sending
4. Common issues:
   - Wrong SMTP credentials
   - Firewall blocking port 587
   - Missing PHPMailer files

---

## Troubleshooting

### Emails Not Sending

**Check #1: SMTP Credentials**

- Verify you used the correct **App Password** (16 characters, no spaces)
- Verify email address is `julien@lilja-tours.com`
- Check `smtp-config.php` for typos

**Check #2: PHP Error Logs**

- cPanel → Error Log
- Look for "SMTP connect() failed" or similar errors

**Check #3: Firewall/Port Issues**

- Contact Hostgator support
- Ask them to verify port 587 (TLS) is open for outbound SMTP connections
- Some shared hosting blocks SMTP ports

**Check #4: Google Workspace Settings**

- Verify 2-step verification is enabled
- Verify App Password hasn't expired
- Check Google Admin Console for any security blocks

### Emails Going to Spam

**Check #1: SPF Record**

- Use https://mxtoolbox.com/spf.aspx
- Enter `lilja-tours.com`
- Should show `v=spf1 include:_spf.google.com include:lilja-tours.com ~all`
- Status should be "PASS"

**Check #2: DKIM Record**

- Use https://mxtoolbox.com/dkim.aspx
- Enter `google._domainkey.lilja-tours.com`
- Status should show "PASS" or valid DKIM signature

**Check #3: From Address**

- Verify emails are sent FROM `julien@lilja-tours.com`
- Check email headers in received emails
- From address should match a real Google Workspace email

**Check #4: Email Content**

- Avoid spam trigger words: "FREE", "CLICK HERE", excessive caps
- Current form emails are clean and professional

### Form Shows Error in Browser

**Check Browser Console (F12):**

- Look for JavaScript errors
- Common: "Failed to fetch" → means PHP file not found or wrong path
- CORS errors → means PHP headers not set correctly

**Verify PHP File Paths:**

- All PHP handlers should be in root directory
- Called with `/contact.php`, `/contact-tour.php`, etc.
- NOT in a subdirectory

**Check Form Action:**

- Each form should have correct `action` or `fetch()` URL
- Should point to correct PHP file

### Test SMTP Connection Directly

Create a test file `test-smtp.php` in your root directory:

```php
<?php
require 'smtp-config.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;

    $mail->setFrom(SMTP_USERNAME, 'Lilja Tours Test');
    $mail->addAddress(SMTP_USERNAME);
    $mail->Subject = 'SMTP Test';
    $mail->Body = 'If you receive this, SMTP is working correctly!';

    $mail->send();
    echo 'SUCCESS: Email sent! Check your inbox.';
} catch (Exception $e) {
    echo 'ERROR: ' . $mail->ErrorInfo;
}
?>
```

Visit: `https://www.lilja-tours.com/test-smtp.php`

**IMPORTANT**: Delete this file after testing for security!

---

## Security Best Practices

### 1. Protect smtp-config.php

- File should have `600` permissions (owner read/write only)
- Already in `.gitignore` - never commit to Git
- Store backup copy securely offline

### 2. Enable HTTPS

- Verify your site uses HTTPS (should already be enabled)
- Forms should only submit over encrypted connections

### 3. Validate Form Inputs

- All PHP handlers already include input sanitization
- Uses `htmlspecialchars()` and `strip_tags()`
- Email validation with `FILTER_VALIDATE_EMAIL`

### 4. Rate Limiting (Optional)

- Consider adding rate limiting to prevent spam
- Can use PHP sessions to track submissions
- Or use cPanel → "Email Deliverability" → "Rate Limiting"

### 5. Regular Monitoring

- Check email logs periodically
- Monitor spam folder for legitimate emails
- Review cPanel error logs monthly

---

## File Structure

### Development (Your Local Project)

```
Lilja Tours v3.0/
├── public/                           ← Put all PHP files here
│   ├── smtp-config.php              ← SENSITIVE - configure with app password
│   ├── contact.php                  ← Main contact handler
│   ├── contact-tour.php             ← Day tour form handler
│   ├── contact-multiday.php         ← Multiday custom form handler
│   ├── contact-tour-booking.php     ← Booking modal handler
│   └── PHPMailer/                   ← Download PHPMailer here
│       ├── PHPMailer.php
│       ├── SMTP.php
│       └── Exception.php
├── src/
│   └── pages/
│       └── contact.astro            ← Updated to use contact.php
└── ... (other project files)
```

### Production (After `npm run build` → Upload to Hostgator)

```
dist/ (server root)
├── index.html
├── smtp-config.php                  ← Auto-copied from public/
├── contact.php                      ← Auto-copied from public/
├── contact-tour.php                 ← Auto-copied from public/
├── contact-multiday.php             ← Auto-copied from public/
├── contact-tour-booking.php         ← Auto-copied from public/
├── test-smtp.php                    ← Create temporarily for testing (delete after)
├── PHPMailer/                       ← Auto-copied from public/
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
└── ... (all other built files)
```

**Key Point**: Everything in `public/` automatically goes to `dist/` during build!

---

## Email Format Examples

### Main Contact Form Email

```
Subject: LT Contact - General Inquiry
From: julien@lilja-tours.com
Reply-To: customer@example.com

New Contact Form Submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Information:
Name: John Doe
Email: customer@example.com
Phone: +1 234 567 8900
Tour Type: Private Day Tour

Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Customer's message here]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the Lilja Tours contact form.
```

### Day Tour Form Email

```
Subject: LT Contact - Golden Circle Complete - Farm to Table
From: julien@lilja-tours.com
Reply-To: customer@example.com

New Tour Personalization Request

Tour: Golden Circle Complete - Farm to Table

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

### Multiday Custom Form Email

```
Subject: LT Multiday Tour Request - John Doe
From: julien@lilja-tours.com
Reply-To: customer@example.com

New Multiday Tour Customization Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION

Name: John Doe
Email: customer@example.com
Phone: +1 234 567 8900

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRIP DETAILS

Number of People: 4
Number of Children: 2
Children's Ages: 8, 12
Number of Days with Guide: 7
Travel Dates: June 15-22, 2025
Main Interests: Sightseeing, Hiking, Relaxation & Hot Springs
Accommodation Type: 4* hotel
Total Budget: 1,500,000 ISK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADDITIONAL DETAILS

[Customer's details here]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the Lilja Tours multiday tours contact form.
Please respond within 24 hours with a personalized itinerary proposal.
```

### Multiday Booking Modal Email

```
Subject: LT-MD - 3-Day Golden Circle & South Coast Exploration
From: julien@lilja-tours.com
Reply-To: customer@example.com

New Multiday Tour Booking Request

Tour: 3-Day Golden Circle & South Coast Exploration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION

Name: John Doe
Email: customer@example.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOOKING DETAILS

Number of People: 2
Departure Date: 2025-06-15
Accommodation Type: 4* hotel
Selected Activities: Fontana Spa, Glacier Hiking, Ice Cave Exploration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was sent from the Lilja Tours multiday tour booking form.
```

---

## Maintenance & Updates

### Changing Email Address

To send emails to a different address:

1. Edit `smtp-config.php`
2. Change `SMTP_USERNAME` to the new email
3. Change `SMTP_PASSWORD` to the new app password
4. No other files need updating (they use the config)

### Updating Form Fields

If you add/remove form fields:

1. Update the `.astro` form file
2. Update the corresponding `.php` handler
3. Ensure new fields are sanitized in PHP
4. Update this documentation

### PHPMailer Updates

PHPMailer is included in the project. To update:

1. Download latest from: https://github.com/PHPMailer/PHPMailer
2. Replace files in `public/PHPMailer/` folder
3. Test all forms after updating

---

## Need Help?

### Common Questions

**Q: Can I use a different email provider?**
A: Yes, but you'll need to update SMTP settings in `smtp-config.php`. Google Workspace is recommended for reliability.

**Q: Why not use Formspree or SendGrid?**
A: Using your own SMTP gives you full control, no monthly limits, and emails come from your domain. It's more professional.

**Q: What if I get locked out of Google?**
A: Keep your App Password backed up securely. You can always generate a new one from Google Account settings.

**Q: Should I use a different "From" address?**
A: Current setup uses `julien@lilja-tours.com` for both From and Reply-To. This is recommended for deliverability.

### Support Resources

- **Hostgator Support**: https://www.hostgator.com/support
- **Google Workspace Help**: https://support.google.com/a/
- **PHPMailer Docs**: https://github.com/PHPMailer/PHPMailer/wiki
- **Email Testing Tools**:
  - MXToolbox: https://mxtoolbox.com/
  - Mail Tester: https://www.mail-tester.com/
  - DKIM Validator: https://dkimvalidator.com/

---

## Files Modified/Created

### Created (in public/ folder - auto-copied to dist/ at build):

- `public/smtp-config.php` - SMTP credentials (SENSITIVE - configure before build)
- `public/contact.php` - Main contact page handler
- `public/PHPMailer/` - PHPMailer library folder (download from GitHub)
  - `public/PHPMailer/PHPMailer.php`
  - `public/PHPMailer/SMTP.php`
  - `public/PHPMailer/Exception.php`

### Created (documentation):

- `CONTACT_FORM_SETUP.md` - This complete setup guide

### Updated (in public/ folder):

- `public/contact-tour.php` - Updated to use SMTP instead of mail()
- `public/contact-multiday.php` - Updated to use SMTP instead of mail()
- `public/contact-tour-booking.php` - Updated to use SMTP instead of mail()

### Updated (source files):

- `src/pages/contact.astro` - Updated form to use contact.php handler
- `.gitignore` - Added `smtp-config.php` to prevent committing credentials

### Can Delete (optional):

- `public/test-contact.html` - No longer needed
- `src/pages/api/contact-tour.ts` - No longer needed (was for Vercel deployment)

---

## Success Checklist

### Before Building:

- [ ] PHPMailer downloaded and placed in `public/PHPMailer/` folder
  - [ ] `public/PHPMailer/PHPMailer.php` exists
  - [ ] `public/PHPMailer/SMTP.php` exists
  - [ ] `public/PHPMailer/Exception.php` exists
- [ ] Google App Password created and saved securely
- [ ] `public/smtp-config.php` configured with correct app password
- [ ] `.gitignore` includes `smtp-config.php` (prevents committing credentials)

### DNS Configuration:

- [ ] SPF record added to Hostgator DNS
- [ ] DKIM record added to Hostgator DNS
- [ ] Waited 24-48 hours for DNS propagation
- [ ] DNS verified using MXToolbox

### After Deployment:

- [ ] Built site with `npm run build`
- [ ] Uploaded entire `dist/` folder to Hostgator
- [ ] File permissions set correctly:
  - [ ] `smtp-config.php` has permission 600
  - [ ] Other PHP files have permission 644
- [ ] PHP version verified (7.4+ recommended 8.1+)

### Testing:

- [ ] All 4 forms tested and emails received at `julien@lilja-tours.com`:
  - [ ] Main contact form (`/contact/`)
  - [ ] Day tour form (any day tour page)
  - [ ] Multiday custom form (`/multiday-tours-iceland/`)
  - [ ] Multiday booking modal (any multiday tour page)
- [ ] Emails NOT in spam folder
- [ ] Reply-To addresses work correctly (can reply to customer email)
- [ ] Form validation working (required fields, email format)
- [ ] Success/error messages display correctly
- [ ] Browser console shows no errors (press F12)
- [ ] PHP error logs show no errors (check cPanel)
- [ ] Test files deleted (`test-smtp.php` if created)

### Final Verification:

- [ ] Forms working on live site at next build ✓

---

**Last Updated**: 2025-01-27
**Email System**: Google Workspace SMTP
**Hosting**: Hostgator Baby Plan
**Forms Count**: 4 (Contact, Day Tour, Multiday Custom, Multiday Booking)
