<?php
/**
 * Multiday Tours Custom Form Handler for Lilja Tours
 * Handles "Design Your Perfect Journey" form submissions
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
    $requiredFields = ['firstName', 'lastName', 'email', 'phone', 'numPeople', 'numChildren', 'numDays', 'travelDates', 'accommodationType', 'budgetAmount', 'budgetCurrency'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Missing required field: ' . $field]);
            exit;
        }
    }

    // Sanitize inputs
    $firstName = htmlspecialchars(strip_tags($data['firstName']));
    $lastName = htmlspecialchars(strip_tags($data['lastName']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($data['phone']));
    $numPeople = htmlspecialchars(strip_tags($data['numPeople']));
    $numChildren = htmlspecialchars(strip_tags($data['numChildren']));
    $childrenAges = !empty($data['childrenAges']) ? htmlspecialchars(strip_tags($data['childrenAges'])) : 'Not provided';
    $numDays = htmlspecialchars(strip_tags($data['numDays']));
    $travelDates = htmlspecialchars(strip_tags($data['travelDates']));
    $interests = !empty($data['interests']) ? htmlspecialchars(strip_tags($data['interests'])) : 'Not specified';
    $accommodationType = htmlspecialchars(strip_tags($data['accommodationType']));
    $budgetAmount = htmlspecialchars(strip_tags($data['budgetAmount']));
    $budgetCurrency = htmlspecialchars(strip_tags($data['budgetCurrency']));
    $details = !empty($data['details']) ? htmlspecialchars(strip_tags($data['details'])) : 'No additional details provided';

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Create email body
    $emailBody = "New Multiday Tour Customization Request\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "CONTACT INFORMATION\n\n";
    $emailBody .= "Name: " . $firstName . " " . $lastName . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Phone: " . $phone . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "TRIP DETAILS\n\n";
    $emailBody .= "Number of People: " . $numPeople . "\n";
    $emailBody .= "Number of Children: " . $numChildren . "\n";
    $emailBody .= "Children's Ages: " . $childrenAges . "\n";
    $emailBody .= "Number of Days with Guide: " . $numDays . "\n";
    $emailBody .= "Travel Dates: " . $travelDates . "\n";
    $emailBody .= "Main Interests: " . $interests . "\n";
    $emailBody .= "Accommodation Type: " . $accommodationType . "\n";
    $emailBody .= "Total Budget (Entire Group): " . number_format($budgetAmount) . " " . $budgetCurrency . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "ADDITIONAL DETAILS\n\n";
    $emailBody .= $details . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "This email was sent from the Lilja Tours multiday tours contact form.\n";
    $emailBody .= "Please respond within 24 hours with a personalized itinerary proposal.\n";

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
        $mail->addReplyTo($email, $firstName . ' ' . $lastName);

        // Content
        $mail->isHTML(false);
        $mail->Subject = 'LT Multiday Tour Request - ' . $firstName . ' ' . $lastName;
        $mail->Body = $emailBody;

        // Send email
        $mail->send();

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Request sent successfully! We will create a personalized itinerary and get back to you within 24 hours.'
        ]);

    } catch (Exception $e) {
        error_log('Multiday tour request email failed from: ' . $email . ' - Error: ' . $mail->ErrorInfo);
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
