<<<<<<< HEAD
<html>
    <head>





<?php
    $nameFrom  = "TJC발신자";
    $mailFrom = "juni0227@tjc.or.kr";
    $nameTo  = "TJC수신자";
    $mailTo = "admin@tjc.or.kr";
    $cc = "media@tjc.or.kr";
    $bcc = "media2@tjc.or.kr";
    $subject = "책구매신청";
    $content = "메일내용";    


    $charset = "UTF-8";



    $nameFrom   = "=?$charset?B?".base64_encode($nameFrom)."?=";
    $nameTo   = "=?$charset?B?".base64_encode($nameTo)."?=";
    $subject = "=?$charset?B?".base64_encode($subject)."?=";

    $header  = "Content-Type: text/html; charset=utf-8\r\n";
    $header .= "MIME-Version: 1.0\r\n";

    $header .= "Return-Path: <". $mailFrom .">\r\n";
    $header .= "From: ". $nameFrom ." <". $mailFrom .">\r\n";
    $header .= "Reply-To: <". $mailFrom .">\r\n";
    if ($cc)  $header .= "Cc: ". $cc ."\r\n";
    if ($bcc) $header .= "Bcc: ". $bcc ."\r\n";

    $result = mail($mailTo, $subject, $content, $header, $nameFrom);
   
    if(!$result) {
 ?>

        <script>
                alert('메일전송실패!!! \n 다시 작성하세요');
        </script>

 <?php
    } else {
 ?>

        <script>
                alert('메일전송성공!!!');
        </script>

 <?php
    }
 ?>

    </head>
    <body>
ㅌㅔ스트 
    </body>
    </html>
=======
<?php 

include_once($_SERVER["DOCUMENT_ROOT"].'/brand/mail.php');

mailer("김희준","juni0227@naver.com","juni0227@naver.com","테스트 발생합니다.","내용 테스트" );

?>
>>>>>>> 271c445db67cb32ab89529725cdd6470ca223194
