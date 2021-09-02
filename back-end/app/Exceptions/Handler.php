<?php

namespace App\Exceptions;

use App\Entities\Exceptions\EntityException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        EntityException::class
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
                return response()->json([
                    'message' => 'Record not found.'
                ], 404);

        });

        $this->renderable(function (EntityException $e, $request) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        });

        $this->renderable(function(Throwable $e) {
            return response()->json([
                'message' => 'An unexpected error happened, please try again later.'
            ], 500);
        });
    }
}
