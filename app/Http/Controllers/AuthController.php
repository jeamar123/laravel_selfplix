<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\User;
use App\Follows;
use App\Likes;

class AuthController extends Controller
{
  /**
   * Show the profile for the given user.
   *
   * @param  int  $id
   * @return Response
   */
  public function login( Request $request ){
    $data = array();

    $count = User::where('email', '=', $request->get('email'))
                ->where('password', '=', md5($request->get('password')) )
                ->where('reg_type', '=', 0)
                ->count();

    if($count > 0) {
      $fetch = User::where('email', '=', $request->get('email'))->get();
      $data['user'] = $fetch[0];
      $data['status'] = true;
      $data['message'] = 'Success.';
    }else{
      $data['status'] = false;
      $data['message'] = 'Account does not exist.';
    }

    return $data;
  }

  public function register( Request $request ){
    $data = array();
    $count = User::where('email', '=', $request->get('email'))->where('reg_type', '=', 0)->count();
    $count2 = User::where('username', '=', $request->get('username'))->count();

    if( $request->get('referral') || $request->get('referral') != '' ){
      $check_referral = User::where('referral_code', '=', $request->get('referral'))->count();

      if( $check_referral == 0 ){
        $data['status'] = false;
        $data['message'] = 'Invalid Referral code.';
        return $data;
      }
    }

    if($count > 0) {
      $data['status'] = false;
      $data['message'] = 'Email already taken.';
      return $data;
    }

    if($count2 > 0) {
      $data['status'] = false;
      $data['message'] = 'Username already taken.';
      return $data;
    }

    $create = User::create([
                'name' => $request->get('name'),
                'username' => $request->get('username'),
                'email' => $request->get('email'),
                'password' => md5($request->get('password')),
                'points' => 50,
                'reg_type' => 0,
              ]);

    if( $create ){
        $get_user = User::where('email', '=', $request->get('email') )->where('reg_type', '=', 0 )->get();

        if( $request->get('referral') || $request->get('referral') != '' ){
          User::where('referral_code', '=', $request->get('referral'))->increment('points', 30);
          User::where('referral_code', '=', $request->get('referral'))->increment('referrals', 1);

          $update_code = array( 'referred' => true );
          $add_referral = User::where('id', '=', $get_user->id)->update( $update_code );
        }

        $this->generateCode( $get_user[0]->id );
        $this->generateFollows();

        $data['status'] = true;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }

    return $data;
  }

  public function loginGoogle( Request $request ){
    $data = array();

    // $count_manual = User::where('email', '=', $request->get('email') )->where('reg_type', '=', 0 )->count();

    // if( $count_manual > 0 ){
    //   $data['status'] = false;
    //   $data['message'] = 'Error logging in with your google account. The same email is already used by another user.';

    //   return $data;
    // }

    $count_google = User::where('email', '=', $request->get('email') )->where('reg_type', '=', 2 )->count();

    if( $count_google > 0 ){
      $get_user = User::where('email', '=', $request->get('email') )->where('reg_type', '=', 2 )->get();

      $data['status'] = true;
      $data['message'] = 'Success';
      $data['user_id'] = $get_user[0]->id;

      return $data;
    }

    $create = User::create([
                'image' => $request->get('image'),
                'name' => $request->get('name'),
                'username' => $request->get('username'),
                'email' => $request->get('email'),
                'password' => md5( 'okmijnuhb' ),
                'points' => 50,
                'reg_type' => 2,
              ]);

    if( $create ){
        $get_user = User::where('email', '=', $request->get('email') )->where('reg_type', '=', 2 )->get();

        $this->generateCode( $get_user[0]->id );
        $this->generateFollows();

        $data['status'] = true;
        $data['message'] = 'Success';
        $data['user_id'] = $get_user[0]->id;
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }

    return $data;
  }

  public function addReferralCode( $id , $code ){
    $data = array();

    $check_referral = User::where('referral_code', '=', $code)->count();

    if( $check_referral == 0 ){
      $data['status'] = false;
      $data['message'] = 'Invalid Referral code.';
      return $data;
    }

    User::where('referral_code', '=', $code)->increment('points', 30);
    User::where('referral_code', '=', $code)->increment('referrals', 1);

    $update_code = array( 'referred' => true );
    $add_referral = User::where('id', '=', $id)->update( $update_code );

    if( $add_referral ){
        $data['status'] = true;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }

    return $data;
  }

  public function generateCode( $id ){
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $code_generated = '';
    $code_trap = false;
    while( $code_trap == false ){
      for ($i = 0; $i < 6; $i++){
        $code_generated .= $characters[mt_rand(0, 61)];
      }
      $code_count = User::where('referral_code', '=', $code_generated)->count();
      if( $code_count == 0 ){
        $code_trap = true;
        $update_code = array( 'referral_code' => $code_generated );
        User::where('id', '=', $id)->update( $update_code );
      }
    }
  }

  public function generateFollows(){
    $all_users = User::orderBy('name', 'asc')->get();
    for( $x = 0; $x < count($all_users); $x++ ){
      for( $y = 0; $y < count($all_users); $y++ ){
        if( $all_users[$x]->id != $all_users[$y]->id ){
          $check = Follows::where('user_id', '=', $all_users[$x]->id )->where('friend_id', '=', $all_users[$y]->id )->count();
          
          if( $check == 0 ){
            $contact = Follows::create([
              'user_id' => $all_users[$x]->id,
              'friend_id' => $all_users[$y]->id,
              'status' => false,
            ]);
          }
        }
      }
    }
  }

}