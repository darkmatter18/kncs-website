<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\StudentRepository;

class StudentService
{
    /**
     * @var StudentRepository
     */
    private $studentRepository;

    public function __construct(StudentRepository $studentRepository)
    {
        $this->studentRepository = $studentRepository;
    }
}