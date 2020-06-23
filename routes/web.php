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
Route::get('product', function(){ return App\Clothes::with('Category') ->get(); });
//Route::get('product', function(){ return App\Clothes::all(); });
Route:: get('category', function(){
        return  \App\Category::all();   
});

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
