<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

include 'db_conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Mendapatkan ID dari parameter URL
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        // Query untuk mengambil data pengguna
        $sql = "SELECT * FROM users WHERE id = $id";
        $result = mysqli_query($conn, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            echo json_encode($user); // Mengembalikan data dalam format JSON
        } else {
            echo json_encode(["error" => "User not found."]);
        }
    } else {
        echo json_encode(["error" => "No user ID provided."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id'], $_POST['nama'], $_POST['user_name'])) {
        $id = $_POST['id'];
        $nama = mysqli_real_escape_string($conn, $_POST['nama']);
        $user_name = mysqli_real_escape_string($conn, $_POST['user_name']);

        $sql = "UPDATE users SET nama = '$nama', user_name = '$user_name' WHERE id = $id";

        if (mysqli_query($conn, $sql)) {
            echo json_encode(["message" => "User updated successfully."]);
        } else {
            echo json_encode(["error" => "Error updating user: " . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(["error" => "Invalid data provided."]);
    }
} else {
    echo json_encode(["error" => "Invalid Request Method"]);
}

mysqli_close($conn);
?>