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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])) {
    $id = $_POST['id'];

    // Pastikan ID adalah integer untuk mencegah SQL Injection
    $id = intval($id);

    // Query untuk menghapus data berdasarkan ID
    $sql = "DELETE FROM users WHERE id = $id";

    if (mysqli_query($conn, $sql)) {
        // Jika berhasil menghapus, kirimkan respons sukses
        echo "Data berhasil dihapus";
    } else {
        // Jika gagal, kirimkan pesan error
        echo "Error: " . mysqli_error($conn);
    }
} else {
    echo "Cannot find your id";
}

mysqli_close($conn);
?>
