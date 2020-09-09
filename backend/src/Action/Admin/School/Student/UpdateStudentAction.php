<?php


namespace App\Action\Admin\School\Student;


use App\Domain\Admin\School\Service\StudentService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateStudentAction
{
    /**
     * @var StudentService
     */
    private $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response)
    {
        // TODO: Implement __invoke() method.
    }
}