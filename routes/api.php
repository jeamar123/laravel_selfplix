<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'AuthController@login');
Route::post('/signup', 'AuthController@register');

Route::get('/get_user_info/{id}', 'UserController@getUserDetails');
Route::post('/get_search_user_info', 'UserController@getSearchUserDetails');
Route::post('/update_user', 'UserController@updateUser');
Route::post('/search_user', 'UserController@searchUser');
Route::post('/follow_unfollow_user', 'UserController@followUnfollowUser');

Route::post('/add_selfie', 'SelfieController@addSelfie');
Route::post('/delete_selfie/{id}', 'SelfieController@deleteSelfie');
Route::post('/like_selfie', 'SelfieController@likeSelfie');
Route::post('/unlike_selfie', 'SelfieController@unlikeSelfie');
Route::post('/get_posts', 'SelfieController@getUserSelfies');
Route::get('/delete_post/{id}/{user_id}', 'SelfieController@deleteUserSelfie');
Route::get('/get_feed/{id}', 'SelfieController@getUserFeed');

Route::get('/get_all_rankings', 'SelfieController@getWeeklyRankings');

Route::get('/get_transactions_user/{id}', 'TransactionsController@getTransactionByUser');
Route::post('/add_transaction', 'TransactionsController@addTransaction');
Route::post('/update_transaction', 'TransactionsController@updateTransaction');




Route::post('/admin/login', 'AuthAdminController@login');
Route::get('/admin/get_transactions', 'TransactionsController@getAllTransaction');
