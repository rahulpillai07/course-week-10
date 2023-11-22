import { connect } from "@/dbConfig/dbConfig";
import { Course } from "@/models/course";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

connect();

const zodData = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  isPublished: z.boolean(),
  image: z.string(),
});

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const parsedBody=zodData.safeParse(reqBody);
  if(parsedBody.success){
    const{title, description, price, isPublished,image} = parsedBody.data;
    const newCourse=  new Course({
        title: title,
        description: description,
        price: price,
        isPublished: isPublished,
        image: image
    });
    await newCourse.save();
    console.log('course created successfully');
    return NextResponse.json(newCourse);
  }
  else{
    return NextResponse.json(parsedBody.error);
  }
}
