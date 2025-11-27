# Contact Form Setup Instructions - PHP mail() Version

## Overview

All contact forms on the Lilja Tours website send emails using **PHP's native mail() function** to `julien@lilja-tours.com`.

**Email Configuration:**

- Website hosted on: Hostgator (Baby Plan)
- Emails hosted on: Google Workspace
- Email method: PHP mail() function (server's sendmail/postfix)
- From address: noreply@lilja-tours.com (or similar)

**IMPORTANT**: This method is simpler but has higher risk of emails going to spam. SPF/DKIM configuration is CRITICAL.

## All Forms on the Website

### 1. Main Contact Page (`/contact/`)

- **Location**: `src/pages/contact.astro`
- **PHP Handler**: `public/contact-phpmail.php`
- **Fields**: Name, Email, Phone, Tour Type, Message
- **Subject Line**: `LT Contact - General Inquiry`

### 2. Day Tour "Personalize Your Tour" Form

- **Location**: All day tour pages `src/pages/private-day-tours-iceland/[...slug].astro`
- **PHP Handler**: `public/contact-tour-phpmail.php`
- **Fields**: Name, Email, Phone, Message, Tour Name (hidden)
- **Subject Line**: `LT Contact - [Tour Name]`

### 3. Multiday Tours Custom Form

- **Location**: `src/pages/multiday-tours-iceland/index.astro`
- **PHP Handler**: `public/contact-multiday-phpmail.php`
- **Fields**: First Name, Last Name, Email, Phone, Num People, Num Children, Children Ages, Num Days, Travel Dates, Interests (checkboxes), Accommodation Type, Budget, Details
- **Subject Line**: `LT Multiday Tour Request - [First Name] [Last Name]`

### 4. Multiday Tour Booking Modal

- **Location**: `src/components/TourBookingModal.astro` (used on individual multiday tour pages)
- **PHP Handler**: `public/contact-tour-booking-phpmail.php`
- **Fields**: Name, Email, Num People, Activities (checkboxes), Departure Date, Accommodation, Tour Name (hidden)
- **Subject Line**: `LT-MD - [Tour Name]`

---

## Initial Setup Steps

### Step 1: Configure SPF and DKIM Records (CRITICAL)

**WARNING**: With PHP mail(), SPF and DKIM configuration is ABSOLUTELY CRITICAL. Without proper DNS setup, your emails WILL go to spam folders.

#### What are SPF and DKIM?

- **SPF**: Tells email servers which servers are allowed to send emails from your domain
- **DKIM**: Cryptographically signs your emails to prove they're legitimate

#### Setting Up SPF Record

1. Log into your **Hostgator cPanel**
2. Go to **Zone Editor** or **DNS Management**
3. Find `lilja-tours.com` domain
4. Look for existing **TXT** records
5. If you already have an SPF record (starts with `v=spf1`):
   - Edit it to include: `include:lilja-tours.com a mx`
   - Full example: `v=spf1 include:lilja-tours.com a mx ~all`
6. If you DON'T have an SPF record, create a new **TXT** record:
   - **Name**: `@` (or leave blank, or `lilja-tours.com`)
   - **Type**: `TXT`
   - **Value**: `v=spf1 include:lilja-tours.com a mx ~all`
   - **TTL**: 3600 (or default)

**What does this mean?**
- `a`: Allows your domain's A record IP to send mail
- `mx`: Allows your domain's MX servers to send mail
- `~all`: Soft fail for all others (recommended for testing)

#### Setting Up DKIM Record (Hostgator)

**Option A - Using Hostgator cPanel DKIM:**

1. Log into **Hostgator cPanel**
2. Search for **Email Deliverability** or **Email Authentication**
3. Find your domain `lilja-tours.com`
4. Look for **DKIM** section
5. Click **Install the suggested record** or **Enable DKIM**
6. cPanel will automatically add the DKIM record to your DNS

**Option B - Manual DKIM Setup:**

If your host doesn't provide automatic DKIM:

1. Contact **Hostgator Support** and ask them to:
   - Enable DKIM for `lilja-tours.com`
   - Provide you with the DKIM TXT record
2. They will give you:
   - DNS Host/Name (e.g., `default._domainkey`)
   - TXT Record Value (long string starting with `v=DKIM1`)
3. Add this TXT record to your DNS in **Zone Editor**

#### Verify Your DNS Settings

After 24-48 hours, verify your SPF/DKIM are working:

1. Send a test email from your contact form
2. Check if it arrives (not in spam)
3. Use MXToolbox to verify:
   - SPF: https://mxtoolbox.com/spf.aspx
   - DKIM: https://mxtoolbox.com/dkim.aspx
   - Enter your domain: `lilja-tours.com`

### Step 2: Configure Sender Email Address

1. Open each PHP handler file:
   - `public/contact-phpmail.php`
   - `public/contact-tour-phpmail.php`
   - `public/contact-multiday-phpmail.php`
   - `public/contact-tour-booking-phpmail.php`

2. Find the line that sets the "From" address:
   ```php
   $headers .= "From: Lilja Tours <noreply@lilja-tours.com>\r\n";
   ```

3. Choose one of these options:

   **Option A - Use noreply@lilja-tours.com (Recommended):**
   - Create this email address in your Hostgator cPanel
   - Go to **Email Accounts** → **Create**
   - Create `noreply@lilja-tours.com`
   - You don't need to check this inbox (it's just for sending)

   **Option B - Use your main email:**
   - Change to: `From: Lilja Tours <julien@lilja-tours.com>\r\n`
   - Pros: Simpler setup
   - Cons: Customer might see this as the sender

   **Option C - Use Hostgator system address:**
   - Some hosts require: `From: noreply@[servername].hostgator.com`
   - Contact Hostgator support to find your correct system address
   - This is the most reliable for deliverability but looks less professional

