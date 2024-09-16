"use server";

import { prisma } from "../lib/db";
import { ItemSchema } from "../lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

export async function createItem(prevState, formData) {
  const submission = parseWithZod(formData, {
    schema: ItemSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );
  const dimensions = submission.value.dimensions
    ? {
        length: submission.value.dimensions.length,
        width: submission.value.dimensions.width,
        height: submission.value.dimensions.height,
        unit: submission.value.dimensions.unit,
      }
    : undefined;

  try {
    await prisma.item.create({
      data: {
        type: submission.value.type,
        name: submission.value.name,
        sku: submission.value.sku,
        unit: submission.value.unit,
        returnable: submission.value.returnable === true,
        dimensions: dimensions,
        weight: submission.value.weight,
        weightUnit: submission.value.weightUnit,
        manufacturer: submission.value.manufacturer,
        brand: submission.value.brand,
        sellingPrice: parseFloat(submission.value.sellingPrice),
        salesAccount: submission.value.salesAccount,
        salesDescription: submission.value.salesDescription,
        salesTax: submission.value.salesTax,
        costPrice: parseFloat(submission.value.costPrice),
        purchaseAccount: submission.value.purchaseAccount,
        purchaseDescription: submission.value.purchaseDescription,
        purchaseTax: submission.value.purchaseTax,
        preferredVendor: submission.value.preferredVendor,
        images: flattenUrls,
      },
    });
  } catch (error) {
    console.error("Failed to create item:", error);
    return { error: `Failed to create item: ${error.message}` };
  }

  revalidatePath("/dashboard/inventory/");
  redirect("/dashboard/inventory/");
}



export async function updateItem(prevState, formData) {
  const submission = parseWithZod(formData, {
    schema: ItemSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const itemId = formData.get("ItemId");
  if (!itemId) {
    return { error: "Item ID is missing" };
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const dimensions = submission.value.dimensions
    ? {
        length: submission.value.dimensions.length,
        width: submission.value.dimensions.width,
        height: submission.value.dimensions.height,
        unit: submission.value.dimensions.unit,
      }
    : undefined;

  try {
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        type: submission.value.type,
        name: submission.value.name,
        sku: submission.value.sku,
        unit: submission.value.unit,
        returnable: submission.value.returnable === true,
        dimensions: dimensions,
        weight: submission.value.weight,
        weightUnit: submission.value.weightUnit,
        manufacturer: submission.value.manufacturer,
        brand: submission.value.brand,
        sellingPrice: parseFloat(submission.value.sellingPrice),
        salesAccount: submission.value.salesAccount,
        salesDescription: submission.value.salesDescription,
        salesTax: submission.value.salesTax,
        costPrice: parseFloat(submission.value.costPrice),
        purchaseAccount: submission.value.purchaseAccount,
        purchaseDescription: submission.value.purchaseDescription,
        purchaseTax: submission.value.purchaseTax,
        preferredVendor: submission.value.preferredVendor,
        images: flattenUrls,
      },
    });
  } catch (error) {
    console.error("Failed to update item:", error);
    return { error: `Failed to update item: ${error.message}` };
  }

  revalidatePath("/dashboard/inventory/");
  redirect("/dashboard/inventory/");
}