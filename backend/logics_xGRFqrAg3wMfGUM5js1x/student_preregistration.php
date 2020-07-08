<?php
/**
 * Pre Registration Student Logic
 * Arkadip Bhattacharya (07/07/2020)
 */


define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

if(isset($_INPUT['first_name']) && isset($_INPUT['middle_name']) && isset($_INPUT['last_name']) 
&& isset($_INPUT['aadhar_no']) && isset($_INPUT['email']) && isset($_INPUT['mobile']) && isset($_INPUT['dob'])
&& isset($_INPUT['recaptcha_token'])){
    if(checkRecaptcha($_INPUT['recaptcha_token'])){
       
        $first_name_clean = Filter::String($_INPUT['first_name']);
        $middle_name_clean = Filter::String($_INPUT['middle_name']);
        $last_name_clean = Filter::String($_INPUT['last_name']);
        $aadhar_no_clean = Filter::Int($_INPUT['aadhar_no']);
        $email_clean = Filter::Email($_INPUT['email']);
        $mobile_clean = Filter::Int($_INPUT['mobile']);
        $dob_clean = Filter::String($_INPUT['dob']);

    }else {
        http_response_code(401);
    }
}else {
    http_response_code(400);

}