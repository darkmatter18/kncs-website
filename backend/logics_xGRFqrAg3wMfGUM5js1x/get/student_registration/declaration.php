<?php

define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$return = [];
header('Content-Type: application/json');

$application_no = $auth_user['data']->application_no;

$smt = $pdocon->prepare("SELECT T1.first_name, T1.middle_name, T1.last_name, T1.email, T1.aadhar_no, T1.mobile, T1.dob,
    T2.gender, religion, caste, mother_tongue, apply_for_reserved_seat, caste_certificate_no, weather_bpl, bpl_card_no, whatsapp_no,
    T3.address_line_1, address_line_2, city, district, pin,
    T4.father_name, father_occupation, mother_name, mother_occupation, guardian_name, guardian_occupation, guardian_same_father,
    T5. previous_school_name, year_of_madhyamik, previous_student_id,
       T6.marks_beng, marks_engb, marks_maths, marks_psc, marks_lsc, marks_geo, marks_hist, marks_total, marks_percentage,
       T7.stream, first_language, second_language, first_major, second_major, third_major, forth_major, direct_admission, medium,
       T8.mode_of_payment, name_of_bank, transaction_id, transaction_date
FROM student_preregistration_details AS T1
    INNER JOIN student_preregistration_draft_basic_info AS T2
        ON T1.application_no = T2.application_no
    INNER JOIN student_preregistration_draft_address AS T3
        ON T1.application_no = T3.application_no
    INNER JOIN student_preregistration_draft_family_info AS T4
        ON T1.application_no = T4.application_no
    INNER JOIN student_preregistration_draft_previous_academic_info AS T5
        ON T1.application_no = T5.application_no
    INNER JOIN student_preregistration_draft_previous_academic_marks AS T6
        ON T1.application_no = T6.application_no
    INNER JOIN student_preregistration_draft_present_academic AS T7
        ON T1.application_no = T7.application_no
    INNER JOIN student_preregistration_draft_payment_info AS T8
        ON T1.application_no = T7.application_no
WHERE T1.application_no = :application_no");

$smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

if ($smt->execute()) {
    $smt->setFetchMode(PDO::FETCH_ASSOC);
    $output = $smt->fetch();
    $return['data'] = $output;
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
