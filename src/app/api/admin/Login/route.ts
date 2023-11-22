import { connect } from "@/dbConfig/dbConfig";
import { Admin } from "@/models/admin";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

connect();

const parsedBody = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const validatedData = parsedBody.safeParse(reqBody);
    console.log(validatedData);
  
    if (validatedData.success) {
      const { email, password } = validatedData.data;

      const checkadmin = await Admin.findOne({ email: email });

      if (checkadmin) {
        // admin found, check the password
        if (checkadmin.password === password) {
          console.log('admin successfully logged in');
          return NextResponse.json({ message: "admin successfully logged in" }, { status: 200 });
        } else {
          return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }
      } else {
        // admin not found
        return NextResponse.json({ message: "admin not found" }, { status: 404 });
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
