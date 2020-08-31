<?php


namespace App\Action\Admin;


use App\Domain\Admin\Service\StudentSelectService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class StudentSelectAction{

    /**
     * @var StudentSelectService
     */
    private $studentSelectService;

    public function __construct(StudentSelectService $studentSelectService){
        $this->studentSelectService = $studentSelectService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response){
        $data = $request->getParsedBody();
        if($data){
            $this->studentSelectService->student_select($data);


        } else {
            $response->getBody()->write("Invalid Request");
            return $response->withStatus(400);
        }
    }
}