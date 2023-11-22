import mongoose from "mongoose";
import { NextResponse } from "next/server";

let alreadyConnected = false;

export async function connect() {
  if (alreadyConnected) {
    return;
  } else {
    try {
      await connection();
    } catch {
      console.log("error connecting to the database");
      return NextResponse.json("error connecting to the database");
    }
  }
}

async function connection() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("connection established");
    alreadyConnected = true;
  } catch {
    console.log("error connecting to the database");
    return;
  }
}