### Step 3: Verify Server Configuration

1. Check PHP is configured to send mail:
   - Log into **Hostgator cPanel**
   - Go to **Select PHP Version** or **MultiPHP Manager**
   - Ensure PHP 7.4+ is selected (recommended: PHP 8.1+)

2. Verify sendmail is enabled:
   - Most Hostgator servers have sendmail enabled by default
   - If emails aren't sending, contact Hostgator support

---

## Deployment Instructions

### For Hostgator:

**IMPORTANT**: All files in the `public/` folder are **automatically copied** to `dist/` during build.

1. **No additional libraries needed!**

   - PHP mail() is built into PHP - no external dependencies
   - No need to download PHPMailer or other libraries

2. **Create sender email address (if using noreply@):**

   - Log into **Hostgator cPanel**
   - Go to **Email Accounts**
   - Create `noreply@lilja-tours.com` (you don't need to use this inbox)

3. **Build the site:**

   ```bash
   npm run build
   ```

   This automatically copies all files from `public/` to `dist/`:

   - `public/contact-phpmail.php` → `dist/contact-phpmail.php`
   - `public/contact-tour-phpmail.php` → `dist/contact-tour-phpmail.php`
   - `public/contact-multiday-phpmail.php` → `dist/contact-multiday-phpmail.php`
   - `public/contact-tour-booking-phpmail.php` → `dist/contact-tour-booking-phpmail.php`

4. **Upload to Hostgator:**

   - Upload the **entire `dist/` folder** to your server root directory
   - That's it! All PHP files are included.

5. **Set correct file permissions via cPanel File Manager or FTP:**

   - All PHP files: `644` (read/write for owner, read for others)
   - To set permissions in cPanel:
     - Right-click file → Change Permissions
     - Check: Owner (Read, Write), Group (Read), World (Read)

6. **Verify PHP version:**
   - Minimum required: PHP 7.0
   - Recommended: PHP 8.1 or higher
   - Check in cPanel → **Select PHP Version**

---

## Testing the Forms

### 1. Test Each Form Individually

After deployment, test each form:

1. **Main Contact Page**: https://www.lilja-tours.com/contact/

   - Fill out and submit
   - Check `julien@lilja-tours.com` inbox
   - **CHECK SPAM FOLDER** - with mail() this is common at first
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
   - `mail() has been disabled for security reasons` → Contact Hostgator
   - `Could not execute mail delivery program` → Sendmail not configured
   - No error but emails not arriving → Check spam, verify DNS

### 4. Analyze Email Headers

If emails arrive in spam:

1. Open the spam email
2. View **full headers** (in Gmail: three dots → Show original)
3. Look for:
   - **SPF**: Should show "PASS"
   - **DKIM**: Should show "PASS"
   - **DMARC**: Should show "PASS" or at least not "FAIL"
4. If any show "FAIL", your DNS needs fixing

---

## Troubleshooting

### Emails Not Sending At All

**Check #1: PHP Error Logs**

- cPanel → Error Log
- Look for "mail() has been disabled" or sendmail errors
- Common error: `sh: /usr/sbin/sendmail: not found`

**Check #2: Verify mail() is Enabled**

Create a test file `test-mail.php`:

```php
<?php
if (function_exists('mail')) {
    echo "mail() function is available.<br>";

    $to = 'julien@lilja-tours.com';
    $subject = 'Test Email';
    $message = 'This is a test email.';
    $headers = "From: noreply@lilja-tours.com\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Email failed to send.";
    }
} else {
    echo "ERROR: mail() function is disabled on this server.";
}
?>
```

Visit: `https://www.lilja-tours.com/test-mail.php`

**IMPORTANT**: Delete this file after testing!

**Check #3: Contact Hostgator Support**

If mail() is disabled or not working:
- Open support ticket
- Ask them to enable mail() function
- Ask them to verify sendmail configuration
- Ask for correct "From" address format for their server

### Emails Going to Spam (MOST COMMON ISSUE)

**This is the #1 issue with PHP mail(). Follow these steps carefully:**

**Check #1: SPF Record (CRITICAL)**

- Use https://mxtoolbox.com/spf.aspx
- Enter `lilja-tours.com`
- Should show `v=spf1 include:lilja-tours.com a mx ~all`
- Status should be "PASS"
- **If FAIL**: Fix your DNS SPF record immediately

**Check #2: DKIM Record (CRITICAL)**

- Use https://mxtoolbox.com/dkim.aspx
- Enter `default._domainkey.lilja-tours.com` (or your DKIM selector)
- Status should show valid DKIM signature
- **If FAIL**: Enable DKIM in cPanel or contact Hostgator

**Check #3: From Address**

- Verify "From" email address is on your domain
- **BAD**: `From: noreply@gmail.com` (won't work!)
- **GOOD**: `From: noreply@lilja-tours.com`
- **GOOD**: `From: julien@lilja-tours.com`

**Check #4: Reverse DNS (PTR Record)**

- Your server IP should have reverse DNS pointing to your domain
- Check with: https://mxtoolbox.com/ReverseLookup.aspx
- If not configured, contact Hostgator support
- This is often the #1 reason for mail() emails going to spam

**Check #5: Email Content**

- Avoid spam trigger words: "FREE", "CLICK HERE", excessive caps
- Include plain text version (current forms already do this)
- Don't send HTML-only emails

**Check #6: Email Reputation**

- New domains/IPs often land in spam initially
- Send emails regularly to build reputation
- Never send bulk/marketing emails from contact form sender address

### Form Shows Error in Browser

**Check Browser Console (F12):**

- Look for JavaScript errors
- Common: "Failed to fetch" → PHP file not found or wrong path
- CORS errors → PHP headers not set correctly

**Verify PHP File Paths:**

- All PHP handlers should be in root directory
- Called with `/contact-phpmail.php`, `/contact-tour-phpmail.php`, etc.
- NOT in a subdirectory

**Check Form Action:**

- Each form should have correct `action` or `fetch()` URL
- Should point to correct PHP file

### Advanced Troubleshooting

**Enable PHP mail() Logging:**

Add this to the top of your PHP files (temporarily):

```php
ini_set('error_log', '/home/username/public_html/php-mail-errors.log');
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

Replace `/home/username/public_html/` with your actual cPanel home path.

**Check if Emails are Being Blocked:**

1. Try sending to a different email provider (Gmail, Yahoo, Outlook)
2. If works on one but not others → reputation issue
3. If doesn't work on any → server configuration issue

---

## Security Best Practices

### 1. Validate and Sanitize All Inputs

All PHP handlers already include:
- `htmlspecialchars()` to prevent XSS
- `strip_tags()` to remove HTML
- `FILTER_VALIDATE_EMAIL` for email validation

### 2. Prevent Email Header Injection

Already implemented in all handlers:
```php
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);
```

This prevents attackers from injecting malicious headers.

### 3. Enable HTTPS

- Verify your site uses HTTPS (should already be enabled)
- Forms should only submit over encrypted connections

### 4. Rate Limiting (Recommended)

Consider adding rate limiting to prevent spam:

```php
session_start();
$time = time();
$limit = 60; // seconds between submissions

if (isset($_SESSION['last_submission']) && ($time - $_SESSION['last_submission']) < $limit) {
    die('Please wait before submitting again.');
}
$_SESSION['last_submission'] = $time;
```

### 5. Add reCAPTCHA (Optional but Recommended)

PHP mail() forms are more vulnerable to spam. Consider adding Google reCAPTCHA v3:
- Sign up: https://www.google.com/recaptcha/admin
- Add reCAPTCHA to forms
- Verify token in PHP before sending email

---

## Comparison: mail() vs SMTP

### Advantages of PHP mail()

✅ Simpler setup - no external libraries
✅ No credentials to manage
✅ No external SMTP connection needed
✅ Faster (no network overhead)

### Disadvantages of PHP mail()

❌ Higher risk of emails going to spam
❌ Less control over email delivery
❌ Harder to troubleshoot failures
❌ Depends on server mail configuration
❌ Can't use external email provider features
❌ Limited to server's email limits

### When to Use mail()

- Your server has good email reputation
- You've properly configured SPF/DKIM/PTR
- You're on a dedicated IP or reputable shared host
- You want simpler setup and don't need advanced features

### When to Use SMTP Instead

- Emails consistently go to spam with mail()
- You want guaranteed delivery (like with Google Workspace)
- You need detailed error messages
- Your host blocks or limits mail()
- You want to use external email service features

**If mail() isn't working reliably, use the SMTP version instead**: See `CONTACT_FORM_SETUP.md`

---

## File Structure

### Development (Your Local Project)

```
Lilja Tours v3.0/
├── public/                              ← Put all PHP files here
│   ├── contact-phpmail.php              ← Main contact handler
│   ├── contact-tour-phpmail.php         ← Day tour form handler
│   ├── contact-multiday-phpmail.php     ← Multiday custom form handler
│   └── contact-tour-booking-phpmail.php ← Booking modal handler
├── src/
│   └── pages/
│       └── contact.astro                ← Updated to use contact-phpmail.php
└── ... (other project files)
```

### Production (After `npm run build` → Upload to Hostgator)

```
dist/ (server root)
├── index.html
├── contact-phpmail.php                  ← Auto-copied from public/
├── contact-tour-phpmail.php             ← Auto-copied from public/
├── contact-multiday-phpmail.php         ← Auto-copied from public/
├── contact-tour-booking-phpmail.php     ← Auto-copied from public/
├── test-mail.php                        ← Create temporarily for testing (delete after)
└── ... (all other built files)
```

**Key Point**: Everything in `public/` automatically goes to `dist/` during build!

---

## Email Format Examples

### Main Contact Form Email

```
Subject: LT Contact - General Inquiry
From: Lilja Tours <noreply@lilja-tours.com>
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

*Same format as SMTP version for other forms...*

---

## Maintenance & Updates

### Changing Email Recipient

To send emails to a different address:

1. Edit each PHP handler file
2. Change `$to = 'julien@lilja-tours.com';` to new email
3. Rebuild and redeploy

### Changing From Address

1. Edit each PHP handler file
2. Change `From: Lilja Tours <noreply@lilja-tours.com>`
3. If using new domain, update SPF/DKIM records
4. Rebuild and redeploy

### Updating Form Fields

If you add/remove form fields:

1. Update the `.astro` form file
2. Update the corresponding `-phpmail.php` handler
3. Ensure new fields are sanitized in PHP
4. Test thoroughly

---

## Need Help?

### Common Questions

**Q: Why are my emails going to spam?**
A: This is the most common issue with mail(). Verify SPF, DKIM, and PTR records. Consider switching to SMTP method if problem persists.

**Q: mail() is disabled on my server. What do I do?**
A: Contact Hostgator support to enable it, or use the SMTP version instead (see `CONTACT_FORM_SETUP.md`).

**Q: Can I use a Gmail address as the From address?**
A: No! You must use an email address on your domain (e.g., `noreply@lilja-tours.com` or `julien@lilja-tours.com`).

**Q: Should I create the noreply@lilja-tours.com email account?**
A: Yes, recommended. Create it in cPanel → Email Accounts. You don't need to check this inbox.

**Q: How do I know if my server supports mail()?**
A: Use the test-mail.php script in the Troubleshooting section above.

### Support Resources

- **Hostgator Support**: https://www.hostgator.com/support
- **cPanel Email Deliverability Docs**: https://docs.cpanel.net/cpanel/email/email-deliverability/
- **Email Testing Tools**:
  - MXToolbox: https://mxtoolbox.com/
  - Mail Tester: https://www.mail-tester.com/
  - DKIM Validator: https://dkimvalidator.com/

---

## Files Modified/Created

### Created (in public/ folder - auto-copied to dist/ at build):

- `public/contact-phpmail.php` - Main contact page handler
- `public/contact-tour-phpmail.php` - Day tour form handler
- `public/contact-multiday-phpmail.php` - Multiday custom form handler
- `public/contact-tour-booking-phpmail.php` - Booking modal handler

### Created (documentation):

- `CONTACT_FORM_SETUP_PHPMAIL.md` - This complete setup guide for mail() method

### Updated (source files):

- `src/pages/contact.astro` - Updated form to use contact-phpmail.php handler

---

## Success Checklist

### DNS Configuration (CRITICAL):

- [ ] SPF record added to Hostgator DNS
- [ ] DKIM enabled in cPanel Email Deliverability
- [ ] Reverse DNS (PTR) configured (may need to contact Hostgator)
- [ ] Waited 24-48 hours for DNS propagation
- [ ] DNS verified using MXToolbox

### Before Building:

- [ ] Sender email address created in cPanel (if using noreply@)
- [ ] "From" address in PHP files matches an email on your domain
- [ ] PHP version verified (7.0+ recommended 8.1+)
- [ ] mail() function confirmed enabled (use test-mail.php script)

### After Deployment:

- [ ] Built site with `npm run build`
- [ ] Uploaded entire `dist/` folder to Hostgator
- [ ] File permissions set correctly (644 for all PHP files)

### Testing:

- [ ] All 4 forms tested and emails received at `julien@lilja-tours.com`:
  - [ ] Main contact form (`/contact/`)
  - [ ] Day tour form (any day tour page)
  - [ ] Multiday custom form (`/multiday-tours-iceland/`)
  - [ ] Multiday booking modal (any multiday tour page)
- [ ] Checked spam folders (common with mail() initially)
- [ ] Email headers checked - SPF and DKIM showing "PASS"
- [ ] Reply-To addresses work correctly (can reply to customer email)
- [ ] Form validation working (required fields, email format)
- [ ] Success/error messages display correctly
- [ ] Browser console shows no errors (press F12)
- [ ] PHP error logs show no errors (check cPanel)
- [ ] Test files deleted (`test-mail.php` if created)

### If Emails Go to Spam:

- [ ] Verify SPF record: https://mxtoolbox.com/spf.aspx
- [ ] Verify DKIM record: https://mxtoolbox.com/dkim.aspx
- [ ] Verify PTR record: https://mxtoolbox.com/ReverseLookup.aspx
- [ ] Send test email to Mail Tester: https://www.mail-tester.com/
- [ ] Consider switching to SMTP method (see `CONTACT_FORM_SETUP.md`)

---

**Last Updated**: 2025-01-27
**Email System**: PHP mail() function
**Hosting**: Hostgator Baby Plan
**Forms Count**: 4 (Contact, Day Tour, Multiday Custom, Multiday Booking)

**⚠️ IMPORTANT**: If you experience persistent spam issues or mail() reliability problems, consider using the SMTP version instead. See `CONTACT_FORM_SETUP.md` for SMTP setup instructions.
