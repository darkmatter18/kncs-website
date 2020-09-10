<?php

use App\Action\Admin\School\Classes\CreateClassAction;
use App\Action\Admin\School\Classes\DeleteClassAction;
use App\Action\Admin\School\Classes\GetClassesAction;
use App\Action\Admin\School\Classes\UpdateClassAction;
use App\Action\Admin\School\Subject\CreateSubjectAction;
use App\Action\Admin\School\Subject\DeleteSubjectAction;
use App\Action\Admin\School\Subject\GetSubjectAction;
use App\Action\Admin\School\Subject\UpdateSubjectAction;
use App\Action\Admission\GetProgress\GetAcademicInfo;
use App\Action\Admission\GetProgress\GetDeclaration;
use App\Action\Admission\GetProgress\GetPaymentInfo;
use App\Action\Admission\GetProgress\GetPersonalInfo;
use App\Action\Admission\PreRegistrationAction;
use App\Action\Admission\PreRegistrationLoginAction;
use App\Action\Admission\SetProgress\SetAcademicInfo;
use App\Action\Admission\SetProgress\SetDeclaration;
use App\Action\Admission\SetProgress\SetPaymentInfo;
use App\Action\Admission\SetProgress\SetPersonalInfo;
use App\Action\DummyAuth;
use App\Action\Home\HomeAction;
use App\Action\LoginAction;
use App\Action\UserCreateAction;
use App\Middleware\JwtAuthMiddleware;
use App\Middleware\ReCaptchaValidateMiddleware;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;


return function (App $app) {

    /**
     * Dummy Routes
     */
    $app->get('/', HomeAction::class)->setName('home');
    $app->post('/users', UserCreateAction::class);
    $app->post('/token', DummyAuth::class);

    /**
     * Dummy API endpoints. This group is protected with JWT.
     * For Protected routes. To get the claims
     * $request->getAttribute('JwtClaims')
     */
    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->post('/users', UserCreateAction::class);
    })->add(JwtAuthMiddleware::class);

    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    //Login Route
    $app->post('/login', LoginAction::class);//->add(ReCaptchaValidateMiddleware::class);

    //Admin route
    $app->group('/admin', function (RouteCollectorProxy $group){
        $group->group('/school/class', function (RouteCollectorProxy $classGroup){
            $classGroup->get('', GetClassesAction::class );
            $classGroup->post('', CreateClassAction::class);
            $classGroup->put('/{class_id}', UpdateClassAction::class);
            $classGroup->delete('/{class_id}', DeleteClassAction::class);
        });
        $group->group('/school/subject', function (RouteCollectorProxy $classGroup){
            $classGroup->get('', GetSubjectAction::class );
            $classGroup->post('', CreateSubjectAction::class);
            $classGroup->put('/{subject_id}', UpdateSubjectAction::class);
            $classGroup->delete('/{subject_id}', DeleteSubjectAction::class);
        });
        $group->group('/admission', function (RouteCollectorProxy $admissionGroup){

        });
    })->add(JwtAuthMiddleware::class);

    //Admission Routes - preregistration is now admission
    $app->group('/admission', function (RouteCollectorProxy  $admissionGroup){
        $admissionGroup->post('', PreRegistrationAction::class);
        $admissionGroup->post('/login', PreRegistrationLoginAction::class);

        $admissionGroup->group('/progress', function (RouteCollectorProxy $admissionProgressGroup){
            $admissionProgressGroup->group('/personal_info', function (RouteCollectorProxy $personalInfoGroup){
                $personalInfoGroup->get('', GetPersonalInfo::class);
                $personalInfoGroup->post('', SetPersonalInfo::class);
            });
            $admissionProgressGroup->group('/academic_info', function (RouteCollectorProxy $academicInfoGroup){
                $academicInfoGroup->get('', GetAcademicInfo::class);
                $academicInfoGroup->post('', SetAcademicInfo::class);
            });
            $admissionProgressGroup->group('/payment_info', function (RouteCollectorProxy $paymentInfoGroup){
                $paymentInfoGroup->get('', GetPaymentInfo::class);
                $paymentInfoGroup->post('', SetPaymentInfo::class);
            });
            $admissionProgressGroup->group('/declaration', function (RouteCollectorProxy $declarationGroup){
                $declarationGroup->get('', GetDeclaration::class);
                $declarationGroup->post('', SetDeclaration::class);
            });
        })->add(JwtAuthMiddleware::class);
    });
};
