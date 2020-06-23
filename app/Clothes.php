<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clothes extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        'id', 'item','description','price','imgZoom','stock', 'category_id','clothes_id'
    ];
    

public function category()
{
    return $this->belongsTo('App\Category', 'category_id' );
}

}
