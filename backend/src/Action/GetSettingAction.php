<?php


namespace App\Action;


use App\Domain\Settings\SettingsService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetSettingAction
{

    /**
     * @var SettingsService
     */
    private $settingsService;

    public function __construct(SettingsService $settingsService)
    {
        $this->settingsService = $settingsService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response)
    {
        try {
            $setting = $this->settingsService->getAllSettings();
            if (sizeof($setting) === 0){
                return $response->withStatus(204, 'No settings available');
            }
            $result = [
                'data' => $setting
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');
        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }

}