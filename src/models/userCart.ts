    import mongoose from "mongoose";

    const CartSchema= new mongoose.Schema({
        userCartId:{
            type:mongoose.Types.ObjectId,
            ref:'User',
            unique:true,
            sparse:true,
        },
        purchasedCourse:[{
            type:mongoose.Types.ObjectId,
            ref:'Course'
        }]
    });

    export const Cart=mongoose.models.Cart|| mongoose.model('Cart',CartSchema);