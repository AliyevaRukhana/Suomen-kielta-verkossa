<?php
// Подключаем PHPMailer
require 'includes/PHPMailer/src/PHPMailer.php';
require 'includes/PHPMailer/src/SMTP.php';
require 'includes/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Получаем данные из формы
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$number = htmlspecialchars($_POST['number']);
$subject = htmlspecialchars($_POST['aihe']);
$message = htmlspecialchars($_POST['message']);

// Подготавливаем сообщение
$mailContent = "
    <h3>Uusi viesti verkkosivuilta</h3>
    <p><strong>Nimi:</strong> $name</p>
    <p><strong>Sähköposti:</strong> $email</p>
    <p><strong>Puhelinnumero:</strong> $number</p>
    <p><strong>Aihe:</strong> $subject</p>
    <p><strong>Viesti:</strong><br>$message</p>
";

// Создаем объект PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройки сервера SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@gmail.com'; // Ваш Gmail
    $mail->Password = 'your_app_password'; // Пароль приложения Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Настройки отправителя и получателя
    $mail->setFrom('your_email@gmail.com', 'Website Contact Form'); // От кого
    $mail->addAddress('your_email@gmail.com'); // Кому отправляем

    // Содержание письма
    $mail->isHTML(true);
    $mail->Subject = 'Uusi yhteydenotto verkkosivuilta';
    $mail->Body = $mailContent;

    // Отправка письма
    $mail->send();
    echo 'Viestisi on lähetetty. Kiitos!';
} catch (Exception $e) {
    echo "Viestin lähetys epäonnistui. Virhe: {$mail->ErrorInfo}";
}
