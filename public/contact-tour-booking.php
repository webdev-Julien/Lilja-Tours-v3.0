<?php
/**
 * Multiday Tour Booking Modal Form Handler for Lilja Tours
 * Handles "Book This Tour" modal submissions from multiday tour pages
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

    // Validate required fields (using !isset or === '' to allow 0 values)
    $requiredFields = ['name', 'email', 'numPeople', 'departureDate', 'accommodation', 'tourName'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing required field: ' . $field]);
            exit;
        }
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $numPeople = htmlspecialchars(strip_tags($data['numPeople']));
    $activities = !empty($data['activities']) ? htmlspecialchars(strip_tags($data['activities'])) : 'No activities selected';
    $departureDate = htmlspecialchars(strip_tags($data['departureDate']));
    $accommodation = htmlspecialchars(strip_tags($data['accommodation']));
    $tourName = htmlspecialchars(strip_tags($data['tourName']));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Create email body
    $emailBody = "New Multiday Tour Booking Request\n\n";
    $emailBody .= "Tour: " . $tourName . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "CONTACT INFORMATION\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "BOOKING DETAILS\n\n";
    $emailBody .= "Number of People: " . $numPeople . "\n";
    $emailBody .= "Departure Date: " . $departureDate . "\n";
    $emailBody .= "Accommodation Type: " . $accommodation . "\n";
    $emailBody .= "Selected Activities: " . $activities . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "This email was sent from the Lilja Tours multiday tour booking form.\n";

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
        $mail->Subject = 'LT-MD - ' . $tourName;
        $mail->Body = $emailBody;

        // Send email
        $mail->send();

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Booking request sent successfully! We will get back to you within 24 hours with a detailed quote.'
        ]);

    } catch (Exception $e) {
        error_log('Booking form email failed from: ' . $email . ' for tour: ' . $tourName . ' - Error: ' . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send booking request. Please try again or contact us directly at ' . RECIPIENT_EMAIL
        ]);
    }

} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
