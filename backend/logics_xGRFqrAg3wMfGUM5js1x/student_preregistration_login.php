<?php
/**
 * Pre Registration STudent_preregistration_login 
 * Manojit Karmakar (08/07/2020)
 */


define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

//, , 

if(isset($_INPUT['application_no']) && isset($_INPUT['email']) && isset($_INPUT['dob']) && isset($_INPUT['recaptcha_token'])){
    if(checkRecaptcha($_INPUT['recaptcha_token'])){
       
        $application_no_clean = Filter::String($_INPUT['application_no']);
        $email_id_clean = Filter::Email($_INPUT['email']);
        $dob_clean = Filter::String($_INPUT['email_id']);

        //PDO
        
    }else {
        http_response_code(401);
    }
}else {
    http_response_code(400);

}