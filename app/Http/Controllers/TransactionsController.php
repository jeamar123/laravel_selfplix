<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DateTime;

use App\User;
use App\Transactions;

class TransactionsController extends Controller
{
  /**
   * Show the profile for the given user.
   *
   * @param  int  $id
   * @return Response
   */

  public function getAllTransaction( ){
    $data = array();
    $transactions = Transactions::orderBy('created_at')->get();

    if( $transactions ){
        $data['status'] = true;
        $data['transactions'] = $transactions;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
  
    return $data;
  }

  public function getTransactionByUser( $id ){
    $data = array();
    $transactions = Transactions::where('user_id', $id)->get();

    if( $transactions ){
        $data['status'] = true;
        $data['transactions'] = $transactions;
        $data['message'] = 'Success.';
    } else {
        $data['status'] = false;
        $data['message'] = 'Failed.';
    }
    
    return $data;
  }

  public function addTransaction( Request $request ){
    $data = array();

    $create = Transactions::create([
                  'user_id' => $request->get('user_id'),
                  'name' => $request->get('name'),
                  'phone' => $request->get('phone'),
                  'account_number' => $request->get('account_number'),
                  'amount' => $request->get('amount'),
                  'payment_option' => $request->get('payment_option'),
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

  public function updateTransaction( Request $request ){
    $data = array();

    $create = Transactions::create([
                  'user_id' => $request->get('user_id'),
                  'name' => $request->get('name'),
                  'phone' => $request->get('phone'),
                  'account_number' => $request->get('account_number'),
                  'amount' => $request->get('amount'),
                  'payment_option' => $request->get('payment_option'),
                ]);

    $update_data = array( 
      // 'name' => $request->get('name'),
      // 'phone' => $request->get('phone'),
      // 'account_number' => $request->get('account_number'),
      // 'amount' => $request->get('amount'),
      // 'payment_option' => $request->get('payment_option'),
      'status' => $request->get('status')
    );

    $update = Transactions::where('id', '=', $request->get('id'))->update( $update_data );

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