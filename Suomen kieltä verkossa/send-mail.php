<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "suomenkieltaverkossa@gmail.com"; // Ваша почта
    $subject = "Uusi viesti verkkosivuilta";
    
    // Собираем данные формы
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $number = htmlspecialchars($_POST['number']);
    $aihe = htmlspecialchars($_POST['aihe']);
    $message = htmlspecialchars($_POST['message']);

    // Формируем тело письма
    $body = "Nimi: $name\n";
    $body .= "Sähköposti: $email\n";
    $body .= "Puhelinnumero: $number\n";
    $body .= "Aihe: $aihe\n\n";
    $body .= "Viesti:\n$message";

    // Заголовки письма
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Отправка письма
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Viestisi on lähetetty.";
    } else {
        http_response_code(500);
        echo "Viestin lähettäminen epäonnistui.";
    }
} else {
    http_response_code(403);
    echo "Pyyntö epäonnistui.";
}
?>
