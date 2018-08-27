<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\Admin;

class AuthAdminController extends Controller
{
  /**
   * Show the profile for the given user.
   *
   * @param  int  $id
   * @return Response
   */
  public function login( Request $request ){
    $data = array();

    $count = Admin::where('email', '=', $request->get('email'))
                ->where('password', '=', $request->get('password') )->count();

    if($count > 0) {
      // $fetch = Admin::where('email', '=', $request->get('email'))->get();
      // $data['user'] = $fetch[0];
      $data['status'] = true;
      $data['message'] = 'Success.';
    }else{
      $data['status'] = false;
      $data['message'] = 'Account does not exist.';
    }

    return $data;
  }

}