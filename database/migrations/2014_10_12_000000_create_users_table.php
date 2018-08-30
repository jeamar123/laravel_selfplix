<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image')->default('../img/user-blue.png');
            $table->string('name');
            $table->string('username');
            $table->string('email');
            $table->string('password');
            $table->integer('posts')->default(0);
            $table->integer('points')->default(0);
            $table->integer('followers')->default(0);
            $table->integer('following')->default(0);
            $table->string('referral_code')->nullable();
            $table->integer('referrals')->default(0);
            $table->integer('reg_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
