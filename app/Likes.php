<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Likes extends Model
{
  protected $table = 'likes';
	protected $fillable = [
		'user_id',
		'selfie_id',
  ];
}
