<?php

use App\Action\Admin\School\Classes\CreateClassAction;
use App\Action\Admin\School\Classes\DeleteClassAction;
use App\Action\Admin\School\Classes\GetClassesAction;
use App\Action\Admin\School\Classes\UpdateClassAction;
use App\Action\Admin\School\Student\CreateStudentAction;
use App\Action\Admin\School\Student\DeleteStudentAction;
use App\Action\Admin\School\Student\GetStudentAction;
use App\Action\Admin\School\Student\UpdateStudentAction;
use App\Action\Admin\School\Subject\CreateSubjectAction;
use App\Action\Admin\School\Subject\DeleteSubjectAction;
use App\Action\Admin\School\Subject\GetSubjectAction;
use App\Action\Admin\School\Subject\UpdateSubjectAction;
use App\Action\Admin\School\Teacher\CreateTeacherAction;
use App\Action\Admin\School\Teacher\DeleteTeacherAction;
use App\Action\Admin\School\Teacher\GetTeacherAction;
use App\Action\Admin\School\Teacher\UpdateTeacherAction;
use App\Action\Admission\GetProgress\GetAcademicInfo;
use App\Action\Admission\GetProgress\GetDeclaration;
use App\Action\Admission\GetProgress\GetPaymentInfo;
use App\Action\Admission\GetProgress\GetPersonalInfo;
use App\Action\Admission\PreRegistrationAction;
use App\Action\Admission\PreRegistrationLoginAction;
use App\Action\Admission\SetProgress\ImageUploadAction;
use App\Action\Admission\SetProgress\SetAcademicInfo;
use App\Action\Admission\SetProgress\SetDeclaration;
use App\Action\Admission\SetProgress\SetPaymentInfo;
use App\Action\Admission\SetProgress\SetPersonalInfo;
use App\Action\DummyAuth;
use App\Action\ImageRetrieveAction;
use App\Action\GetSettingAction;
use App\Action\Home\HomeAction;
use App\Action\ImageU;
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
    $app->post('/imageu', ImageU::class);

    /**
     * Dummy API endpoints. This group is protected with JWT.
     * For Protected routes. To get the claims
     * $request->getAttribute('JwtClaims')
     */
    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->post('/users', UserCreateAction::class);
    })->add(JwtAuthMiddleware::class);

    /*
     * Option route
     */
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });

    /*
     * Website settings route
     */
    $app->get('/settings', GetSettingAction::class);

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
        $group->group('/school/subject', function (RouteCollectorProxy $subjectGroup){
            $subjectGroup->get('', GetSubjectAction::class );
            $subjectGroup->post('', CreateSubjectAction::class);
            $subjectGroup->put('/{subject_id}', UpdateSubjectAction::class);
            $subjectGroup->delete('/{subject_id}', DeleteSubjectAction::class);
        });
        $group->group('/school/student', function (RouteCollectorProxy $studentGroup){
            $studentGroup->get('', GetStudentAction::class );
            $studentGroup->post('', CreateStudentAction::class);
            $studentGroup->put('/{student_id}', UpdateStudentAction::class);
            $studentGroup->delete('/{student_id}', DeleteStudentAction::class);
        });
        $group->group('/school/teacher', function (RouteCollectorProxy $teacherGroup){
            $teacherGroup->get('', GetTeacherAction::class );
            $teacherGroup->post('', CreateTeacherAction::class);
            $teacherGroup->put('/{teacher_id}', UpdateTeacherAction::class);
            $teacherGroup->delete('/{teacher_id}', DeleteTeacherAction::class);
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
                $personalInfoGroup->get('/image', ImageUploadAction::class);
                $personalInfoGroup->post('/image', ImageUploadAction::class);
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

    $app->get('/f/i/{file_name:.+}', ImageRetrieveAction::class);
};
