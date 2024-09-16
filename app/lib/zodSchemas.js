import { z } from "zod";

export const ItemSchema = z.object({
  type: z.enum(["Goods", "Service"]),
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, 'SKU is required'),
  unit: z.string().min(1, "Unit is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),

  returnable: z.boolean(),
  dimensions: z
    .object({
      length: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      unit: z.enum(["cm", "in"]).optional(),
    })
    .optional(),
  weight: z.number().optional(),
  weightUnit: z.enum(["kg", "g", "lb", "oz"]).optional(),
  manufacturer: z.string().optional(),
  brand: z.string().optional(),
  sellingPrice: z.number().min(0, "Selling price must be non-negative"),
  salesAccount: z.string(),
  salesDescription: z.string().optional(),
  salesTax: z.string().optional(),
  costPrice: z.number().min(0, "Cost price must be non-negative"),
  purchaseAccount: z.string(),
  purchaseDescription: z.string().optional(),
  purchaseTax: z.string().optional(),
  preferredVendor: z.string().optional(),
});
