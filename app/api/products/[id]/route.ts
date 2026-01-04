import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/Product";
import { connectDB } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ IMPORTANT: await params
    const { id } = await context.params;

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


