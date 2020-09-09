<?php


namespace App\Action\Admission\SetProgress;


use App\Domain\Admission\Service\SetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SetPaymentInfo
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
            $payment_info = (array)$request->getParsedBody();

            //Get application number
            $application_no = (int)$request->getAttribute('JwtClaims')['application_no'];

            //Check payment details
            $this->setProcessService->checkPaymentInfo($payment_info);

            //Set or update payment info
            if ($this->setProcessService->fetchPaymentInfo($application_no)){
                $this->setProcessService->updatePaymentInfo($application_no, $payment_info);
            }else{
                $this->setProcessService->setPaymentInfo($application_no, $payment_info);
            }

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}