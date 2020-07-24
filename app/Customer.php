<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'id', 'fname','lname','address','city','country', 'zip','email','phone_number','mail'
    ];
    public function customers()
{
    return $this->hasMany('App\Customer', 'customer_id' );
}
}
