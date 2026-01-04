import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const product = await Product.create(body);

    // 🔥 THIS IS THE IMPORTANT LINE
    revalidatePath("/dashboard/products");

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
