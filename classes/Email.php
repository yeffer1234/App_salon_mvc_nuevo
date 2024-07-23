<?php 

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{
   
    
    public $email;
    public $nombre;
    public $token;



    public function __construct( $nombre,$email, $token)
    {
        
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
        
    }

    public function  enviarConfirmacion()
    {
        //crear el objecto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
      

        $mail->Host = $_ENV["EMAIL_HOST"];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV["EMAIL_PORT"];
        $mail->Username = $_ENV["EMAIL_USER"];
        $mail->Password = $_ENV["EMAIL_PASS"];

        $mail->setFrom("cuentas@appsalon","AppSalon.com");
        $mail->addAddress($this->email);
        $mail->Subject = "confirma tu cuenta";

        $mail->isHTML(TRUE);
        $mail->CharSet = "UTF-8";

        $contenido = "<html>";
        
        $contenido .= "<p><strong> Hola " . $this->nombre . "</strong> Has creado tu cuenta en App Salon,
        Solo debes confirmarla presionando el siguente enlace</p>";

        $contenido .= "<p>Preciona aqui: <a href='". $_ENV["APP_URL"]  ."/confirmar-cuenta?token=" 
        . $this->token ."'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Si no solicitaste esta cuenta puedes ignorar el mensaje</p>";
        $contenido .="</html>";

        $mail->Body = $contenido;

        //enviar el email
        $mail->send();


 
    }


    public function enviarInstrucciones(){

  //crear el objecto de email
  $mail = new PHPMailer();
  $mail->isSMTP();


        $mail->Host = $_ENV["EMAIL_HOST"];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV["EMAIL_PORT"];
        $mail->Username = $_ENV["EMAIL_USER"];
        $mail->Password = $_ENV["EMAIL_PASS"];

  $mail->setFrom("cuentas@appsalon","AppSalon.com");
  $mail->addAddress($this->email);
  $mail->Subject = "Reestablece tu password";

  $mail->isHTML(TRUE);
  $mail->CharSet = "UTF-8";

  $contenido = "<html>";
  
  $contenido .= "<p><strong> Hola " . $this->nombre . "</strong> has solicitado reestablecer tu password
  siguiente el enlace para hacerlo</p>";
  $contenido .= "<p>Preciona aqui: <a href='". $_ENV["APP_URL"]  ."/recuperar?token=" 
  . $this->token ."'>Reestablecer password</a></p>";
  $contenido .= "<p>Si no solicitaste esta cuenta puedes ignorar el mensaje</p>";
  $contenido .="</html>";

  $mail->Body = $contenido;

  //enviar el email
  $mail->send();



    }

}