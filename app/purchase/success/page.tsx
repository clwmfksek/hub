import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PurchaseSuccessPage() {
  return (
    <div className="pt-24 bg-sandy-beige min-h-screen">
      <div className="container px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Thank you!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been processed (mock).
        </p>
        <Button asChild className="bg-sage-green hover:bg-sage-green-600">
          <Link href="/stacks">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
