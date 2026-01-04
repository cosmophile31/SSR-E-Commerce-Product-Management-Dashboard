import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function DELETE(
  _req: any,
  context: any
) {
  try {
    await connectDB();

    const id = context?.params?.id;
    if (!id) {
      return NextResponse.json(
        { error: "Missing product id" },
        { status: 400 }
      );
    }

    await Product.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  _req: any,
  context: any
) {
  try {
    const body = await _req.json();
    const { id } = context.params;

    await connectDB();

    await Product.findByIdAndUpdate(id, body);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

