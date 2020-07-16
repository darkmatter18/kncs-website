<?php
/**
 * Pre Registration Student_preregistration_login
 * Manojit Karmakar (08/07/2020)
 */


define('_inc', true);
require INC_DIR . 'index.php';
require BASE_DIR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php';
use \Firebase\JWT\JWT;

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

if (isset($_INPUT['application_no']) && isset($_INPUT['email']) && isset($_INPUT['dob']) && isset($_INPUT['recaptcha_token'])) {
    if (checkRecaptcha($_INPUT['recaptcha_token'])) {

        $application_no_clean = Filter::Int($_INPUT['application_no']);
        $email_id_clean = Filter::Email($_INPUT['email']);
        $dob_clean = Filter::String($_INPUT['dob']);

        $smt = $pdocon->prepare("SELECT * FROM student_preregistration_login WHERE application_no = :application_no AND email= :email AND dob = :dob");
        $smt->bindParam(":application_no", $application_no_clean, PDO::PARAM_INT);
        $smt->bindParam(":email", $email_id_clean, PDO::PARAM_STR);
        $smt->bindParam(":dob", $dob_clean, PDO::PARAM_STR);

        if ($smt->execute()) {
            if ($smt->rowCount() > 0) {
                //JWT config
                $issusedAt = (time() * 1000);
                $expiredAt = (time() + (2 * 60* 60)) * 1000; //Expired after 2 hours

                // JWT token
                $token = array (
                    "iat" => $issusedAt,
                    "eat" => $expiredAt,
                    "uae" =>$_SERVER['HTTP_USER_AGENT'],
                    "data" => array (
                        "application_no" => $application_no_clean
                    )
                );

                $jwt = JWT::encode($token, $_SERVER['HTTP_JWT_SECRET']);

                $return['status'] = true;
                $return['jwt'] = $jwt;
                $return['application_id'] = $application_no_clean;
                $return['statusText'] = "Successfully Logged In";
                $return['error'] = null;
            }else{
                http_response_code(401);
                $return['status'] = false;
                $return['jwt'] = null;
                $return['application_id'] = null;
                $return['statusText'] = null;
                $return['error'] = "Not Authenticated";
            }
        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['jwt'] = null;
            $return['application_id'] = null;
            $return['statusText'] = null;
            $return['error'] = "Internal Server Error";
        }
    } else {
        http_response_code(401);
        $return['status'] = false;
        $return['jwt'] = null;
        $return['application_id'] = null;
        $return['statusText'] = null;
        $return['error'] = "ReCaptcha verification failed";
    }
} else {
    http_response_code(400);
    $return['status'] = false;
    $return['jwt'] = null;
    $return['application_id'] = null;
    $return['statusText'] = null;
    $return['error'] = "Invalid Request";
}

echo json_encode($return);
exit;