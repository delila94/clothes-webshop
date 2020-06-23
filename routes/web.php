<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*Route:: get('add',function () {
    // add the product to cart
Cart::add([
    'id' => 1,
    'name' => 'shirt',
    'price' => 9.99,
    'quantity' => 1,
    'attributes' => array('size' => 'L',
    'color' => 'blue')
]);
return Cart::getContent();

});
Route:: get('cart',function () {
return Cart::getContent();

});*/
Route::get('product', function(){ return App\Clothes::with('Category') ->get(); });
//Route::get('product', function(){ return App\Clothes::all(); });
Route:: get('category', function(){
        return  \App\Category::all();
    
});
/*Route:: get('show',function (Request $res) {
$id=$res->id;
    $product = App\Clothes::find($id);
        return response()->json($product);
    
    });*/
  Route::post('show', 'cartController@show');  
  Route::post('showCat', 'cartController@showCategory');  
Route:: get ('category/{category}','cartController@show');
Route:: post ('add','cartController@add');
Route:: post ('update','cartController@updateCart');
Route::post('remove','cartController@remove');
Route::get ('total','cartController@getTotal');
Route::get('subtotal','cartController@getSubTotal');
Route::post('updateStock','cartController@update');
Route:: get ('cart','cartController@getCart');
Route:: get('clear','cartController@clearCart');
Route::get('/', function () {
    return view('welcome');
});
