<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\User;
use App\Selfie;
use App\Notif;

class NotificationsController extends Controller
{
  /**
   * Show the profile for the given user.
   *
   * @param  int  $id
   * @return Response
   */

  public function getAllNotif( ){
    $data = array();
    $notifications = Notif::orderBy('created_at')->get();

    if( $notifications ){
        $data['status'] = true;
        $data['notifications'] = $notifications;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
  
    return $data;
  }

  public function getNotifByUser( $id ){
    $data = array();
    $notifications = Notif::where('user_id', $id)->orderBy('created_at','desc')->get();



    for( $x = 0; $x < count( $notifications ); $x++ ){
      $friend_data = User::where('id', $notifications[$x]->from_user_id )->get();
      $notifications[$x]['friend_data'] = $friend_data[0];
    }

    if( $notifications ){
        $data['status'] = true;
        $data['notifications'] = $notifications;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
    
    return $data;
  }

  public function addNotif( Request $request ){
    $data = array();

    $create = Notif::create([
                  'user_id' => $request->get('user_id'),
                  'notification' => $request->get('notification'),
                ]);

    User::where('id', '=', $request->get('user_id'))->decrement('points', $request->get('amount'));

    if( $create ){
        $data['status'] = true;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
    
    return $data;
  }

  public function updateNotif( $id ){

    $update_data = array( 
      'status' => true
    );

    $update = Notif::where('id', '=', $id)->update( $update_data );

    if( $update ){
        $data['status'] = true;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
    
    return $data;
  }

}