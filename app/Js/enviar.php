<!-- CONTACTO ME REMITA LOS DATOS A MI MAIL -->

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $mail = $_POST["correo"];
    $telefono = $_POST["telefono"];
    $mensaje = $_POST["mensaje"];

    //Preparamos el cuerpo del correo
    $cuerpo = "Nombre: " . htmlspecialchars($nombre) . "<br>Mail: " . htmlspecialchars($mail) . "<br>Teléfono: " . htmlspecialchars($telefono) . "<br>Mensaje: " . htmlspecialchars($mensaje);

    //cargamos PHPMAILER
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/Exception.php';
    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->SMTPDebug = 0;                       // Sin debug
        $mail->isSMTP();                            // Usar SMTP
        $mail->Host       = 'smtp.gmail.com';       // Servidor SMTP
        $mail->SMTPAuth   = true;                   // Habilitar autenticación SMTP
        $mail->Username   = '36065324@ifts24.edu.ar';  // Usuario SMTP
        $mail->Password   = 'cecilia123';     // Contraseña SMTP
        $mail->SMTPSecure = 'tls';                  // Cifrado TLS
        $mail->Port       = 587;                    // Puerto TCP

        // Configuración del correo
        $mail->setFrom('36065324@ifts24.edu.ar', 'DentalArt');
        $mail->addAddress('36065324@ifts24.edu.ar');  // Correo destinatario

        // Contenido del correo
        $mail->isHTML(true);                       // Formato HTML
        $mail->Subject = 'DentalArt. Mensaje de Contacto';
        $mail->Body    = $cuerpo;
        $mail->CharSet = 'UTF-8';

        // Enviar correo
        $mail->send();
        echo '<script>
            alert("El mensaje se envió correctamente");
            window.history.go(-1);
            </script>';
    } catch (Exception $e) {
        echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
    }
}
?>