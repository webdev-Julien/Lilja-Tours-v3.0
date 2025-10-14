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
    if (empty($data['name']) || empty($data['email']) || empty($data['message']) || empty($data['tourName'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit;
    }

    $name = htmlspecialchars(strip_tags($data['name']));
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : 'Not provided';
    $message = htmlspecialchars(strip_tags($data['message']));
    $tourName = htmlspecialchars(strip_tags($data['tourName']));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit;
    }

    // Email configuration
    $to = 'julien@lilja-tours.com';
    $subject = 'LT Contact - ' . $tourName;

    // Email body
    $emailBody = "New Tour Personalization Request\n\n";
    $emailBody .= "Tour: " . $tourName . "\n\n";
    $emailBody .= "Contact Information:\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Phone: " . $phone . "\n\n";
    $emailBody .= "Message:\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $emailBody .= $message . "\n\n";
    $emailBody .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $emailBody .= "This email was sent from the Lilja Tours website contact form.\n";

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
            'message' => 'Email sent successfully'
        ]);
    } else {
        // Log error for debugging
        error_log('Failed to send email from contact form for tour: ' . $tourName);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to send email. Please try again or contact us directly.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}
?>
