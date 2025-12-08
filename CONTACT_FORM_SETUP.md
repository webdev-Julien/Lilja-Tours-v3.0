# Contact Form Setup Instructions - UPDATED December 2025

## Overview

All contact forms on the Lilja Tours website send emails via **Google Workspace SMTP** to `julien@lilja-tours.com`.

**Email Configuration:**

- Website hosted on: Hostgator (Baby Plan)
- Emails hosted on: Google Workspace
- SMTP Server: smtp.gmail.com
- SMTP Port: 587 (TLS)
- Authentication: Required (App Password OR OAuth2)

---

## Authentication Methods

Google requires secure authentication for SMTP. You have **two options**:

### Option A: App Password (Simpler - Recommended for Most Users)

App Passwords are still fully supported by Google as of 2025. They require 2-Step Verification to be enabled.

**Requirements:**
- 2-Step Verification enabled on Google account
- Google Workspace admin hasn't disabled App Passwords

### Option B: OAuth2 (More Secure - For Advanced Users)

OAuth2 uses tokens instead of passwords and is Google's preferred authentication method. More complex to set up but doesn't require App Passwords.

**Requirements:**
- Google Cloud Console project
- OAuth2 credentials (Client ID, Client Secret)
- Refresh token generation

---

## Option A: App Password Setup (Recommended)

### Step 1: Enable 2-Step Verification

1. Go to: https://myaccount.google.com/security
2. Find "2-Step Verification" and click it
3. Follow the prompts to enable it (phone number, authenticator app, etc.)
4. Complete the setup

### Step 2: Create App Password

1. Go to: https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. In "App name" field, type: `Lilja Tours Website`
4. Click **Create**
5. **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)
6. **Save this securely** - you won't see it again!
7. Click **Done**

**Troubleshooting App Passwords:**
- If you don't see "App passwords" option:
  - 2-Step Verification might not be enabled
  - Your Google Workspace admin may have disabled it
  - Try: Google Admin Console → Security → Basic Settings → Less secure apps

### Step 3: Configure smtp-config.php

Edit `public/smtp-config.php`:

```php
define('SMTP_PASSWORD', 'xxxx xxxx xxxx xxxx'); // Your 16-char App Password
```

---

## Option B: OAuth2 Setup (Advanced)

If App Passwords don't work or you want better security, use OAuth2.

### Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click "Select a project" → "New Project"
3. Name: `Lilja Tours Contact Forms`
4. Click "Create"

### Step 2: Enable Gmail API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Gmail API"
3. Click on it and click "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "Internal" (for Google Workspace) or "External"
3. Fill in:
   - App name: `Lilja Tours Contact Forms`
   - User support email: `julien@lilja-tours.com`
   - Developer contact: `julien@lilja-tours.com`
4. Click "Save and Continue"
5. Add scope: `https://mail.google.com/`
6. Complete the remaining steps

### Step 4: Create OAuth2 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: `Lilja Tours SMTP`
5. Authorized redirect URIs: Add `https://www.lilja-tours.com/oauth2callback.php`
6. Click "Create"
7. **Save the Client ID and Client Secret**

### Step 5: Get Refresh Token

1. Install the OAuth2 helper (one-time setup):
   ```bash
   composer require league/oauth2-google
   ```

2. Create `get_oauth_token.php` on your server temporarily:
   ```php
   <?php
   require 'vendor/autoload.php';

   $provider = new League\OAuth2\Client\Provider\Google([
       'clientId'     => 'YOUR_CLIENT_ID',
       'clientSecret' => 'YOUR_CLIENT_SECRET',
       'redirectUri'  => 'https://www.lilja-tours.com/get_oauth_token.php',
       'accessType'   => 'offline',
   ]);

   if (!isset($_GET['code'])) {
       $authUrl = $provider->getAuthorizationUrl([
           'scope' => ['https://mail.google.com/']
       ]);
       $_SESSION['oauth2state'] = $provider->getState();
       header('Location: ' . $authUrl);
       exit;
   } else {
       $token = $provider->getAccessToken('authorization_code', [
           'code' => $_GET['code']
       ]);
       echo 'Refresh Token: ' . $token->getRefreshToken();
   }
   ```

3. Visit the script in your browser, authorize, and **save the refresh token**

4. **Delete get_oauth_token.php** after getting the token

### Step 6: Configure smtp-config.php for OAuth2

Edit `public/smtp-config.php` and set `USE_OAUTH2` to `true`:

```php
define('USE_OAUTH2', true);
define('OAUTH2_CLIENT_ID', 'your-client-id.apps.googleusercontent.com');
define('OAUTH2_CLIENT_SECRET', 'your-client-secret');
define('OAUTH2_REFRESH_TOKEN', 'your-refresh-token');
```

