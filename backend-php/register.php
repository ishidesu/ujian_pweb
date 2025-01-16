<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

include "db_conn.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON data sent from the React frontend
    $data = json_decode(file_get_contents("php://input"));

    // Map received data to variables
    $name = $data->name;
    $username = $data->username;
    $password = $data->password;

    // Validation checks
    if (empty($name)) {
        echo json_encode(['status' => 'error', 'message' => 'Name is required']);
        exit();
    } else if (empty($username)) {
        echo json_encode(['status' => 'error', 'message' => 'Username is required']);
        exit();
    } else if (empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Password is required']);
        exit();
    } else {
        // Hash the password before storing it
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Check if the username already exists
        $sql = "SELECT * FROM users WHERE user_name='$username'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            echo json_encode(['status' => 'error', 'message' => 'Username is already taken']);
            exit();
        } else {
            // Insert new user into the database
            $sql2 = "INSERT INTO users(user_name, password, nama) VALUES('$username', '$hashed_password', '$name')";
            $result2 = mysqli_query($conn, $sql2);
            if ($result2) {
                echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
                exit();
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Unknown error occurred']);
                exit();
            }
        }
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit();
}
