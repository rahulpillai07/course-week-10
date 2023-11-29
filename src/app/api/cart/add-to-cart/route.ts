import { connect } from "@/dbConfig/dbConfig";
import AuthUser from "@/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request:NextRequest, response:NextResponse){
    const isAuthUser=await AuthUser(request);
    if(isAuthUser.role==AuthUser){
        
    }
    else{
        return NextResponse.json('error');
    }

    
}