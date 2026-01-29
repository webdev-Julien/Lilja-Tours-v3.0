<?php
/**
 * Transfer Request Form Handler for Lilja Tours
 * Handles submissions from /transfers-iceland/ and /fr/transferts-islande/ pages
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
    if (empty($data['name']) || empty($data['email']) || empty($data['departure']) ||
        empty($data['arrival']) || empty($data['people']) || empty($data['date'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit;
    }

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $departure = htmlspecialchars(strip_tags($data['departure']));
    $arrival = htmlspecialchars(strip_tags($data['arrival']));
    $people = htmlspecialchars(strip_tags($data['people']));
    $date = htmlspecialchars(strip_tags($data['date']));
    $time = !empty($data['time']) ? htmlspecialchars(strip_tags($data['time'])) : 'Not specified';
    $children = !empty($data['children']) ? htmlspecialchars(strip_tags($data['children'])) : '0';
    $childrenAge = !empty($data['childrenAge']) ? htmlspecialchars(strip_tags($data['childrenAge'])) : 'N/A';
    $luggage = !empty($data['luggage']) ? htmlspecialchars(strip_tags($data['luggage'])) : 'Not specified';
    $flightNumber = !empty($data['flightNumber']) ? htmlspecialchars(strip_tags($data['flightNumber'])) : 'N/A';
    $flightTime = !empty($data['flightTime']) ? htmlspecialchars(strip_tags($data['flightTime'])) : 'N/A';
    $language = !empty($data['language']) ? htmlspecialchars(strip_tags($data['language'])) : 'en';

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Create email body
    $emailBody = "New Transfer Request\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "Transfer Details:\n";
    $emailBody .= "Departure: " . $departure . "\n";
    $emailBody .= "Arrival: " . $arrival . "\n";
    $emailBody .= "Date: " . $date . "\n";
    $emailBody .= "Time: " . $time . "\n\n";
    $emailBody .= "Passengers:\n";
    $emailBody .= "Number of People: " . $people . "\n";
    $emailBody .= "Number of Children: " . $children . "\n";
    if ($children !== '0' && $childrenAge !== 'N/A') {
        $emailBody .= "Age of Children: " . $childrenAge . "\n";
    }
    $emailBody .= "\nLuggage Information:\n";
    $emailBody .= $luggage . "\n";
    $emailBody .= "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "Airport Transfer Information:\n";
    $emailBody .= "Flight Number: " . $flightNumber . "\n";
    $emailBody .= "Flight Time: " . $flightTime . "\n";
    $emailBody .= "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "Contact Information:\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "Form Language: " . strtoupper($language) . "\n";
    $emailBody .= "This email was sent from the Lilja Tours transfer request form.\n";

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
        $mail->Subject = 'LT Transfer Request - ' . $departure . ' to ' . $arrival;
        $mail->Body = $emailBody;

        // Send email
        $mail->send();

        http_response_code(200);

        // Return message based on language
        if ($language === 'fr') {
            $successMessage = 'Demande envoyée avec succès ! Nous vous répondrons dans les 24 heures.';
        } else {
            $successMessage = 'Request sent successfully! We will get back to you within 24 hours.';
        }

        echo json_encode([
            'success' => true,
            'message' => $successMessage
        ]);

    } catch (Exception $e) {
        error_log('Transfer request email failed: ' . $mail->ErrorInfo);
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
