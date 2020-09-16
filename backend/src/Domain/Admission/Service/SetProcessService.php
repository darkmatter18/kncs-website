<?php


namespace App\Domain\Admission\Service;


use App\Domain\Admission\Repository\SetProcessRepository;
use App\Exception\ValidationException;

final class SetProcessService
{
    /**
     * @var SetProcessRepository
     */
    private $setProcessRepository;

    public function __construct(SetProcessRepository $setProcessRepository)
    {
        $this->setProcessRepository = $setProcessRepository;
    }

    /**
     * Check if academic info exists or not
     * @param int $application_no
     * @return bool
     */
    public function isAcademicInfoExists(int $application_no): bool{
        return $this->setProcessRepository->isAcademicInfoExists($application_no);
    }

    /**
     * Update academic info
     * @param int $application_no
     * @param array $academic_info
     */
    public function updateAcademicInfo(int $application_no, array $academic_info){
        $this->setProcessRepository->updateAcademicInfo($application_no, $academic_info);
    }

    /**
     * Insert academic info
     * @param int $application_no
     * @param array $academic_info
     */
    public function setAcademicInfo(int $application_no, array $academic_info){
        $this->setProcessRepository->setAcademicInfo($application_no, $academic_info);
    }

    /**
     * Check if payment info exists or not
     * @param int $application_no
     * @return bool
     */
    public function isPaymentInfoExists(int $application_no): bool{
        return $this->setProcessRepository->isPaymentInfoExists($application_no);
    }

    /**
     * Update payment info
     * @param int $application_no
     * @param array $payment_info
     */
    public function updatePaymentInfo(int $application_no, array $payment_info){
        $this->setProcessRepository->updatePaymentInfo($application_no, $payment_info);
    }

    /**
     * Insert payment info
     * @param int $application_no
     * @param array $payment_info
     */
    public function setPaymentInfo(int $application_no, array $payment_info){
        $this->setProcessRepository->setPaymentInfo($application_no, $payment_info);
    }

    /**
     * Check if personal data exists or not
     * @param string $application_no
     * @return bool
     */
    public function isPersonalInfoExists(string $application_no): bool{
        return $this->setProcessRepository->isPersonalInfoExists($application_no);
    }

    /**
     * Update basic info
     * @param string $application_no
     * @param array $personal_info
     */
    public function updateBasicInfo(string $application_no, array $personal_info): void{
        $this->setProcessRepository->updateBasicInfo($application_no, $personal_info);
    }

    /**
     * Insert basic info
     * @param string $application_no
     * @param array $personal_info
     */
    public function setBasicInfo(string $application_no, array $personal_info){
        $this->setProcessRepository->setBasicInfo($application_no, $personal_info);
    }

    /**
     * Insert declaration info
     * @param int $application_no
     * @param array $declaration_info
     */
    public function setDeclarationInfo(int $application_no, array $declaration_info){
        $this->setProcessRepository->setDeclarationInfo($application_no, $declaration_info);
    }

