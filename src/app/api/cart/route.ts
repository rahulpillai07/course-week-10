import { connect } from "@/dbConfig/dbConfig";
import AuthUser from "@/middleware/auth";
import { Cart } from "@/models/userCart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();
const ObjectId = mongoose.Types.ObjectId;

export async function GET(request:NextRequest){
  
    const isAuthUser=await AuthUser(request);

    if(isAuthUser){
        const cart=await Cart.find({userCartId:new ObjectId(isAuthUser)});
        if(cart.length>0){
            const newCart = new Cart({
                userCartId: '655f62110b67feb75e5a9b8a',
                purchasedCourse: ['655cb163d5b7e94590f49c46', '6564582be20ddf2425c993b6']
              });
              await newCart.save();
              console.log(newCart);
            return NextResponse.json(cart);
        }
        else{
            return NextResponse.json({message:'No Cart found'},{status:404});
        }

    }
    else{
        return NextResponse.json({message:'verification error'},{status:404});
    }


   

    
}