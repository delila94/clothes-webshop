<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clothes_properties extends Model
{
    //
    protected $fillable = [
        'clothesID','id','category_id','size', 'color',
    ];
}
