<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use Cart;
class MailController extends Controller
{
    public function basic_email(Request $res) {
     $to_name = $res->fname;
     $to_email = $res->mail;
     $items = Cart::getContent();
     $pathToFile='/Users/admin/clothes-webshop/clothes-shop/public/images/coverSlogan.png';
     $data = array('Username'=>'Delila','body'=>'Your order has been placed! Thank you for shopping with us!');
     $data1= array(
      'cartcontent' => Cart::getContent(),
      'total'=> Cart::getTotal(),
      'name'=> $to_name,
     );
     Mail::send('emails.mail', $data1, function($message) use ($to_name, $to_email) {
     $message->to($to_email, $to_name)
     ->subject('Order placed- DH Online Store ');
     //$message->attach('/Users/admin/clothes-webshop/clothes-shop/public/images/coverSlogan.png');
     $message->from('delila.md@gmail.com','Order placed- DH Online Store ');
     });

     }
   }
     
