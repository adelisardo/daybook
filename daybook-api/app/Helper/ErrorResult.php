<?php

namespace App\Helper;

use Illuminate\Validation\ValidationException;

class ErrorResult
{
    public $errorType;
    public $errorCode;
    public $message;
    public $inputValidations;

    public static function CustomError($code, $message)
    {
        $result = new ErrorResult();
        $result->errorType = ErrorType::CUSTOM;
        $result->errorCode = $code;
        $result->message = $message;
        return response(json_encode($result), 400);
    }

    public static function Exception($ex)
    {
        $result = new ErrorResult();
        $result->errorType = ErrorType::EXCEPTION;
        $result->errorCode = 100;
        $result->message = "An unhandled fault has occurred while processing the flow. Please contact your system administrator for more information.";
        return response(json_encode($result), 400);
    }

    public static function InputValidation(ValidationException $exception)
    {
        $result = new ErrorResult();
        $result->errorType = ErrorType::INPUT_VALIDATION;
        $result->message = 'Please correct the highlighted errors and try again.';
        $result->errorCode = 101;
        $result->inputValidations = $exception->errors();
        return response(json_encode($result), 400);
    }

    public static function NoAuthenticated()
    {
        return ErrorResult::CustomError(102, 'No Authenticated.');
    }

    public static function UnAuthorizedAccess()
    {
        return ErrorResult::CustomError(103, 'No Authorized.');
    }

    public static function NotFound()
    {
        return ErrorResult::CustomError(201, 'The requested information was not found.');
    }

    public static function LoginFailed()
    {
        return ErrorResult::CustomError(202, 'The username or password is incorrect.');
    }
}
