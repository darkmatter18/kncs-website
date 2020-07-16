<?php

/**
 * POST
 * student_preregistration PERSONAL INFO inserting logics
 * 
 * database: kncs
 *          table : student_preregistration_draft_basic_info
 *          table : student_preregistration_draft_family_info
 *          table : student_preregistration_draft_address
 * 
 * Manojit Karmakar (14/07/2020)
 */

define('_inc', true);
require INC_DIR.'index.php';
require INC_DIR.'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];

header('Content-Type: application/json');

if( isset($_INPUT['gender']) && isset($_INPUT['religion']) && isset($_INPUT['caste']) && isset($_INPUT['mother_tongue'])
&& isset($_INPUT['apply_for_reserved_seat']) && isset($_INPUT['caste_certificate_no']) && isset($_INPUT['weather_bpl'])
&& isset($_INPUT['bpl_card_no']) && isset($_INPUT['whatsapp_no']) && isset($_INPUT['father_name']) && isset($_INPUT['father_occupation'])
&& isset($_INPUT['mother_name']) && isset($_INPUT['mother_occupation']) && isset($_INPUT['guardian_name']) && isset($_INPUT['guardian_occupation'])
&& isset($_INPUT['guardian_same_father']) && isset($_INPUT['address_line_1']) && isset($_INPUT['address_line_2']) && isset($_INPUT['city'])
&& isset($_INPUT['district']) && isset($_INPUT['pin']) && isset($_INPUT['recaptcha_token']) ){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        //TODO: Setup Application Id
        $application_no=$auth_user["data"]["application_no"];

        //BASIC INFO---9 INPUT
        $gender_clean = Filter::String($_INPUT['gender']);
        $religion_clean = Filter::String($_INPUT['religion']);
        $caste_clean = Filter::String($_INPUT['caste']);
        $mother_tongue_clean = Filter::String($_INPUT['mother_tongue']);
        $apply_for_reserved_seat_clean = Filter::String($_INPUT['apply_for_reserved_seat']);
        $caste_certificate_no_clean = Filter::Int($_INPUT['caste_certificate_no']);
        $weather_bpl_clean = Filter::String($_INPUT['weather_bpl']);
        $bpl_card_no_clean = Filter::Int($_INPUT['bpl_card_no']);
        $whatsapp_no_clean = Filter::Int($_INPUT['whatsapp_no']);

        // FAMILY INFO ---7 INPUT
        $father_name_clean = Filter::String($_INPUT['father_name']);
        $father_occupation_clean = Filter::String($_INPUT['father_occupation']);
        $mother_name_clean = Filter::String($_INPUT['mother_name']);
        $mother_occupation_clean = Filter::String($_INPUT['mother_occupation']);
        $guardian_name_clean = Filter::String($_INPUT['guardian_name']);
        $guardian_occupation_clean = Filter::String($_INPUT['guardian_occupation']);
        $guardian_same_father_clean = Filter::String($_INPUT['guardian_same_father']);

        //ADDRESS INFO 5 INPUT 
        $address_line_1 = Filter::String($_INPUT['address_line_1']);
        $address_line_2 = Filter::String($_INPUT['address_line_2']);
        $city = Filter::String($_INPUT['city']);
        $district = Filter::String($_INPUT['district']);
        $pin = Filter::Int($_INPUT['pin']);


        //INSERTING STUDENT BASIC INFO INTO DATABASE
        // TABLE : student_preregistration_draft_basic_info
        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_basic_info(application_no, gender, religion, caste, mother_tongue,
                                            apply_for_reserved_seat, caste_certificate_no,  weather_bpl, bpl_card_no, whatsapp_no)
                                VALUES(:application_no, :gender, :religion, :caste, :mother_tongue, :apply_for_reserved_seat,
                                        :caste_certificate_no,  :weather_bpl, :bpl_card_no, :whatsapp_no )');
        
        $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        
        $smt->bindParam(':gender', $gender, PDO::PARAM_STR);
        $smt->bindParam(':religion', $religion, PDO::PARAM_STR);
        $smt->bindParam(':caste', $caste, PDO::PARAM_STR);
        $smt->bindParam(':mother_tongue', $mother_tongue, PDO::PARAM_STR);
        $smt->bindParam(':apply_for_reserved_seat', $apply_for_reserved_seat, PDO::PARAM_STR);
        $smt->bindParam(':caste_certificate_no', $caste_certificate_no, PDO::PARAM_INT);
        $smt->bindParam(':weather_bpl', $weather_bpl, PDO::PARAM_STR);
        $smt->bindParam(':bpl_card_no', $bpl_card_no, PDO::PARAM_INT);
        $smt->bindParam(':whatsapp_no', $whatsapp_no, PDO::PARAM_INT);

        if($smt->execute()){
            // INSERTING FAMILY DETAILS INTO DATABASE
            // TABLE : student_preregistration_draft_family_info
            $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_family_info
            (application_no, father_name, father_occupation, mother_name, mother_occupation, guardian_name, guardian_occupation, guardian_same_father)
            VALUES(:application_no, :father_name, :father_occupation, :mother_name, :mother_occupation, :guardian_name, :guardian_occupation, :guardian_same_father)');

            $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt->bindParam(':father_name', $father_name, PDO::PARAM_STR);
            $smt->bindParam(':father_occupation', $father_occupation, PDO::PARAM_STR);
            $smt->bindParam(':mother_name', $mother_name, PDO::PARAM_STR);
            $smt->bindParam(':mother_occupation', $mother_occupation, PDO::PARAM_STR);
            $smt->bindParam(':guardian_name', $guardian_name, PDO::PARAM_STR);
            $smt->bindParam(':guardian_occupation', $guardian_occupation, PDO::PARAM_STR);
            $smt->bindParam(':guardian_same_father', $guardian_same_father, PDO::PARAM_STR);
            
            if($smt->execute()){
                // INSERTING ADDRESS INFO INTO DATABASE
                // TABLE : student_preregistration_draft_address
                $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_address(address_line_1, address_line_2, city, district, pin)
                    VALUES(:address_line_1, :address_line_2, :city, :district, :pin)');

            $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt->bindParam(':address_line_1', $address_line_1, PDO::PARAM_STR);
            $smt->bindParam(':address_line_2', $address_line_2, PDO::PARAM_STR);
            $smt->bindParam(':city', $city, PDO::PARAM_STR);
            $smt->bindParam(':district', $district, PDO::PARAM_STR);
            $smt->bindParam(':pin', $pin, PDO::PARAM_STR);

                if($smt->execute()){
                    $return['status'] = true;
                    $return['statusText'] = "Successfully Inserted";
                    $return['error'] = null;

                }else{
                    http_response_code(500);
                    $return['status'] = false;
                    $return['statusText'] = null;
                    $return['error'] = "Failed to record on Database";
                }

            }else{
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to record on Database";
            }
        }else{
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to record on Database";

        }
    }else{
        http_response_code(401);
        $return['status'] = false;
        $return['statusText'] = null;
        $return['error'] = "Failed to record on Database";
    }
}else{
    http_response_code(400);    
    $return['status'] = false;
    $return['statusText'] = null;
    $return['error'] = "Failed to record on Database";
}

echo json_encode($return);
exit;