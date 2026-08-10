"use server";

import fs from 'fs/promises';
import path from 'path';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: string;
}

const getOrdersFilePath = () => {
  return path.join(process.cwd(), 'src', 'data', 'orders.json');
};

export async function getOrders(): Promise<Order[]> {
  try {
    const data = await fs.readFile(getOrdersFilePath(), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read orders:", error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id) || null;
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const orders = await getOrders();
    
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    await fs.writeFile(getOrdersFilePath(), JSON.stringify(orders, null, 2));
    
    return { success: true, orderId: newOrder.id };
  } catch (error: any) {
    console.error("Failed to save order:", error);
    return { success: false, error: error.message };
  }
}
