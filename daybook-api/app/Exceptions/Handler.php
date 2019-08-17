<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\ExceptionLog;
use App\Helper\ErrorResult;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ValidationException) {
            return ErrorResult::InputValidation($exception);
        } else {
            $user = \Auth::user();

            $obj = new ExceptionLog();
            $obj->user_ip = $request->ip();
            $obj->user_agent = $request->header('User-Agent');
            $obj->user_id = $user ? $user->id : null;
            $obj->request_url = $request->getRequestUri();
            $obj->request_method = $request->method();
            $obj->request_headers = json_encode($request->headers->all());
            $obj->request_body = $request->getContent();
            $obj->exception = json_encode([
                'exception' => get_class($exception),
                'message' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            $obj->save();

            if (env('APP_DEBUG', false) == true) {
                return parent::render($request, $exception);
            } else {
                return ErrorResult::Exception($exception);
            }
        }
    }
}
