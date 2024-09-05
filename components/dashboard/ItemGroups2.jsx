import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Shirt, Box, ListChecks } from "lucide-react";
import Image from "next/image";

const InventoryManagementPage = () => {
  const sections = [
    {
      title: "Item groups",
      description:
        "Create multiple variants of the same item using Item Groups",
      icon: (
        <div className="flex">
          <Image src="/svgexport-39.svg"
          width={80}
          height={80} />
        </div>
      ),
      buttonText: "New Item Group",
    },
    {
      title: "Items",
      description: "Create standalone items and services that you buy and sell",
      icon: (
        <div className="flex">
          <Image src="/svgexport-40.svg"
          width={80}
          height={80} />
        </div>
      ),
      buttonText: "New Item",
    },
    {
      title: "Composite Items",
      description: "Bundle different items together and sell them as kits",
      icon: (
        <div className="flex">
          <Image src="/svgexport-41.svg"
          width={80}
          height={80} />
        </div>
      ),
      buttonText: "New Composite Item",
    },
    {
      title: "Price Lists",
      description:
        "Tweak your item prices for specific contacts or transactions",
        icon: (
            <div className="flex">
              <Image src="/svgexport-42.svg"
              width={80}
              height={80} />
            </div>
          ),
      buttonText: "New Price List",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className=" flex justify-center">
              <CardTitle className="text-lg font-semibold ">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between items-center text-center">
              <div className="mb-4">{section.icon}</div>
              <p className="text-sm text-gray-600 mb-4">
                {section.description}
              </p>
              <Button variant="blue">{section.buttonText}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagementPage;
