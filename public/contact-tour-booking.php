<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from either POST or JSON input
    $data = [];

    // Check if data is sent as form data
    if (!empty($_POST)) {
        $data = $_POST;
    } else {
        // Try to get JSON input
        $json = file_get_contents('php://input');
        $jsonData = json_decode($json, true);
        if ($jsonData) {
            $data = $jsonData;
        }
    }

    // Validate required fields
    $requiredFields = ['name', 'email', 'numPeople', 'departureDate', 'accommodation', 'tourName'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
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

    // Email configuration
    $to = 'julien@lilja-tours.com';
    $subject = 'LT-MD - ' . $tourName;

    // Email body
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

    // Email headers
    $headers = "From: noreply@lilja-tours.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    $mailSent = mail($to, $subject, $emailBody, $headers);

    if ($mailSent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Booking request sent successfully'
        ]);
    } else {
        // Log error for debugging
        error_log('Failed to send booking request from: ' . $email . ' for tour: ' . $tourName);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send booking request. Please try again or contact us directly.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
