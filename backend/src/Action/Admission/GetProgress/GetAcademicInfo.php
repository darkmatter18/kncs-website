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
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];
            $academic_info = $this->getProcessService->getAcademicInfo($application_no);

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