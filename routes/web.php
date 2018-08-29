<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@getLandingView');
Route::get('/contact', 'HomeController@getContactView');
Route::get('/about-us', 'HomeController@getAboutView');


Route::get('/admin', 'HomeController@getAdminView');
Route::get('/app', 'HomeController@getHomeView');