---

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

## DNS Configuration (Required for Email Deliverability)

### SPF Record

Your current SPF record is correct:
```
v=spf1 include:_spf.google.com ~all
```

### DKIM Record

Your DKIM is configured at `google._domainkey.lilja-tours.com` ✓

### DMARC Record

Your DMARC is configured at `_dmarc.lilja-tours.com` ✓

---

## Deployment Instructions

### 1. Configure Authentication

Choose Option A (App Password) or Option B (OAuth2) above and configure `public/smtp-config.php`.

### 2. Build the Site

```bash
npm run build
```

All PHP files are automatically copied from `public/` to `dist/`:
- `smtp-config.php`
- `contact.php`
- `contact-tour.php`
- `contact-multiday.php`
- `contact-tour-booking.php`
- `PHPMailer/` folder

### 3. Upload to Hostgator

Upload the entire `dist/` folder to your server root.

### 4. Set File Permissions

- `smtp-config.php`: **600** (owner read/write only - IMPORTANT for security)
- Other PHP files: **644** (default)

### 5. Verify PHP Version

Check in cPanel → "Select PHP Version" → **PHP 8.1+** recommended

---

## Testing

### Test Each Form

1. **Main Contact**: https://www.lilja-tours.com/contact/
2. **Day Tour**: Any day tour page → "Personalize Your Tour" section
3. **Multiday Custom**: https://www.lilja-tours.com/multiday-tours-iceland/ → "Design Your Perfect Journey"
4. **Multiday Booking**: Any multiday tour page → "Book This Tour" modal

### Test SMTP Directly

Create `test-smtp.php` temporarily:

```php
<?php
require 'smtp-config.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->SMTPDebug = 2; // Enable verbose debug output

try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = SMTP_PORT;

    $mail->setFrom(SMTP_USERNAME, 'Test');
    $mail->addAddress(SMTP_USERNAME);
    $mail->Subject = 'SMTP Test';
    $mail->Body = 'If you see this, SMTP works!';

    $mail->send();
    echo 'SUCCESS!';
} catch (Exception $e) {
    echo 'ERROR: ' . $mail->ErrorInfo;
}
```

**Delete this file after testing!**

---

## Troubleshooting

### "Username and password not accepted"

1. **Check App Password**: Make sure you're using the App Password, not your regular Google password
2. **Check 2-Step Verification**: Must be enabled
3. **Check Google Workspace Admin**: Admin may have disabled "Less secure apps" or App Passwords
4. **Try OAuth2**: If App Passwords don't work, use OAuth2 instead

### "SMTP connect() failed"

1. **Check port 587 is open**: Contact Hostgator support
2. **Try port 465**: Change `SMTP_PORT` to `465` and `SMTP_ENCRYPTION` to `ssl`
3. **Check firewall**: Some hosts block outbound SMTP

### Emails going to spam

1. Verify SPF record: https://mxtoolbox.com/spf.aspx
2. Verify DKIM: https://mxtoolbox.com/dkim.aspx
3. Check email content for spam triggers

---

## File Structure

```
public/
├── smtp-config.php          ← Configure this (SENSITIVE)
├── contact.php              ← Main contact handler
├── contact-tour.php         ← Day tour form handler
├── contact-multiday.php     ← Multiday custom form handler
├── contact-tour-booking.php ← Booking modal handler
└── PHPMailer/               ← PHPMailer library
    ├── PHPMailer.php
    ├── SMTP.php
    ├── Exception.php
    └── OAuth.php            ← For OAuth2 (optional)
```

---

## Security Best Practices

1. **Protect smtp-config.php**: Set permissions to 600
2. **Never commit credentials**: `smtp-config.php` is in `.gitignore`
3. **Use HTTPS**: All forms submit over encrypted connections
4. **Delete test files**: Remove `test-smtp.php` after testing
5. **Rotate credentials**: Change App Password periodically

---

## Resources

- **Google App Passwords**: https://myaccount.google.com/apppasswords
- **Google Cloud Console**: https://console.cloud.google.com/
- **PHPMailer OAuth2 Guide**: https://github.com/PHPMailer/PHPMailer/wiki/Using-Gmail-with-XOAUTH2
- **PHPMailer Gmail Tutorial**: https://mailtrap.io/blog/phpmailer-gmail/
- **MXToolbox**: https://mxtoolbox.com/
- **Hostgator Support**: https://www.hostgator.com/support

---

**Last Updated**: December 2025
**Authentication**: App Password (recommended) or OAuth2
**Hosting**: Hostgator Baby Plan
**Forms**: 4 total
