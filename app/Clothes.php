<?php

namespace App;
use Cart;
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
public static function updateStock(){

    $items = Cart::getContent(); //load cart
    foreach($items as $row) {
     //important NOTE:id in cart is the same id in database
     echo $row->id;
     $product = Clothes::find($row->id); //find product in database using id from cart
     $product->stock = $row->attributes['stock']-$row->quantity; //update stock in clothes database
     $product->save(); //save product
     return $product; //return updated product
    }
}

}
