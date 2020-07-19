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

        $application_no = $auth_user['data']->application_no; 
        

        //BASIC INFO---9 INPUT
        $gender_clean = Filter::String($_INPUT['gender']);
        $religion_clean = Filter::String($_INPUT['religion']);
        $caste_clean = Filter::String($_INPUT['caste']);
        $mother_tongue_clean = Filter::String($_INPUT['mother_tongue']);
        $apply_for_reserved_seat_clean = Filter::String($_INPUT['apply_for_reserved_seat']) ? 1 : 0;
        $caste_certificate_no_clean = Filter::String($_INPUT['caste_certificate_no']);
        $weather_bpl_clean = Filter::String($_INPUT['weather_bpl']) ? 1 : 0;
        $bpl_card_no_clean = Filter::String($_INPUT['bpl_card_no']);
        $whatsapp_no_clean = Filter::Int($_INPUT['whatsapp_no']);

        // FAMILY INFO ---7 INPUT
        $father_name_clean = Filter::String($_INPUT['father_name']);
        $father_occupation_clean = Filter::String($_INPUT['father_occupation']);
        $mother_name_clean = Filter::String($_INPUT['mother_name']);
        $mother_occupation_clean = Filter::String($_INPUT['mother_occupation']);
        $guardian_name_clean = Filter::String($_INPUT['guardian_name']);
        $guardian_occupation_clean = Filter::String($_INPUT['guardian_occupation']);
        $guardian_same_father_clean = Filter::String($_INPUT['guardian_same_father']) ? 1 : 0;

        //ADDRESS INFO 5 INPUT 
        $address_line_1_clean= Filter::String($_INPUT['address_line_1']);
        $address_line_2_clean= Filter::String($_INPUT['address_line_2']);
        $city_clean= Filter::String($_INPUT['city']);
        $district_clean= Filter::String($_INPUT['district']);
        $pin_clean= Filter::Int($_INPUT['pin']);

        // IMAGE VARIABLE
        list($image_type, $data) = explode(';', $_INPUT['image']);
        list(, $data)      = explode(',', $data);
        $base64_decode = base64_decode($data);

        // START student_preregistration_draft_basic_info TABLE UPADTE checking

        $smt = $pdocon->prepare("SELECT application_no FROM student_preregistration_draft_basic_info 
                                            WHERE application_no= :application_no");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);

        if($smt->execute()){
            $pdocon->beginTransaction();
            
            $smt1 = null;
            $smt2 = null;
            $smt3 = null;
            $smt4 = null;

            if($smt->rowCount() > 0){
                //table :  BASIC INFO
                $smt1= $pdocon->prepare('UPDATE student_preregistration_draft_basic_info
                                                        SET gender = :gender, religion = :religion, caste = :caste, mother_tongue = :mother_tongue,
                                                        apply_for_reserved_seat = :apply_for_reserved_seat, caste_certificate_no = :caste_certificate_no,
                                                        weather_bpl = :weather_bpl, bpl_card_no = :bpl_card_no, whatsapp_no = :whatsapp_no
                                                        WHERE application_no = :application_no');
                //table: FAMILY INFO
                $smt2 = $pdocon->prepare('UPDATE student_preregistration_draft_family_info
                                                        SET father_name = :father_name, father_occupation = :father_occupation,
                                                        mother_name = :mother_name, mother_occupation = :mother_occupation,
                                                        guardian_name = :guardian_name, guardian_occupation = :guardian_occupation,
                                                        guardian_same_father = :guardian_same_father
                                                        WHERE application_no = :application_no');

                //TABLE: ADDRESS
                $smt3 = $pdocon->prepare('UPDATE student_preregistration_draft_address
                                                SET address_line_1 = :address_line_1, address_line_2 = :address_line_2,
                                                    city = :city, district = :district, pin = :pin
                                                WHERE application_no = :application_no');
                // Table : Image
                $smt4 = $pdocon->prepare('UPDATE student_preregistration_draft_image
                                            SET image_type = :image_type, image = :image
                                            WHERE application_no = :application_no');

            } else {
                // TABLE : BASIC INFO
                $smt1 = $pdocon->prepare('INSERT INTO student_preregistration_draft_basic_info(application_no, gender, religion, caste, mother_tongue,
                                            apply_for_reserved_seat, caste_certificate_no,  weather_bpl, bpl_card_no, whatsapp_no)
                                VALUES(:application_no, :gender, :religion, :caste, :mother_tongue, :apply_for_reserved_seat,
                                        :caste_certificate_no,  :weather_bpl, :bpl_card_no, :whatsapp_no )');

                //TABLE : FAMILY INFO
                $smt2 = $pdocon->prepare('INSERT INTO student_preregistration_draft_family_info
                                            (application_no, father_name, father_occupation, mother_name, mother_occupation, guardian_name,
                                                guardian_occupation, guardian_same_father)
                                            VALUES(:application_no, :father_name, :father_occupation, :mother_name, :mother_occupation,
                                                :guardian_name, :guardian_occupation, :guardian_same_father)');
                // TABLE :
                $smt3 = $pdocon->prepare('INSERT INTO student_preregistration_draft_address
                                            (application_no, address_line_1, address_line_2, city, district, pin)
                                            VALUES(:application_no,:address_line_1, :address_line_2, :city, :district, :pin)');

                 // Table : student_preregistration_draft_image
                $smt4 = $pdocon->prepare('INSERT INTO student_preregistration_draft_image(application_no, image_type, image)
                                            VALUES(:application_no, :image_type, :image)');

            }
                
            // BASIC INFO
            $smt1->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $smt1->bindParam(':gender', $gender_clean, PDO::PARAM_STR);
            $smt1->bindParam(':religion', $religion_clean, PDO::PARAM_STR);
            $smt1->bindParam(':caste', $caste_clean, PDO::PARAM_STR);
            $smt1->bindParam(':mother_tongue', $mother_tongue_clean, PDO::PARAM_STR);
            $smt1->bindParam(':apply_for_reserved_seat', $apply_for_reserved_seat_clean, PDO::PARAM_BOOL);
            $smt1->bindParam(':caste_certificate_no', $caste_certificate_no_clean, PDO::PARAM_STR);
            $smt1->bindParam(':weather_bpl', $weather_bpl_clean, PDO::PARAM_BOOL);
            $smt1->bindParam(':bpl_card_no', $bpl_card_no_clean, PDO::PARAM_STR);
            $smt1->bindParam(':whatsapp_no', $whatsapp_no_clean, PDO::PARAM_INT);

            //FAMILY INFO
            $smt2->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt2->bindParam(':father_name', $father_name_clean, PDO::PARAM_STR);
            $smt2->bindParam(':father_occupation', $father_occupation_clean, PDO::PARAM_STR);
            $smt2->bindParam(':mother_name', $mother_name_clean, PDO::PARAM_STR);
            $smt2->bindParam(':mother_occupation', $mother_occupation_clean, PDO::PARAM_STR);
            $smt2->bindParam(':guardian_name', $guardian_name_clean, PDO::PARAM_STR);
            $smt2->bindParam(':guardian_occupation', $guardian_occupation_clean, PDO::PARAM_STR);
            $smt2->bindParam(':guardian_same_father', $guardian_same_father_clean, PDO::PARAM_BOOL);

            //ADDRESS INFO
            $smt3->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt3->bindParam(':address_line_1', $address_line_1_clean, PDO::PARAM_STR);
            $smt3->bindParam(':address_line_2', $address_line_2_clean, PDO::PARAM_STR);
            $smt3->bindParam(':city', $city_clean, PDO::PARAM_STR);
            $smt3->bindParam(':district', $district_clean, PDO::PARAM_STR);
            $smt3->bindParam(':pin', $pin_clean, PDO::PARAM_INT);

            //IMAGE 
            $smt4->bindParam(':application_no', $application_no, PDO::PARAM_STR);
            $smt4->bindParam(':image_type', $image_type, PDO::PARAM_STR);
            $smt4->bindParam(':image', $base64_decode, PDO::PARAM_LOB);

            if($smt1->execute() && $smt2->execute() && $smt3->execute() && $smt4->execute()){
                if($pdocon->commit()){
                    $return['status'] = true;
                    $return['statusText'] = null;
                    $return['error'] = "Successfully Inserted or Updated";
                } else {
                    $return['status'] = false;
                    $return['statusText'] = null;
                    $return['error'] = "Failed to commit record on Database";
                }
            } else {
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to commit record on Database";
            }
        }else{
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to get data from basic info table";
        }
        // END of check of student_preregistration_draft_basic_info UPDATE CHECKING
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