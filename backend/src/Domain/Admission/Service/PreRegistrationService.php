<?php


namespace App\Domain\Admission\Service;


use App\Domain\Admission\Repository\PreRegistrationRepository;
use App\Exception\ValidationException;

final class PreRegistrationService
{
    /**
     * @var PreRegistrationRepository
     */
    private $preRegistrationRepository;

    public function __construct(PreRegistrationRepository $preRegistrationRepository)
    {
        $this->preRegistrationRepository = $preRegistrationRepository;
    }

    /**
     * Check if user input is valid or not
     * @param array $data
     */
    public function checkInput(array $data): void{
        $errors = [];
        if (empty($data['first_name'])){
            $errors['first_name'] = 'Please enter a first name';
        }
        if (empty($data['last_name'])){
            $errors['last_name'] = 'Please enter a last name';
        }

        if (empty($data['email'])){
            $errors['email'] = 'Please enter an email address';
        }
        if (empty($data['mobile'])){
            $errors['mobile'] = 'Please enter a mobile number';
        }
        if (empty($data['dob'])){
            $errors['dob'] = 'Please enter your date of birth';
        }

        if (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false){
            $errors['email'] = 'Invalid email';
        }

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    /**
     * Insert preregistration details
     * @param array $data
     */
    public function preRegistrationDetails(array $data){
        $this->preRegistrationRepository->preRegistrationDetails($data);
    }
}