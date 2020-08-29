<?php
/**
 * Pre Registration Student_preregistration_login
 * Manojit Karmakar (08/07/2020)
 */


define('_inc', true);
require INC_DIR . 'index.php';
require BASE_DIR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
use \Firebase\JWT\JWT;

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

if (isset($_INPUT['application_no']) && isset($_INPUT['email']) && isset($_INPUT['dob']) && isset($_INPUT['recaptcha_token'])) {
    if (checkRecaptcha($_INPUT['recaptcha_token'])) {

        $f = fopen(BASE_DIR . 'logger.txt', 'a');
        fwrite($f, date('c') . '\n' . 'Input:'.file_get_contents('php://input').'\n');
        fclose($f);

        $application_no_clean = Filter::Int($_INPUT['application_no']);
        $email_id_clean = Filter::Email($_INPUT['email']);
        $dob_clean = Filter::String($_INPUT['dob']);
        // Added table student_preregistration_details to get the status column
        $smt = $pdocon->prepare("SELECT T1.*, T2.status FROM student_preregistration_login AS T1
                                            INNER JOIN student_preregistration_details AS T2
                                            ON T1.application_no = T2.application_no
                                            WHERE T1.application_no = :application_no
                                            AND T1.email = :email
                                            AND T2.dob = :dob");
        $smt->bindParam(":application_no", $application_no_clean, PDO::PARAM_INT);
        $smt->bindParam(":email", $email_id_clean, PDO::PARAM_STR);
        $smt->bindParam(":dob", $dob_clean, PDO::PARAM_STR);

        if ($smt->execute()) {
            $output = $smt->fetch(PDO::FETCH_ASSOC);
            if ($output) {
                $status = $output['status'];
                //JWT config
                $issuedAt = time();
                $expiredAt = time() + (2 * 60* 60); //Expired after 2 hours


                // JWT token
                $token = array (
                    'iat'  => $issuedAt,              // Issued at: time when the token was generated
                    'jti'  => $application_no_clean,  // Json Token Id: an unique identifier for the token
                    'iss'  => "http://kncs.in",       // Issuer
                    'nbf'  => $issuedAt,              // Not before
                    'exp'  => $expiredAt,
                    "uae"  => $_SERVER['HTTP_USER_AGENT'],
                    "data" => array (
                        "application_no" => $application_no_clean,
                        "status" => $status
                    )
                );

                $jwt = JWT::encode($token, $_SERVER['HTTP_JWT_SECRET']);

                $return['status'] = true;
                $return['jwt'] = $jwt;
                $return['application_no'] = $application_no_clean;
                $return['RecStatus'] = $status; // Added to return the status field; Added in all the return statements
                $return['statusText'] = "Successfully Logged In";
                $return['error'] = null;
            }else{
                http_response_code(401);
                $return['status'] = false;
                $return['jwt'] = null;
                $return['application_no'] = null;
                $return['RecStatus'] = null;
                $return['statusText'] = null;
                $return['error'] = "Not Authenticated";
            }
        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['jwt'] = null;
            $return['application_no'] = null;
            $return['RecStatus'] = null;
            $return['statusText'] = null;
            $return['error'] = "Internal Server Error";
        }
    } else {
        http_response_code(401);
        $return['status'] = false;
        $return['jwt'] = null;
        $return['application_no'] = null;
        $return['RecStatus'] = null;
        $return['statusText'] = null;
        $return['error'] = "ReCaptcha verification failed";
    }
} else {
    http_response_code(400);
    $return['status'] = false;
    $return['jwt'] = null;
    $return['application_no'] = null;
    $return['RecStatus'] = null;
    $return['statusText'] = null;
    $return['error'] = "Invalid Request";
}
$f = fopen(BASE_DIR . 'logger.txt', 'a');
fwrite($f, date('c') . '\n' . 'Output:'.json_encode($return).'\n\n');
fclose($f);
echo json_encode($return);
exit;
