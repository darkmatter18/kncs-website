<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\Repository\ClassRepository;
use App\Exception\AuthenticationException;


final class ClassService{
    /**
     * @var ClassRepository
     */
    private $classRepository;

    public function __construct(ClassRepository $classRepository){
        $this->classRepository = $classRepository;
    }

    public function checkUser(array $user_data){
        //TODO return role bool
    }
}