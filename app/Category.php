<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = [
        'id', 'name'
    ];
    public function clothes()
{
    return $this->hasMany('App\Clothes', 'category_id' );
}
}
