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
    $requiredFields = ['firstName', 'lastName', 'email', 'phone', 'numPeople', 'numChildren', 'numDays', 'travelDates', 'accommodationType', 'budget'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
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
    $budget = htmlspecialchars(strip_tags($data['budget']));
    $details = !empty($data['details']) ? htmlspecialchars(strip_tags($data['details'])) : 'No additional details provided';

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Email configuration
    $to = 'julien@lilja-tours.com';
    $subject = 'LT Multiday Tour Request - ' . $firstName . ' ' . $lastName;

    // Email body
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
    $emailBody .= "Total Budget: " . number_format($budget) . " ISK\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "ADDITIONAL DETAILS\n\n";
    $emailBody .= $details . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "This email was sent from the Lilja Tours multiday tours contact form.\n";
    $emailBody .= "Please respond within 24 hours with a personalized itinerary proposal.\n";

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
            'message' => 'Request sent successfully'
        ]);
    } else {
        // Log error for debugging
        error_log('Failed to send multiday tour request from: ' . $email);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send request. Please try again or contact us directly.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
