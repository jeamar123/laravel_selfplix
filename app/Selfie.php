<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Selfie extends Model
{
  protected $table = 'selfies';
	protected $fillable = [
		'user_id',
		'image',
		'caption',
		'rank',
		'likes',
		'shares',
  ];
}
