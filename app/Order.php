<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cart;
class Order extends Model
{
    //
    protected $fillable = [
    'item','price','qty','shipping','size','customer_id','item_id'
    ];
    public function customers()
{
    return $this->belongsTo('App\Customer', 'customer_id' );
}
public static function create_order($customer_id,$shipping)
{
 
$items = Cart::getContent();
foreach($items as $row) {

$order = new Order([
    'item' => $row->name,
    'price' => $row->price,
    'qty' => $row->quantity,
   'shipping' => $shipping,
    'customer_id'=> $customer_id,
    'item_id'=> $row->id,
    'size'=>$row->attributes['size'],
]);
$order->save();
}
}

}
