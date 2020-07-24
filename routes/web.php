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
Route::get('/', function () {
    // Test database connection
  /* try {
        DB::connection()->getPdo();
        echo "Connected successfully to: " . DB::connection()->getDatabaseName();
       
    } catch (\Exception $e) {
        die("Could not connect to the database. Please check your configuration. error:" . $e );
    }*/
    return view('welcome');
});
Route::get('product', function(){ return App\Clothes::with('Category') ->get(); });
//Route::get('product', function(){ return App\Clothes::all(); });
Route:: get('category', function(){
        return  \App\Category::all();   
});



Route::post('show', 'CartController@show');  
Route::post('showCat', 'CartController@showCategory');  
Route:: get ('category/{category}','CartController@show');
Route:: post ('add','CartController@add');
Route:: post ('update','CartController@updateCart');
Route::post('remove','CartController@remove');
Route::get ('total','CartController@getTotal');
Route::get('subtotal','CartController@getSubTotal');
Route::post('updateStock','CartController@update');
Route:: get ('cart','CartController@getCart');
Route:: get('clear','CartController@clearCart');
Route:: post('shipping','CartController@shipping');
Route:: post('storeCustomer','CustomerController@store');
Route::post('sendbasicemail','MailController@basic_email');

