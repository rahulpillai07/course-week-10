import { connect } from "@/dbConfig/dbConfig";
import { Admin } from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

connect();

const parsedbody = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const validatedData = parsedbody.safeParse(reqBody);
    console.log(validatedData);
  
    if (validatedData.success) {
      const { email, password } = validatedData.data;

      const existingadmin = await Admin.findOne({ email: email });

      if (existingadmin) {
        return NextResponse.json({ message: "admin already exists" }, { status: 400 });
      } else {
        const newadmin = new Admin({
          email: email,
          password: password,
        });

        await newadmin.save();
        console.log("New admin saved successfully");

        return NextResponse.json({ message: "admin created successfully" }, { status: 200 });
      }
    } else {
      // Return a response when validation fails
      return NextResponse.json({ message: "Invalid input data", errors: validatedData.error }, { status: 400 });
    }
  } catch (err) {
    // Handle unexpected errors
    console.error("Error:", err);

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
