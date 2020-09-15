<?php


namespace App\Domain\Admission\Service;

use App\Auth\JwtAuth;
use App\Domain\Admission\Repository\PreRegistrationLoginRepository;
use App\Exception\ValidationException;

final class PreRegistrationLoginService
{
    /**
     * @var PreRegistrationLoginRepository
     */
    private $preRegistrationLoginRepository;
    /**
     * @var JwtAuth
     */
    private $auth;

    public function __construct(PreRegistrationLoginRepository $preRegistrationLoginRepository, JwtAuth $auth)
    {
        $this->preRegistrationLoginRepository = $preRegistrationLoginRepository;
        $this->auth = $auth;
    }

    /**
     * Check input data is valid or not
     * @param array $data
     */
    public function checkInput(array $data){
        $errors = [];
        if (empty($data['application_no'])){
            $errors['application'] = 'Please enter a application number';
        }elseif (filter_var($data['application_no'], FILTER_VALIDATE_INT) === false){
            $errors['application'] = 'Please enter a valid application number';
        }

        if (empty($data['email'])){
            $errors['email'] = 'Please enter an email id';
        }elseif (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false){
            $errors['email'] = 'Please enter a valid email id';
        }

        if (empty($data['dob'])){
            $errors['dob'] = 'Please enter a date of birth';
        }

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    /**
     * Login
     * @param array $data
     * @return array
     */
    public function login(array $data): array{
        $errors = [];
        $user_data = $this->preRegistrationLoginRepository->login($data['application_no'], $data['email'], $data['dob']);
        if (sizeof($user_data) === 0){
            $errors ['user'] = 'User not found';
        }

        if ($errors){
            throw new ValidationException("This application details doesn't exists", $errors);
        }

        return [
            'user' =>array('application_no' => $user_data['application_no'], 'status' => $user_data['status']),
            'jwt' => $this->makeAuthToken($user_data['application_no'], $user_data['status']),
            'jwt_lifetime' => $this->auth->getLifetime()
        ];
    }

    /**
     * Making user authentication token
     * @param string $application_no
     * @param string $status
     * @return string
     */
    private function makeAuthToken(string $application_no, string $status){
        return $this->auth->createJwt([
            'application_no' => $application_no,
            'status' => $status
        ]);
    }
}