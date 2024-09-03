import Link from "next/link";

export default function Home() {
  return (
<div className="flex items-center justify-center w-full  min-h-screen">
<h2 className="text-3xl">
Inventory  Management Software
</h2>
<Link href="/dashboard/home/inventory-overview" className="text-3xl text-red-500">inventory</Link>
</div>
);
}
