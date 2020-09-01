<?php


namespace App\Domain\Login\Service;


use App\Auth\JwtAuth;
use App\Domain\Login\Repository\LoginRepository;
use App\Exception\AuthenticationException;
use App\Exception\ValidationException;

final class LoginService{
    /**
     * @var JwtAuth
     */
    private $auth;
    /**
     * @var LoginRepository
     */
    private $loginRepository;

    public function __construct(JwtAuth $auth, LoginRepository $loginRepository)
    {
        $this->auth = $auth;
        $this->loginRepository = $loginRepository;
    }

    public function checkInput(array $data): void{
        $errors = [];
        if(!(isset($data['email']) && isset($data['password']) && isset($data['recaptcha_token']))){
            $errors = ['Invalid Input'];
        }

        if (empty($data['email'])) {
            $errors['email'] = 'Input required';
        } elseif (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
            $errors['email'] = 'Invalid email address';
        }

        if ($errors) {
            throw new ValidationException('Please check your input', $errors);
        }

    }

    public function login(array $data): array {
        $userDetails = $this->loginRepository->checkUser($data['email']);

        if(empty($userDetails)){
            throw new AuthenticationException("Invalid Email");
        }

        if(!password_verify($data['password'], $userDetails['password'])){
            throw new AuthenticationException("Invalid Email/Password");
        }

        $user_data = $this->loginRepository->getUserDataAndLogin($data['email'], $userDetails['user_role']);
        $this->loginRepository->updateLoginDateTime($data['email']);

        return $user_data;
    }
}