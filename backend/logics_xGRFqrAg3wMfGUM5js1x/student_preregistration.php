<?php
/**
 * Pre Registration Student Logic
 * Arkadip Bhattacharya (07/07/2020)
 */


define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

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
        
        $application_no = time();
        //PDO there is total 7 input

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_details(application_no, first_name, middle_name, last_name, aadhar_no, email, mobile, dob) VALUES(:application_no, :first_name, :middle_name, :last_name, :aadhar_no, :email, :mobile, :dob)');
        
        $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt->bindParam(':first_name', $first_name_clean, PDO::PARAM_STR);
        $smt->bindParam(':middle_name', $middle_name_clean, PDO::PARAM_STR);
        $smt->bindParam(':last_name', $last_name_clean, PDO::PARAM_STR);
        $smt->bindParam(':aadhar_no', $aadhar_no_clean, PDO::PARAM_INT);
        $smt->bindParam(':email', $email_clean, PDO::PARAM_STR);
        $smt->bindParam(':mobile', $mobile_clean, PDO::PARAM_INT);
        $smt->bindParam(':dob', $dob_clean, PDO::PARAM_STR);

        if($smt->execute()){

            // student_preregistration_login PDO will go here
            $smt = $pdocon->prepare('INSERT INTO student_preregistration_login(application_no, email, dob) VALUES(:application_no, :email, :dob)');

            $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt->bindParam(':email', $email_clean, PDO::PARAM_STR);
            $smt->bindParam(':dob', $dob_clean, PDO::PARAM_STR);
            
            if($smt->execute()){
                    //final page
                    //{status:true, statusText: text,
                    //application_no:number, error:null}
                    $return['status'] = true;
                    $return['statusText'] = "Successfully Submittied";
                    $return['application_no'] = $application_no;
                    $return['error'] = null;
            }else{
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['application_no'] = null;
                $return['error'] = "Failed to record on Database";
            }
        }else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['application_no'] = null;
            $return['error'] = "Failed to record on Database" ;
        }
    }else {
        http_response_code(401);
        $return['status'] = false;
        $return['statusText'] =  null;
        $return['application_no'] = null;
        $return['error'] = "recaptcha verification failed";
    }
}else {
    http_response_code(400);
    $return['status'] = false;
    $return['statusText'] = null;
    $return['application_no'] = null;
    $return['error'] = "Invalid Request ";
    //{status:false, statusText: null, error:text}
}

echo json_encode($return);
exit;