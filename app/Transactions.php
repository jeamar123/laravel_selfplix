<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
  protected $table = 'transactions';
	protected $fillable = [
		'user_id',
		'name',
		'phone',
		'account_number',
		'amount',
		'payment_option',
		'status',
  ];
}
