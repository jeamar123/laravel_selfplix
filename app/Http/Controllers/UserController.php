<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\User;
use App\Follows;
use App\Likes;
use App\Notif;

class UserController extends Controller
{
  /**
   * Show the profile for the given user.
   *
   * @param  int  $id
   * @return Response
   */

  public function __construct( ){
    \Cloudinary::config(array(
        "cloud_name" => "dwl3yrtx8",
        "api_key" => "922394114834959",
        "api_secret" => "86jWexq6wG12b1lxTo9E2pwuL6w"
    ));
  }

  public function getAllUsers( ){
    $data = array();
    $all_users = User::orderBy('created_at')->get();

    $data['status'] = true;
    $data['users'] = $all_users;
    $data['message'] = 'Success.';

    return $data;
  }

  public function getUserDetails( $id ){
    $data = array();
    $data = User::where('id', '=', $id)->get();

    return $data[0];
  }

  public function chckeUserExist( $email ){
    $data = array();

    $count = User::where('email', '=', $email)->count();

    if( $count > 0 ){
      $data['status'] = true;
      $data['message'] = 'Success.';
    }else{
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }

    return $data;
  }

  public function getSearchUserDetails( Request $request ){
    $data = array();

    $data = User::where('id', '=', $request->get('friend_id'))->get();

    $check_follow = Follows::where( 'user_id', '=', $request->get('user_id') )->where( 'friend_id', '=', $request->get('friend_id') )->get();
    if( count($check_follow) > 0 ){
      if( $check_follow[0]->status == true ){
        $data[0]['isFollowed'] = true;
      }else{
        $data[0]['isFollowed'] = false;
      }
    }

    $check_follow_back = Follows::where( 'user_id', '=', $request->get('friend_id') )->where( 'friend_id', '=', $request->get('user_id') )->get();
    if( count($check_follow_back) > 0 ){
      if( $check_follow_back[0]->status == true ){
        $data[0]['isFollowing'] = true;
      }else{
        $data[0]['isFollowing'] = false;
      }
    }

    return $data[0];
  }

  public function searchUser( Request $request ){
    $data = array();
    $search = User::where('name', 'LIKE', '%' . $request->get('search') . '%' )
              ->orWhere('username', 'LIKE', '%' . $request->get('search') . '%')
              ->get();

    if( $search ){
        $data['status'] = true;
        $data['users'] = $search;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
    
    return $data;
  }

  public function updateUser( Request $request ){
    $data = array();

    $image_update = $request->get('image');

    $fetch_user = User::where('id', '=', $request->get('id'))->get();
    $count = User::where('email', '=', $request->get('email'))->count();
    $count2 = User::where('username', '=', $request->get('username'))->count();

    if($count > 0 && $fetch_user[0]->email != $request->get('email')) {
      $data['status'] = false;
      $data['message'] = 'Email already taken.';
      return $data;
    }

    if($count2 > 0 && $fetch_user[0]->username != $request->get('username')) {
      $data['status'] = false;
      $data['message'] = 'Username already taken.';
      return $data;
    }

    if($request->hasFile('file')) {
      $rules = array(
        'file' => 'required | mimes:jpeg,jpg,png',
      );

      $validator = \Validator::make($request->all(), $rules);

      if($validator->fails()) {
        return array('status' => false, 'message' => 'Invalid file.');
      }

      $file = $request->file('file');

      $image_url = \Cloudinary\Uploader::upload($file->getPathName());

      $image_update = $image_url['secure_url'];
    }

    $update_data = array( 
      'image' => $image_update, 
      'name' => $request->get('name'), 
      'username' => $request->get('username'), 
      'email' => $request->get('email'), 
    );

    $update = User::where('id', '=', $request->get('id'))->update( $update_data );

    if( $update ){
        $user = User::where('id', '=', $request->get('id'))->get();
        $data['status'] = true;
        $data['user'] = $user[0];
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
    return $data;
  }

  public function updateImage( Request $request ){
    $data = array();
    // validate file
    if($request->hasFile('file')) {
      $rules = array(
        'file' => 'required | mimes:jpeg,jpg,png',
      );

      $validator = \Validator::make($request->all(), $rules);

      if($validator->fails()) {
        return array('status' => FALSE, 'message' => 'Invalid file.');
      }

      $file = $request->file('file');

      $image = \Cloudinary\Uploader::upload($file->getPathName());

      $result = User::where('id', '=', $request->get('id'))->update(['image' => $image['secure_url']]);

      if($result) {
        $data['status'] = true;
        $data['message'] = "Success.";
        $data['img'] = $image['secure_url'];
      } else {
        $data['status'] = false;
        $data['message'] = "Failed updating image.";
      }
    } else {
      $data['status'] = false;
      $data['message'] = "No file selected.";
    }

    return $data;
  }

  public function followUnfollowUser( Request $request ){
    $data = array();

    $follow = Follows::where( 'user_id', '=', $request->get('user_id') )
                      ->where( 'friend_id', '=', $request->get('friend_id') )
                      ->update( ['status' => $request->get('isFollow')] );

    $logged_in_user = User::where('id', '=', $request->get('user_id'))->get();

    if( $follow ){
      if( $request->get('isFollow') == true ){
        User::where('id', '=', $request->get('user_id'))->increment('following', 1);
        User::where('id', '=', $request->get('friend_id'))->increment('followers', 1);

        $check_notif = Notif::where('user_id', '=', $request->get('friend_id'))
                              ->where('follow_id', '=', $logged_in_user[0]->id)->count();

        if( $check_notif == 0 ){
          Notif::create([ 
            'user_id' => $request->get('friend_id'), 
            'notification' => "<b>" . $logged_in_user[0]->username . "</b> followed you.", 
            'follow_id' => $logged_in_user[0]->id,
            'from_user_id' => $logged_in_user[0]->id ]);
        }
      }else{
        User::where('id', '=', $request->get('user_id'))->decrement('following', 1);
        User::where('id', '=', $request->get('friend_id'))->decrement('followers', 1);
      }

      $data['status'] = true;
      $data['message'] = 'Success.';
    } else {
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }
    
    return $data;
  }

  public function getUserFollowings( $id ){
    $data = array();

    $followings = Follows::where('user_id', '=', $id)->where('status', '=', true)->get();

    if( count($followings) > 0 ){
        for( $x = 0; $x < count($followings); $x++ ){
        $get_friend = User::where('id', '=', $followings[$x]['friend_id'])->get();
        $followings[$x] = $get_friend[0];
      }
    }

    if( $followings ){
      $data['status'] = true;
      $data['message'] = 'Success.';
      $data['followings'] = $followings;
    } else {
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }
    
    return $data;
  }

  public function getUserFollowers( $id ){
    $data = array();

    $followers = Follows::where('friend_id', '=', $id)->where('status', '=', true)->get();

    if( count($followers) > 0 ){
      for( $x = 0; $x < count($followers); $x++ ){
        $get_friend = User::where('id', '=', $followers[$x]['user_id'])->get();
        $followers[$x] = $get_friend[0];
      }
    }
    

    if( $followers ){
      $data['status'] = true;
      $data['message'] = 'Success.';
      $data['followers'] = $followers;
    } else {
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }
    
    return $data;
  }

}