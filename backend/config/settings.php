<?php

// Error reporting for production
use Monolog\Logger;

error_reporting(0);
ini_set('display_errors', '0');

// Timezone
date_default_timezone_set('Asia/Kolkata');

// Settings
$settings = [];

// Path settings
$settings['root'] = dirname(__DIR__);
$settings['temp'] = $settings['root'] . '/tmp';
$settings['public'] = $settings['root'] . '/public';

// Logger settings
$settings['logger'] = [
    'name' => 'app',
    'path' => dirname(__DIR__) . '/logs',
    'filename' => 'app.log',
    'level' => Logger::DEBUG,
    'file_permission' => 0775,
];

// CROS Urls
$settings['cros_urls'] = ['http://localhost:3000'];

// Uploaded Image URL
$settings['files'] = [
    'dir' => dirname(__DIR__) . '/files',
    'types_img' => ['image/jpeg', 'image/png'],
    'max_size' => [
        'max_all' => 3145728,
        'img' => 1048576
    ]
];

// Image Manager settings
$settings['image_manager'] = [
    // configure image driver (gd by default)
    'driver' => 'gd',
];

// Error Handling Middleware settings
$settings['error'] = [

    // Should be set to false in production
    'display_error_details' => true,

    // Parameter is passed to the default ErrorHandler
    // View in rendered output by enabling the "displayErrorDetails" setting.
    // For the console and unit tests we also disable it
    'log_errors' => true,

    // Display error details in error log
    'log_error_details' => true,
];

$settings['jwt'] = [

    // The issuer name
    'issuer' => 'https://kncs.in',

    // Max lifetime in seconds (4 hours)
    'lifetime' => 14400,

    // The private key
    'private_key' => '-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAvGep8KUtZ5esZH9QLCnVA+eQ8bMfTTm0ta8QlIdeU2g6qxOm
3LgdcI5Cu0lhAP3htmAW0zfFwsECNvMjJtdh7imE/EmrhxQaYxfyTyFRT8AirivF
5GbV+pfyxVDzsfIV0/GuWtXFMOHpuUROEHvXhfCbfpAQZYmk8RrR40DaVF4XZwhJ
7nWZd3aUKFowHDHlykNO5t3DKGSD8rQ7QEAMOVy6T3mcVsIiDgsVUP5dsS6upxJG
G+UG2LnQrHbhU6QGO+PA3QTq+yImWSWc3Zwcxc43al2dP71GgUABeWYqAZ+DCWXE
GTor3Na+usvy3Vq4wvGaX68hMG7C+cHGK4gEEQIDAQABAoIBAHeOgPTInMuEIE2V
zNZ5pUdZB02ZkV98IwS4Fxlp3Z2oIrK1QcoGvAfU/tvCcOAkO7tztohKeCBiQnmE
SOY4/1gW2OEQDt0lEKmZZJZ6WhL1pgxIksehyl+/VLuJ51sgeGGKmE3kIcInWh3L
Do6/R8EjMklaOk10z0qA7nf7i5DFHR6aQWjA8RbSfGUgIijR+dmtFFJyRGxtIvIE
8TQF4aIBWxxeJ484Y68ltkSksWfQqgHQoV2ot7VJd+2zLKheeyqfjXOMlD75xoGV
wv/+C3KZ91/AwXzy89nKKo/W8/I2gVtI9Bl4PWXVOOPlWA0GB2MQod6Q8WyXKHDb
BqoVqZECgYEA7SxyEv+WNE/ekYG3bzbTzd5X096pC0Xww6TjzQ4HCohXfEocVRpW
XTKK0mvMvpD5vxX/9ukfaEJpHuKk3UGLcfKoUXZ1etF9l5WN9UqOXU/DMD08YAEk
305a7v2+0RRp+x7DmAQCW3ZVMSH0Iw61NfnujkGEWPEsZCV3BUE5CUMCgYEAy1wz
SAb2rTnkEvQR+kj9QuohBa8nszCR1/75QmMHs8MTMkPyashNOB4+dhh22O+wD8hC
R22bW99c5lZ+gaw88xNqUN/QRTlKTqBbIQBx6mYUOYTI/A7saP3exEUIHXTD8zXX
SWSyg8/M4ZPUtasN4hFHXnXa6CxL3ky/nWceLhsCgYEAy6QA4n0frBTz5n25Ub2C
yN3jDWC+Rpar7mBS1Er6EroUW/yKLSwrAWSXO6shpnJ2bfLmz0tFE1EKT2GM6wkP
QSx4B1It9uGO86uOsxFsAYSt9Gpvv4Lb9PyjKVcoEv9zLBIzIQA4Qe3tof0kUUGc
qBbMFMr+ZxvU4LwmYJWq8l8CgYEAkzCh4XFA3DK5lMpZtMldnjAuRJn5ZyYxeaAQ
M+/PpFn+q/QoIwfldEfXt8yPQQeDbHjrGB4KQ94QtJtIJ31OBDY6Tl0gtun3kZ9Z
NjLHQPwviU5F1sLKdFfEBFVewUtBhOikcXfUCbm/Nkq0u+UaQFV3TbSKBGADbdwp
GLmJS58CgYEAqdszjAZce3FIJg1QcMNyeB0sSUtmOh29qPkYLftQz8SUTko26dy/
wTBUvLbA5HpdiwBYKpwSkoOT87NZiP+Du3xfydpdT84eWqooIsNVABzUZHkNfZKb
fU2LWoIlBW13o2izZv83fQzdz9xtQ0p/N9XD00SwTy6j+y00bLhnudw=
-----END RSA PRIVATE KEY-----
',

    'public_key' => '-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGep8KUtZ5esZH9QLCnV
A+eQ8bMfTTm0ta8QlIdeU2g6qxOm3LgdcI5Cu0lhAP3htmAW0zfFwsECNvMjJtdh
7imE/EmrhxQaYxfyTyFRT8AirivF5GbV+pfyxVDzsfIV0/GuWtXFMOHpuUROEHvX
hfCbfpAQZYmk8RrR40DaVF4XZwhJ7nWZd3aUKFowHDHlykNO5t3DKGSD8rQ7QEAM
OVy6T3mcVsIiDgsVUP5dsS6upxJGG+UG2LnQrHbhU6QGO+PA3QTq+yImWSWc3Zwc
xc43al2dP71GgUABeWYqAZ+DCWXEGTor3Na+usvy3Vq4wvGaX68hMG7C+cHGK4gE
EQIDAQAB
-----END PUBLIC KEY-----
',

];
$settings['db'] = [
    'driver' => 'mysql',
    'host' => 'localhost',
    'username' => 'root',
    'database' => 'kncs_db',
    'password' => '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'flags' => [
        // Turn off persistent connections
        PDO::ATTR_PERSISTENT => false,
        // Enable exceptions
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // Emulate prepared statements
        PDO::ATTR_EMULATE_PREPARES => true,
        // Set default fetch mode to array
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        // Set character set
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
    ],
];

return $settings;