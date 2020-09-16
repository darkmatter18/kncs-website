<?php


namespace App\Action\Admission\GetProgress;


use App\Domain\Admission\Service\GetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetAcademicInfo
{
    /**
     * @var GetProcessService
     */
    private $getProcessService;

    public function __construct(GetProcessService $getProcessService){
        $this->getProcessService = $getProcessService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{
        try {
            //Get application number
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];

            //Get academic info
            $academic_info = $this->getProcessService->getAcademicInfo($application_no);

            //Return response
            if (sizeof($academic_info) === 0){
                return $response->withStatus(204, 'No academic record found on your id');
            }

            $result = [
                'data' => $academic_info
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}