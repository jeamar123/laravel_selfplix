<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\User;
use App\Selfie;
use App\Follows;
use App\Likes;

class SelfieController extends Controller
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

  public function getWeeklyRankings( ){
    $data = array();
    $rank_list = Selfie::join('users', 'selfies.user_id', '=', 'users.id')
                          ->select('users.username', 'users.image as user_image', 'selfies.*')
                          ->orderBy('likes')->get();

    for( $x = 0; $x < count($rank_list); $x++ ){
      $rank_list[$x]['ranking'] = $x + 1; 
    }

    if( $rank_list ){
      $data['rankings'] = $rank_list;
      $data['status'] = true;
      $data['message'] = "Success.";
    } else {
      $data['status'] = false;
      $data['message'] = "Failed.";
    }

    return $data;
  }

  public function getUserFeed( $id ){
    $data = array();
    $check_follows = Follows::where('user_id', '=', $id)
                              ->where('status', '=', true)
                              ->get();

    $all_selfie = Selfie::join('users', 'selfies.user_id', '=', 'users.id')
                            ->select('users.username', 'users.image as user_image', 'selfies.*')
                            ->get();

    for( $x = 0; $x < count($all_selfie); $x++ ){
      if( $all_selfie[$x]->user_id == $id ){
        $check_like = Likes::where('user_id', '=', $id)->where('selfie_id', '=', $all_selfie[$x]->id)->count();
        $all_selfie[$x]['isLiked'] = $check_like == 0 ? false : true;
        array_push($data, $all_selfie[$x]);
      }
      for( $y = 0; $y < count($check_follows); $y++ ){
        if( $all_selfie[$x]->user_id == $check_follows[$y]->friend_id ){
          $check_like = Likes::where('user_id', '=', $id)->where('selfie_id', '=', $all_selfie[$x]->id)->count();
          $all_selfie[$x]['isLiked'] = $check_like == 0 ? false : true;
          array_push($data, $all_selfie[$x]);
        }
      }
    }

    usort( $data, function ($item1, $item2) {
      return $item2['created_at'] <=> $item1['created_at'];
    });

    return $data;
  }

  public function getUserSelfies( Request $request ){
    $data = array();
    $data = Selfie::where('user_id', '=', $request->get('user_id'))->orderBy( 'created_at', 'desc')->get();

    for( $x = 0; $x < count($data); $x++ ){
      $check_like = Likes::where('user_id', '=', $request->get('session_id'))->where('selfie_id', '=', $data[$x]->id)->count();
      $data[$x]['isLiked'] = $check_like == 0 ? false : true;
      $rank_list = Selfie::orderBy('likes')->get();
      for( $y = 0; $y < count($rank_list); $y++ ){
        if( $rank_list[$y]->user_id == $request->get('user_id') ){
          $data[$x]['rank'] = $y+1;
        } 
      }
    }

    return $data;
  }

  public function addSelfie( Request $request ){
    $data = array();

    if($request->hasFile('file')) {
      $rules = array(
        'file' => 'required | mimes:jpeg,jpg,png',
      );

      $validator = \Validator::make($request->all(), $rules);

      if($validator->fails()) {
        return array('status' => false, 'message' => 'Invalid file.');
      }

      $file = $request->file('file');

      $image = \Cloudinary\Uploader::upload($file->getPathName());

      $create = Selfie::create([
                  'user_id' => $request->get('user_id'),
                  'image' => $image['secure_url'],
                  'caption' => $request->get('caption'),
                ]);

      if( $create ) {
        User::where('id', '=', $request->get('user_id'))->increment('posts', 1);

        $data['status'] = true;
        $data['message'] = "Success.";
      } else {
        $data['status'] = false;
        $data['message'] = "Failed.";
      }
    } else {
      $data['status'] = false;
      $data['message'] = "No file selected.";
    }

    return $data;
  }

  public function likeSelfie( Request $request ){
    $data = array();

    $post = $request->get('post');

    $create_like = Likes::create([
                    'user_id' => $request->get('user_id'),
                    'selfie_id' => $post['id'],
                  ]);

    if($create_like) {
      Selfie::where('id', '=', $post['id'])->increment('likes', 1);
      if( $request->get('user_id') != $post['user_id'] ){
        User::where('id', '=', $post['user_id'])->increment('points', 3);
      }

      $data['status'] = true;
      $data['message'] = 'Success.';
    } else {
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }

    return $data;
  }

  public function unlikeSelfie( Request $request ){
    $data = array();

    $post = $request->get('post');

    $delete_like = Likes::where('user_id', '=', $request->get('user_id'))
                          ->where('selfie_id', '=', $post['id'])
                          ->delete();

    if($delete_like) {
      Selfie::where('id', '=', $post['id'])->decrement('likes', 1);
      if( $request->get('user_id') != $post['user_id'] ){
        User::where('id', '=', $post['user_id'])->decrement('points', 3);
      }

      $data['status'] = true;
      $data['message'] = 'Success.';
    } else {
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }

    return $data;
  }

  public function deleteUserSelfie( $id, $user_id ){
    $data = array();

    if(Selfie::where('id', '=', $id)->delete()) {
      User::where('id', '=', $user_id)->decrement('posts', 1);

      $data['status'] = true;
      $data['message'] = 'Success.';
    } else {
      $data['status'] = false;
      $data['message'] = 'Failed.';
    }

    return $data;
  }


}