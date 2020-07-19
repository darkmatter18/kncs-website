<?php

/**
 * GET
 * GETTING STUDENT PREREGISTRATION  PERSONAL DETAILS FROM DATABASE
 * DATABASE : kncs
 *    TABLE : student_preregistration_details AS T1
 *            student_preregistration_draft_basic_info AS T2
 *            student_preregistration_draft_family_info AS T3
 *            student_preregistration_draft_address AS T4
 *            student_preregistration_draft_image AS T5
 * Manojit Karmakar (17/07/2020)
 */

define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

$application_no = $auth_user['data']->application_no;

$smt = $pdocon->prepare("SELECT T1.first_name, T1.middle_name, T1.last_name, T1.aadhar_no, T1.email, T1.mobile, T1.dob,
                                T2.gender, T2.religion, T2.caste, T2.mother_tongue, T2.apply_for_reserved_seat, T2.caste_certificate_no,
                                T2.weather_bpl, T2.bpl_card_no, T2.whatsapp_no,
                                T3.father_name, T3.father_occupation, T3.mother_name, T3.mother_occupation, T3.guardian_name,
                                T3.guardian_occupation, T3.guardian_same_father,
                                T4.address_line_1, T4.address_line_2, T4.city, T4.district, T4.pin,
                                T5.image_type, T5.image
                        FROM `student_preregistration_details` AS T1
                        LEFT OUTER JOIN `student_preregistration_draft_basic_info` AS T2
                        ON T1.application_no=T2.application_no
                        LEFT OUTER JOIN `student_preregistration_draft_family_info` AS T3
                        ON T1.application_no=T3.application_no
                        LEFT OUTER JOIN `student_preregistration_draft_address` AS T4
                        ON T1.application_no=T4.application_no
                        LEFT OUTER JOIN `student_preregistration_draft_image` AS T5
                        ON T1.application_no=T5.application_no

                        WHERE T1.application_no = :application_no");

$smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

if ($smt->execute()) {
    $smt->setFetchMode(PDO::FETCH_ASSOC);
    $output = $smt->fetch();
    $return['data'] = $output;

    // $image = base64_encode($output['image']);
    // $return['image'] = $image;
    // 'data:image/' . $type . ';base64,' . base64_encode($data);
    if ($output['image']){
        $i = $output['image_type'] . ';base64,'.  base64_encode($output['image']);
        $return['data']['image'] = $i;
    } else {
        $return['data']['image'] = null;
    }

    $return['status'] = true;
    $return['statusText'] = "Fetch Done";
    $return['error'] = null;

} else {
    http_response_code(500);
    $return['status'] = false;
    $return['statusText'] = null;
    $return['error'] = "Failed to get data from Database";
    $return['data'] = null;
}

echo json_encode($return);
exit;




