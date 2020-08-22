<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit72ca20da5447cc40a483f130852dfcc9
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Firebase\\JWT\\BeforeValidException' => __DIR__ . '/..' . '/firebase/php-jwt/src/BeforeValidException.php',
        'Firebase\\JWT\\ExpiredException' => __DIR__ . '/..' . '/firebase/php-jwt/src/ExpiredException.php',
        'Firebase\\JWT\\JWK' => __DIR__ . '/..' . '/firebase/php-jwt/src/JWK.php',
        'Firebase\\JWT\\JWT' => __DIR__ . '/..' . '/firebase/php-jwt/src/JWT.php',
        'Firebase\\JWT\\SignatureInvalidException' => __DIR__ . '/..' . '/firebase/php-jwt/src/SignatureInvalidException.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit72ca20da5447cc40a483f130852dfcc9::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit72ca20da5447cc40a483f130852dfcc9::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit72ca20da5447cc40a483f130852dfcc9::$classMap;

        }, null, ClassLoader::class);
    }
}
