<?php


namespace App\Domain\Admission\Repository;


use PDO;

final class GetProcessRepository{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO){
        $this->connection = $PDO;
    }

    /**
     * Fetch user academic info
     * @param int $application_no application_no of the user
     * @return array user academic info
     */
    public function getAcademicInfo(int $application_no): array{
        $smt = $this->connection->prepare("SELECT T2.previous_school_name, T2.year_of_madhyamik, 
                                                    T2.previous_student_id,
                                                    T3.marks_beng, T3.marks_engb, T3.marks_maths, T3.marks_psc, 
                                                    T3.marks_lsc, T3.marks_geo, T3.marks_hist, T3.marks_total, 
                                                    T3.marks_percentage,
                                                    T4.stream, T4.first_language, T4.second_language, T4.first_major,
                                                    T4.second_major, T4.third_major, T4.forth_major, 
                                                    T4.direct_admission, T4.medium
                                                    FROM `admission_student_preregistration_details` AS T1
                                                    INNER JOIN `admission_student_preregistration_draft_previous_academic_info` AS T2
                                                                    ON T1.application_no=T2.application_no
                                                    INNER JOIN `admission_student_preregistration_draft_previous_academic_marks` AS T3
                                                                    ON T1.application_no=T3.application_no
                                                    INNER JOIN `admission_student_preregistration_draft_present_academic` AS T4
                                                                    ON T1.application_no=T4.application_no
                                                                    WHERE T1.application_no = :application_no");

        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Fetch user declaration info
     * @param int $application_no application_no of the user
     * @return array user declaration info
     */
    public function getDeclarationInfo(int $application_no): array{
        $smt = $this->connection->prepare("SELECT T1.first_name, T1.middle_name, T1.last_name, T1.email, 
                                                    T1.aadhar_no, T1.mobile, T1.dob, T1.status,
                                                    T2.gender, religion, caste, mother_tongue, apply_for_reserved_seat, 
                                                    caste_certificate_no, weather_bpl, bpl_card_no, whatsapp_no,
                                                    T3.address_line_1, address_line_2, city, district, pin,
                                                    T4.father_name, father_occupation, mother_name, mother_occupation, 
                                                    guardian_name, guardian_occupation, guardian_same_father,
                                                    T5. previous_school_name, year_of_madhyamik, previous_student_id,
                                                    T6.marks_beng, marks_engb, marks_maths, marks_psc, marks_lsc, 
                                                    marks_geo, marks_hist, marks_total, marks_percentage,
                                                    T7.stream, first_language, second_language, first_major, 
                                                    second_major, third_major, forth_major, direct_admission, medium,
                                                    T8.mode_of_payment, name_of_bank, transaction_id, transaction_date
                                                    FROM admission_student_preregistration_details AS T1
                                                    INNER JOIN admission_student_preregistration_draft_basic_info AS T2
                                                                    ON T1.application_no = T2.application_no
                                                    INNER JOIN admission_student_preregistration_draft_address AS T3
                                                                    ON T1.application_no = T3.application_no
                                                    INNER JOIN admission_student_preregistration_draft_family_info AS T4
                                                                    ON T1.application_no = T4.application_no
                                                    INNER JOIN admission_student_preregistration_draft_previous_academic_info AS T5
                                                                    ON T1.application_no = T5.application_no
                                                    INNER JOIN admission_student_preregistration_draft_previous_academic_marks AS T6
                                                                    ON T1.application_no = T6.application_no
                                                    INNER JOIN admission_student_preregistration_draft_present_academic AS T7
                                                                    ON T1.application_no = T7.application_no
                                                    INNER JOIN admission_student_preregistration_draft_payment_info AS T8
                                                                    ON T1.application_no = T8.application_no
                                                                    WHERE T1.application_no = :application_no");

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Fetch user payment info
     * @param int $application_no application_no of the user
     * @return array user payment info
     */
    public function getPaymentInfo(int $application_no): array{
        $smt = $this->connection->prepare("SELECT T2.mode_of_payment, T2.name_of_bank, T2.transaction_id, 
                                                    T2.transaction_date
                                                    FROM `admission_student_preregistration_details` AS T1
                                    INNER JOIN `admission_student_preregistration_draft_payment_info` AS T2
                                                    ON T1.application_no=T2.application_no
                                                    WHERE T1.application_no = :application_no");

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Fetch user personal info
     * @param int $application_no application_no of the user
     * @return array user data
     */
    public function getPersonalInfo(int $application_no): array{
        $smt = $this->connection->prepare("SELECT T1.first_name, T1.middle_name, T1.last_name, T1.aadhar_no, 
                                                    T1.email, T1.mobile, T1.dob,
                                                    T2.gender, T2.religion, T2.caste, T2.mother_tongue, T2.apply_for_reserved_seat, T2.caste_certificate_no,
                                                    T2.weather_bpl, T2.bpl_card_no, T2.whatsapp_no,
                                                    T3.father_name, T3.father_occupation, T3.mother_name, T3.mother_occupation, T3.guardian_name,
                                                    T3.guardian_occupation, T3.guardian_same_father,
                                                    T4.address_line_1, T4.address_line_2, T4.city, T4.district, T4.pin,
                                                    T5.image_type, T5.image
                                                    FROM `admission_student_preregistration_details` AS T1
                                                    LEFT OUTER JOIN `admission_student_preregistration_draft_basic_info` AS T2
                                                                    ON T1.application_no=T2.application_no
                                                    LEFT OUTER JOIN `admission_student_preregistration_draft_family_info` AS T3
                                                                    ON T1.application_no=T3.application_no
                                                    LEFT OUTER JOIN `admission_student_preregistration_draft_address` AS T4
                                                                    ON T1.application_no=T4.application_no
                                                    LEFT OUTER JOIN `admission_student_preregistration_draft_image` AS T5
                                                                    ON T1.application_no=T5.application_no
                                                                    WHERE T1.application_no = :application_no");

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }
}