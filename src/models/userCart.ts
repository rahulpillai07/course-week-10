    import mongoose from "mongoose";

    const userCourseSchema= new mongoose.Schema({
        userCartId:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        },
        purchasedCourse:{
            type:mongoose.Types.ObjectId,
            ref:'Course'
        }
    });

    export const UserCourse=mongoose.models.usercourses|| mongoose.model('UserCourse',userCourseSchema);