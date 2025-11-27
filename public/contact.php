<?php
/**
 * Main Contact Form Handler for Lilja Tours
 * Handles submissions from /contact/ page
 * Sends emails via Google Workspace SMTP
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

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
    if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit;
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : 'Not provided';
    $tourType = !empty($data['tour-type']) ? htmlspecialchars(strip_tags($data['tour-type'])) : 'Not specified';
    $message = htmlspecialchars(strip_tags($data['message']));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Create email body
    $emailBody = "New Contact Form Submission\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "Contact Information:\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Phone: " . $phone . "\n";
    $emailBody .= "Tour Type: " . $tourType . "\n\n";
    $emailBody .= "Message:\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= $message . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "This email was sent from the Lilja Tours contact form.\n";

    // Create PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_ENCRYPTION;
        $mail->Port = SMTP_PORT;

        // Recipients
        $mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
        $mail->addAddress(RECIPIENT_EMAIL);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(false);
        $mail->Subject = 'LT Contact - General Inquiry';
        $mail->Body = $emailBody;

        // Send email
        $mail->send();

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully! We will get back to you within 24 hours.'
        ]);

    } catch (Exception $e) {
        error_log('Contact form email failed: ' . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send message. Please try again or contact us directly at ' . RECIPIENT_EMAIL
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
