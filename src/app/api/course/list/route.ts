import { connect } from "@/dbConfig/dbConfig";
import { Course } from "@/models/course";
import { NextRequest, NextResponse } from "next/server";

export async function GET(requset:NextRequest, response:NextResponse){
    const getCourses=await Course.find({});
    return NextResponse.json(getCourses);
}