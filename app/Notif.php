<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notif extends Model
{
  protected $table = 'notifs';
	protected $fillable = [
		'user_id',
		'notification',
		'selfie_id',
		'follow_id',
		'from_user_id',
		'status',
  ];
}
