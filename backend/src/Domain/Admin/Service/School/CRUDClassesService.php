<?php


namespace App\Domain\Admin\Service\School;


use App\Auth\JwtAuth;
use App\Domain\Login\Repository\LoginRepository;

final class CRUDClassesService
{
    public function __construct(JwtAuth $auth, LoginRepository $loginRepository)
    {

    }
}