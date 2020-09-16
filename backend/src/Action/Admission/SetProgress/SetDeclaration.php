<?php


namespace App\Action\Admission\SetProgress;


use App\Domain\Admission\Service\SetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SetDeclaration
{
    /**
     * @var SetProcessService
     */
    private $setProcessService;

    public function __construct(SetProcessService $setProcessService){
        $this->setProcessService = $setProcessService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{
        try {
            //Get data from HTTP request
            $declaration_info = (array)$request->getParsedBody();

            //Get application number
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];

            //Check declaration data
            $this->setProcessService->checkDeclarationInfoInputs($declaration_info);

            //Set declaration data
            $this->setProcessService->setDeclarationInfo($application_no, $declaration_info);

            // On Successful Completion on the Request, server sends a 204 response without any body
            return $response->withStatus(204, "Submitted Successfully");

        }catch (Exception $e){
            print_r($e->getMessage());
//            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}