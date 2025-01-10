<<?php
// Подключение PHPMailer (предполагается, что он уже настроен)
require 'includes/PHPMailer/src/PHPMailer.php';
require 'includes/PHPMailer/src/SMTP.php';
require 'includes/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Получение данных из формы
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$number = htmlspecialchars($_POST['number']);
$subject = htmlspecialchars($_POST['aihe']);
$message = htmlspecialchars($_POST['message']);

// Создание содержимого письма
$mailContent = "
    <h3>Uusi viesti verkkosivuilta</h3>
    <p><strong>Nimi:</strong> $name</p>
    <p><strong>Sähköposti:</strong> $email</p>
    <p><strong>Puhelinnumero:</strong> $number</p>
    <p><strong>Aihe:</strong> $subject</p>
    <p><strong>Viesti:</strong><br>$message</p>
";

// Настройка PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройки SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@gmail.com'; // Ваш Gmail
    $mail->Password = 'your_app_password'; // Пароль приложения
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Отправитель и получатель
    $mail->setFrom('your_email@gmail.com', 'Suomi Annakaisan kanssa');
    $mail->addAddress('your_email@gmail.com'); // Кому отправлять

    // Настройки письма
    $mail->isHTML(true);
    $mail->Subject = 'Uusi yhteydenotto verkkosivuilta';
    $mail->Body = $mailContent;

    // Отправка письма
    $mail->send();
    http_response_code(200);
    echo 'Viestisi on lähetetty. Kiitos!';
} catch (Exception $e) {
    http_response_code(500);
    echo 'Viestin lähetys epäonnistui: ' . $mail->ErrorInfo;
}
