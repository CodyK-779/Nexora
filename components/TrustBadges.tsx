import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

export function TrustBadges() {
  return (
    <section className="py-12">
      <div className="max-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <Truck className="min-[375px]:size-8 size-7 text-green-600 mx-auto mb-2" />
            <p className="min-[375px]:text-base text-sm font-semibold">
              Free Shipping
            </p>
            <p className="min-[375px]:text-sm text-xs font-medium text-neutral-500 dark:text-neutral-400">
              On orders over $50
            </p>
          </div>
          <div>
            <Shield className="min-[375px]:size-8 size-7 text-blue-600 mx-auto mb-2" />
            <p className="min-[375px]:text-base text-sm font-semibold">
              Secure Payment
            </p>
            <p className="min-[375px]:text-sm text-xs font-medium text-neutral-500 dark:text-neutral-400">
              100% protected
            </p>
          </div>
          <div>
            <RefreshCw className="min-[375px]:size-8 size-7 text-purple-600 mx-auto mb-2" />
            <p className="min-[375px]:text-base text-sm font-semibold">
              Easy Returns
            </p>
            <p className="min-[375px]:text-sm text-xs font-medium text-neutral-500 dark:text-neutral-400">
              30-day policy
            </p>
          </div>
          <div>
            <Headphones className="min-[375px]:size-8 size-7 text-orange-600 mx-auto mb-2" />
            <p className="min-[375px]:text-base text-sm font-semibold">
              24/7 Support
            </p>
            <p className="min-[375px]:text-sm text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Always here to help
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
