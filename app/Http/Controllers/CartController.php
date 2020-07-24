<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Cart;
use App\Clothes;
use App\Clothes_properties;
use App\Category;
use App\Customer;
use App\Order;

class CartController extends Controller
{
    //
    public function add (Request $res)
    { 
        $id=$res->id;
        $prod=Clothes::find($id);
        $qty=$res->qty;
         //add items to cart
        Cart::add([
            'id' => $id,
            'name' => $prod->item,
            'price' => $prod->price,
            'quantity' => $qty,
            'attributes' => array(
            'size' => $res->oneSize,
            'img'=>$prod->imgZoom,
            'stock'=>$prod->stock,
            )
        ]);
      //  Cart::condition($condition);
        return Cart::getContent();

    }
    public function getCart(){
        $content=Cart::getContent();
        // $cartCollection=$content->count();  //for counting items without quantity 
        $cartTotalQuantity = Cart::getTotalQuantity();
        return array('content' => $content,'counter' => $cartTotalQuantity);
     //return array($content,$cartCollection); //get the content of cart

    }
    public function clearCart(){
        Cart::clear();
        
    }
    public function updateCart (Request $res) {
        $id=$res->id;
        $qty=$res->qty;
        Cart::update($id,[
            'quantity' => $qty,
           
        ]);
        $content=Cart::getContent();
       // $cartCollection=$content->count();  //for counting items without quantity
        $cartTotalQuantity = Cart::getTotalQuantity();
        return array('content' => $content,'counter' => $cartTotalQuantity);
    }
    
    public function show(Request $res)
    {
            $id=$res->id; //get the id of specific product from request and find the product among clothes
                $product = Clothes::find($id);
               // $size=Clothes_attribute::find($product->clothes_id);
               $size=Clothes_properties::where('id', $id)->get(); //here you can acces to whole table of properties size, color
                   // collect all items with specific id if there is more same products with different size all will be collected
                   return array('product' => $product,'size' => $size);
    }
    
    public function showCategory (Request $res){
        $id=$res->id; //get the id of specific category find all clothes with that category_id
        $cat=Category::find($id);
        $prod = Clothes::where('category_id', $id)->get();
        return $prod;
        

    }
    public function shipping(Request $res){
        $shipping=$res->shipping;
        $condition = new \Darryldecode\Cart\CartCondition(array(
            'name' => 'Shipping',
            'type' => 'shipping',
             'target' => 'total', // this condition will be applied to cart's subtotal when getSubTotal() is called.
              'value' => $shipping,
        )
    );

        Cart::condition($condition);
    }
    public function remove(Request $request)
    {
        $id=$request->id;
        $remove=Cart::remove($id);
        if($remove) {
            $content=Cart::getContent();
            $cartTotalQuantity = Cart::getTotalQuantity();
            return array('content' => $content,'counter' => $cartTotalQuantity);
        }
    }
    public function getTotal(){
        return Cart::getTotal();

    } 
    public function getSubTotal() { // get whole subtotal cart and getsubtotal on one item qty*price
  
        $subTotal=Cart::getSubTotal();
        return  $subTotal;
        

    }
    
    public function update(Request $request) //update stock in database, transfer id of product and new value
    {
        $id=$request->id;
        $product = Clothes::find($id);
        $product->stock = $request->stock;
         $product->save();
         return response()->json('Product Updated Successfully.');
      
    }

}
