<?php
/**
 * Travel Advisor Inquiry Form Handler for Lilja Tours
 * Handles B2B partnership inquiries from travel advisors
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load SMTP configuration
require_once 'smtp-config.php';

// Load PHPMailer
require_once 'PHPMailer/PHPMailer.php';
require_once 'PHPMailer/SMTP.php';
require_once 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from either POST or JSON input
    $data = [];

    if (!empty($_POST)) {
        $data = $_POST;
    } else {
        $json = file_get_contents('php://input');
        $jsonData = json_decode($json, true);
        if ($jsonData) {
            $data = $jsonData;
        }
    }

    // Validate required fields
    $requiredFields = ['name', 'company', 'email', 'country'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing required field: ' . $field]);
            exit;
        }
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($data['name']));
    $company = htmlspecialchars(strip_tags($data['company']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : 'Not provided';
    $country = htmlspecialchars(strip_tags($data['country']));
    $message = !empty($data['message']) ? htmlspecialchars(strip_tags($data['message'])) : 'No additional message provided';
    $requestPriceSheet = !empty($data['requestPriceSheet']) && $data['requestPriceSheet'] === 'yes' ? 'Yes' : 'No';
    $clientInquiry = !empty($data['clientInquiry']) && $data['clientInquiry'] === 'yes' ? 'Yes' : 'No';

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Create email body
    $emailBody = "New Travel Advisor Partnership Inquiry\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "CONTACT INFORMATION\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Company/Agency: " . $company . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Phone: " . $phone . "\n";
    $emailBody .= "Country: " . $country . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "REQUEST DETAILS\n\n";
    $emailBody .= "Requesting Price Sheet: " . $requestPriceSheet . "\n";
    $emailBody .= "Has Specific Client Inquiry: " . $clientInquiry . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "ADDITIONAL MESSAGE\n\n";
    $emailBody .= $message . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "This inquiry was sent from the Lilja Tours Travel Advisors page.\n";
    $emailBody .= "Please respond within 24 hours.\n";

    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->Port = SMTP_PORT;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // Recipients
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress(RECIPIENT_EMAIL);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(false);
        $mail->Subject = 'LT B2B Inquiry - ' . $company . ' (' . $country . ')';
        $mail->Body = $emailBody;

        // Send email
        $mail->send();

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your inquiry. We will be in touch within 24 hours.'
        ]);

    } catch (Exception $e) {
        error_log('Travel advisor inquiry email failed from: ' . $email . ' - Company: ' . $company . ' - Error: ' . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send request. Please try again or contact us directly at ' . RECIPIENT_EMAIL
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
