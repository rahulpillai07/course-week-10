import AuthUser from "@/middleware/auth";
import { Course } from "@/models/course";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(request: NextRequest) {
  const validUser = await AuthUser(request);
  if (validUser) {
    const newDetails = await request.json();
    const { _id, title, description, price, isPublished, image } = newDetails;
    const newProduct = await Course.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        title: title,
        description: description,
        price: price,
        isPublished: isPublished,
        image: image,
      }
    );
    return NextResponse.json({ message: newProduct }, { status: 200 });
  } 
  else {
    return NextResponse.json({ message: "invalid user" }, { status: 404 });
  }
}
