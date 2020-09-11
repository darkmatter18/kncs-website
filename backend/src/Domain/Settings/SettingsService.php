<?php


namespace App\Domain\Settings;

use App\Domain\Settings\SettingsRepository;

final class SettingsService
{
    /**
     * @var SettingsRepository
     */
    private $settingsRepository;

    public function __construct(SettingsRepository $settingsRepository)
    {
        $this->settingsRepository = $settingsRepository;
    }

    public function getAllSettings(): array{
        $x = $this->settingsRepository->getAllSettings();
        $result = [];
        for ($i = 0; $i < sizeof($x); $i++){
            $result[$x[0]['setting_key']] = $x[0]['setting_value'];
        }
        return $result;
    }
}