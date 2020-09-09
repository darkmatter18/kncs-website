<?php


namespace App\Action\Admission;


use App\Domain\Admission\Service\PreRegistrationService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class PreRegistrationAction{
    /**
     * @var PreRegistrationService
     */
    private $preRegistrationService;

    public function __construct(PreRegistrationService $preRegistrationService)
    {
        $this->preRegistrationService = $preRegistrationService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface
    {
        try {
            //Get data from HTTP request
            $data = (array)$request->getParsedBody();

            //Check data
            $this->preRegistrationService->checkInput($data);

            $data['status'] = "DRAFT";
            $data['application_no'] = time();

            //Insert data
            $this->preRegistrationService->preRegistrationDetails($data);


        }catch (Exception $e) {
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}