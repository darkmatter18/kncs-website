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
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];

header('Content-Type: application/json');

if (isset($_INPUT['gender']) && isset($_INPUT['religion']) && isset($_INPUT['caste']) && isset($_INPUT['mother_tongue'])
    && isset($_INPUT['whatsapp_no']) && isset($_INPUT['father_name']) && isset($_INPUT['father_occupation']) && isset($_INPUT['mother_name'])
    && isset($_INPUT['mother_occupation']) && isset($_INPUT['guardian_name']) && isset($_INPUT['guardian_occupation'])
    && isset($_INPUT['guardian_same_father']) && isset($_INPUT['address_line_1']) && isset($_INPUT['address_line_2']) && isset($_INPUT['city'])
    && isset($_INPUT['district']) && isset($_INPUT['pin']) && isset($_INPUT['image']) && isset($_INPUT['recaptcha_token'])) {

    if (checkRecaptcha($_INPUT['recaptcha_token'])) {
        //TODO: Setup Application Id
        $application_no = $auth_user['data']->application_no; 
        

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
        $address_line_1_clean= Filter::String($_INPUT['address_line_1']);
        $address_line_2_clean= Filter::String($_INPUT['address_line_2']);
        $city_clean= Filter::String($_INPUT['city']);
        $district_clean= Filter::String($_INPUT['district']);
        $pin_clean= Filter::Int($_INPUT['pin']);


        // INSERTING STUDENT BASIC INFO INTO DATABASE
        // TABLE : student_preregistration_draft_basic_info
 
        $pdocon->beginTransaction();    // check wheather it is inside the table or not

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_basic_info(application_no, gender, religion, caste, mother_tongue,
                                            apply_for_reserved_seat, caste_certificate_no,  weather_bpl, bpl_card_no, whatsapp_no)
                                VALUES(:application_no, :gender, :religion, :caste, :mother_tongue, :apply_for_reserved_seat,
                                        :caste_certificate_no,  :weather_bpl, :bpl_card_no, :whatsapp_no )');

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':gender', $gender_clean, PDO::PARAM_STR);
        $smt->bindParam(':religion', $religion_clean, PDO::PARAM_STR);
        $smt->bindParam(':caste', $caste_clean, PDO::PARAM_STR);
        $smt->bindParam(':mother_tongue', $mother_tongue_clean, PDO::PARAM_STR);
        $smt->bindParam(':apply_for_reserved_seat', $apply_for_reserved_seat_clean, PDO::PARAM_STR);
        $smt->bindParam(':caste_certificate_no', $caste_certificate_no_clean, PDO::PARAM_STR);
        $smt->bindParam(':weather_bpl', $weather_bpl_clean, PDO::PARAM_STR);
        $smt->bindParam(':bpl_card_no', $bpl_card_no_clean, PDO::PARAM_STR);
        $smt->bindParam(':whatsapp_no', $whatsapp_no_clean, PDO::PARAM_INT);

        if ($smt->execute()) {
            // INSERTING FAMILY DETAILS INTO DATABASE
            // TABLE : student_preregistration_draft_family_info
            $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_family_info
            (application_no, father_name, father_occupation, mother_name, mother_occupation, guardian_name, guardian_occupation, guardian_same_father)
            VALUES(:application_no, :father_name, :father_occupation, :mother_name, :mother_occupation, :guardian_name, :guardian_occupation, :guardian_same_father)');

            $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt->bindParam(':father_name', $father_name_clean, PDO::PARAM_STR);
            $smt->bindParam(':father_occupation', $father_occupation_clean, PDO::PARAM_STR);
            $smt->bindParam(':mother_name', $mother_name_clean, PDO::PARAM_STR);
            $smt->bindParam(':mother_occupation', $mother_occupation_clean, PDO::PARAM_STR);
            $smt->bindParam(':guardian_name', $guardian_name_clean, PDO::PARAM_STR);
            $smt->bindParam(':guardian_occupation', $guardian_occupation_clean, PDO::PARAM_STR);
            $smt->bindParam(':guardian_same_father', $guardian_same_father_clean, PDO::PARAM_STR);

            if ($smt->execute()) {
                // INSERTING ADDRESS INFO INTO DATABASE
                // TABLE : student_preregistration_draft_address
                $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_address(application_no, address_line_1, address_line_2, city, district, pin)
                    VALUES(:application_no, :address_line_1, :address_line_2, :city, :district, :pin)');

                $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
                $smt->bindParam(':address_line_1', $address_line_1_clean, PDO::PARAM_STR);
                $smt->bindParam(':address_line_2', $address_line_2_clean, PDO::PARAM_STR);
                $smt->bindParam(':city', $city_clean, PDO::PARAM_STR);
                $smt->bindParam(':district', $district_clean, PDO::PARAM_STR);
                $smt->bindParam(':pin', $pin_clean, PDO::PARAM_INT);


                if($smt->execute()){

                    $base64_data = ($_INPUT['image']);

                    $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_image(application_no,image) VALUES(:application_no,:image)');
                    $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
                    $smt->bindColumn(':image', base64_decode($base64_data), PDO::PARAM_LOB);

                    if ($smt->execute()){
                        if($pdocon->commit()){
                            $return['status'] = true;
                            $return['statusText'] = "Successfully Inserted";
                            $return['error'] = null;
                          } else {
                            http_response_code(500);
                            $return['status'] = false;
                            $return['statusText'] = null;
                            $return['error'] = "Failed to commit record on Database";
                          }

                    } else {
                        http_response_code(500);
                        $return['status'] = false;
                        $return['statusText'] = null;
                        $return['error'] = "Image uploading failed";
                    }

                } else {
                    http_response_code(500);
                    $return['status'] = false;
                    $return['statusText'] = null;
                    $return['error'] = "Failed to record on Database - address";
                }

            } else {
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to record on Database - family_info";
            }
        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to record on Database - basic_info";

        }
    } else {
        http_response_code(401);
        $return['status'] = false;
        $return['statusText'] = null;
        $return['error'] = "Recaptcha verification failed";
    }
} else {
    http_response_code(400);
    $return['status'] = false;
    $return['statusText'] = null;
    $return['error'] = "Invalid Parameter";
}

echo json_encode($return);
exit;