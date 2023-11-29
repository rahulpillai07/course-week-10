import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AuthUser = async (req:NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token,process.env.SECRET!);
    if (extractAuthUserInfo) {
      const userId=extractAuthUserInfo.id
      const user =await User.findById(userId);
      if(user){
        req.user=user;
        console.log("User",user);
        return user
      }

    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default AuthUser;