import { NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/products';
import { createOrder } from '@/lib/orders';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerDetails, items } = body;

    if (!customerDetails || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    // Fetch latest products from DB (bypassing admin flag so we can see all stock, but wait, we should pass admin=true to ensure we can read even if something is weird, but actually we only want to allow buying 'active' items).
    // So we fetch active items:
    const activeProducts = await getProducts(undefined, false);

    let subtotal = 0;
    const orderItems = [];

    // Validate stock and price
    for (const item of items) {
      const product = activeProducts.find(p => p.id === item.productId);
      
      if (!product) {
        return NextResponse.json({ error: `Product ${item.name} is no longer available.` }, { status: 400 });
      }

      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for ${product.name}. Only ${product.stock} available.` }, { status: 400 });
      }

      const price = product.offerPrice || product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        productId: product.id,
        name: product.name,
        price: price,
        quantity: item.quantity
      });
    }

    // Calculate shipping (Free over 10000, else 200)
    const shipping = subtotal >= 10000 ? 0 : 200;
    const total = subtotal + shipping;

    // Create Order
    const orderResult = await createOrder({
      customerDetails,
      items: orderItems,
      subtotal,
      shipping,
      total
    });

    if (!orderResult.success) {
      throw new Error("Failed to create order");
    }

    // Deduct Stock
    // To deduct stock, we need to save the product. We must fetch the product again with admin=true to ensure we don't accidentally wipe out draft status or something, though `saveProduct` uses `getProducts(undefined, true)` internally, so we just pass the modified product.
    // Wait, we need to pass the FULL product object to `saveProduct`. `activeProducts` has the full product.
    for (const item of orderItems) {
      const product = activeProducts.find(p => p.id === item.productId);
      if (product) {
        product.stock -= item.quantity;
        if (product.stock === 0) {
          product.status = 'out_of_stock';
        }
        await saveProduct(product);
      }
    }

    return NextResponse.json({ success: true, orderId: orderResult.orderId });

  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Internal server error during checkout" }, { status: 500 });
  }
}
