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
    $data = json_decode(file_get_contents("php://input"));
    $uname = $data->name;
    $pass = $data->pass;

    if (empty($uname)) {
        echo json_encode(['status' => 'error', 'message' => 'Username is required']);
        exit();
    } else if (empty($pass)) {
        echo json_encode(['status' => 'error', 'message' => 'Password is required']);
        exit();
    }

    // Menggunakan prepared statement untuk menghindari SQL Injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE user_name = ?");
    $stmt->bind_param("s", $uname);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        // Verifikasi password dengan password yang ter-enkripsi
        if (password_verify($pass, $row['password'])) {
            // Jika login berhasil, simpan data di session
            $_SESSION['isLoggedIn'] = true;
            $_SESSION['username'] = $row['nama'];
            $_SESSION['user_name'] = $row['user_name'];
            $_SESSION['id'] = $row['id'];

            // Kirimkan respons sukses beserta data pengguna
            echo json_encode([
                'status' => 'success',
                'username' => $row['nama'],
                'accName' => $row['user_name'],
                'id' => $row['id']
            ]);
            exit();
        } else {
            // Jika password salah
            echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
        }
    } else {
        // Jika username tidak ditemukan
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit();
}
?>
