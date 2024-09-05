"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils"

// Defining a simple set of default styles for the label using a utility function
const labelVariants = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

// Label component definition
const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants, className)} // Combine default classes with any additional ones passed in
      {...rest}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName; // Ensure the displayName for easier debugging

export { Label };
