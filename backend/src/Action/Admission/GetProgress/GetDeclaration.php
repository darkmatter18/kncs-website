<?php


namespace App\Action\Admission\GetProgress;


use App\Domain\Admission\Service\GetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use function DI\string;

final class GetDeclaration
{
    /**
     * @var GetProcessService
     */
    private $getPrecessService;

    public function __construct(GetProcessService $getProcessService){
        $this->getPrecessService = $getProcessService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{
        try {
            //Get application number
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];

            //Get declaration info
            $declaration_info = $this->getPrecessService->getDeclarationInfo($application_no);

            //Return response
            if (sizeof($declaration_info) === 0){
                return $response->withStatus(204, 'No declaration info found on your id');
            }

            $result = [
                'data' => $declaration_info
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}