    /**
     * Check input data for academic info
     * @param array $academic_info
     */
    public function checkAcademicInfoInputs(array $academic_info): void{
        $errors = [];
        //Previous School Details   --- 3 inputs ---
        if (empty($academic_info['previous_school_name'])){
            $errors['previous_school_name'] = 'Please enter your previous school name';
        }
        if (empty($academic_info['year_of_madhyamik'])){
            $errors['year_of_madhyamik'] = 'Please enter your year of madhyamik';
        }
        if (empty($academic_info['previous_student_id'])){
            $errors['previous_student_id'] = 'Please enter your previous academic info';
        }

        //Previous academic marks    --- 9 inputs ---
        if (empty($academic_info['marks_beng'])){
            $errors['marks_beng'] = 'Please enter your marks in Bengali';
        }elseif (filter_var($academic_info['marks_beng'], FILTER_VALIDATE_INT) === false){
            $errors['marks_beng'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_engb'])){
            $errors['marks_engb'] = 'Please enter your marks in English';
        }elseif (filter_var($academic_info['marks_engb'], FILTER_VALIDATE_INT) === false){
            $errors['marks_engb'] = 'Please enter a valid marks';
        }
        if (empty($academic_info[''])){
            $errors['marks_maths'] = 'Please enter your marks in Mathematics';
        }elseif (filter_var($academic_info['marks_maths'], FILTER_VALIDATE_INT) === false){
            $errors['marks_maths'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_psc'])){
            $errors['marks_psc'] = 'Please enter your marks in Physical Science';
        }elseif (filter_var($academic_info['marks_psc'], FILTER_VALIDATE_INT) === false){
            $errors['marks_psc'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_lsc'])){
            $errors['marks_lsc'] = 'Please enter your marks in Life Science';
        }elseif (filter_var($academic_info['marks_lsc'], FILTER_VALIDATE_INT) === false){
            $errors['marks_lsc'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_geo'])){
            $errors['marks_geo'] = 'Please enter your marks in Geography';
        }elseif (filter_var($academic_info['marks_geo'], FILTER_VALIDATE_INT) === false){
            $errors['marks_geo'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_hist'])){
            $errors['marks_hist'] = 'Please enter your marks in History';
        }elseif (filter_var($academic_info['marks_hist'], FILTER_VALIDATE_INT) === false){
            $errors['marks_hist'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_total'])){
            $errors['marks_total'] = 'Please enter your total marks';
        }elseif (filter_var($academic_info['marks_total'], FILTER_VALIDATE_INT) === false){
            $errors['marks_total'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_percentage'])){
            $errors['marks_percentage'] = 'Please enter your percentage';
        }elseif (filter_var($academic_info['marks_percentage'], FILTER_VALIDATE_INT) === false){
            $errors['marks_percentage'] = 'Please enter a valid marks';
        }

        //Error checking
        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    /**
     * Check input data for payment info
     * @param array $payment_info
     */
    public function checkPaymentInfoInputs(array $payment_info): void{
        $errors = [];
        if (empty($payment_info['mode_of_payment'])){
            $errors['mode_of_payment'] = 'Please enter the mode of payment';
        }
        if (empty($payment_info['name_of_bank'])){
            $errors['name_of_bank'] = 'Please enter the name of bank';
        }
        if (empty($payment_info['transaction_id'])){
            $errors['transaction_id'] = 'Please enter the transaction id';
        }
        if (empty($payment_info['transaction_date'])){
            $errors['transaction_date'] = 'Please enter the transaction date';
        }

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    /**
     * Sanitize personal info inputs
     * @param array $basic_info
     * @return array
     */
    public function  sanitizePersonalInfoInputs(array $basic_info): array{

        $basic_info['apply_for_reserved_seat'] = $basic_info['apply_for_reserved_seat'] == 'true' ? 1 : 0;

        $basic_info['guardian_same_father'] = $basic_info['guardian_same_father'] == 'true' ? 1 : 0;

    }

    /**
     * Check input data for personal info
     * @param array $basic_info
     * @return void
     */
    public function checkPersonalInfoInputs(array $basic_info): void{
        $errors = [];

        if (empty($basic_info['gender'])){
            $errors['gender'] = 'Please enter your gender';
        }

        if (empty($basic_info['religion'])){
            $errors['religion'] = 'Please enter your religion';
        }

        if (empty($basic_info['mother_tongue'])){
            $errors['mother_tongue'] = 'Please enter your mother tongue';
        }

        if (empty($basic_info['apply_for_reserved_seat'])){
            $errors['apply_for_reserved_seat'] = 'Enter your choice';
        }

        if (empty($basic_info['caste'])){
            $errors['caste'] = 'Please enter your caste';
        }

        if (empty($basic_info['whatsapp_no'])){
            $errors['whatsapp_no'] = 'Please enter a mobile number';
        }elseif (strlen($basic_info['whatsapp_no']) != 10){
            $errors['whatsapp_no'] = 'Please enter a valid mobile number';
        }elseif (filter_var($basic_info['whatsapp_no'], FILTER_VALIDATE_INT) === false){
            $errors['whatsapp_no'] = 'Please enter a valid mobile number';
        }

        if (empty($basic_info['father_name'])){
            $errors['father_name'] = 'Please enter your father name';
        }

        if (empty($basic_info['mother_name'])){
            $errors['mother_name'] = 'Please enter your mother name';
        }

        if (empty($basic_info['guardian_name'])){
            $errors['guardian_name'] = 'Please enter your guardian name';
        }

        if (empty($basic_info['guardian_occupation'])){
            $errors['guardian_occupation'] = 'Please enter your guardian occupation';
        }

        if (empty($basic_info['address_line_1'])){
            $errors['address_line_1'] = 'Please enter your address';
        }

        if (empty($basic_info['city'])){
            $errors['city'] = 'Please enter your city';
        }

        if (empty($basic_info['district'])){
            $errors['district'] = 'Please enter your district';
        }

        if (empty($basic_info['pin'])){
            $errors['pin'] = 'Please enter your pin';
        }elseif (filter_var($basic_info['pin'], FILTER_VALIDATE_INT) === false){
            $errors['pin'] = 'Please enter a valid pin';
        }elseif (strlen($basic_info['pin']) != 6){
            $errors['pin'] = 'Please enter a valid pin';
        }

        if (empty($basic_info['weather_bpl'])){
            $errors['guardian_same_father'] = 'Enter your choice';
        }
        if (empty($basic_info['guardian_same_father'])){
            $errors['guardian_same_father'] = 'Enter your choice';
        }





        //: TODO image validation

        if ($errors) {
            throw new ValidationException('Please check your input', $errors);
        }

    }

    /**
     * Check input data for declaration info
     * @param array $declaration_info
     */
    public function checkDeclarationInfoInputs(array $declaration_info){
        $errors = [];
        if (empty($declaration_info['date'])){
            $errors['date'] = 'Please enter a date';
        }
        if (empty($declaration_info['place'])){
            $errors['place'] = 'Please enter a place';
        }
        if (empty($declaration_info['full_name'])){
            $errors['full_name'] = 'Please enter a full name';
        }

        if ($errors){
            throw new ValidationException('Please check your input.', $errors);
        }
    }
}