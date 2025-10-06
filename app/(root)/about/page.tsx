import {
  firstStoryCards,
  secondStoryCards,
  stats,
  teamMembers,
  valuesData,
} from "@/components/AboutUsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-950 mt-[68px] -mb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white sm:py-20 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-container text-center">
          <Badge
            textSize="text-[11px]"
            variant="secondary"
            className="min-[450px]:mb-6 mb-4 bg-white/20 text-white border-none"
          >
            About Nexora
          </Badge>
          <h1 className="md:text-6xl min-[450px]:text-4xl min-[360px]:text-3xl text-2xl font-semibold mb-6 leading-tight">
            We're Revolutionizing
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent pb-2">
              Online Shopping
            </span>
          </h1>
          <p className="md:text-xl min-[450px]:text-lg min-[375px]:text-base min-[337px]:text-sm text-xs text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed md:-mt-2 -mt-4">
            Delivering exceptional quality products with an unmatched customer
            experience. Join millions of satisfied customers worldwide.
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="sm:large-btn max-[375px]:small-btn">
              <Link href="/shop" className="flex items-center">
                <p className="font-semibold">Shop Now</p>
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              className="sm:large-btn max-[375px]:small-btn bg-white dark:bg-black text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-900"
            >
              <Link
                href="https://youtu.be/dQw4w9WgXcQ?si=cNq7K4Z40XF7lM7M"
                className="flex items-center gap-2"
              >
                <Play />
                <p className="font-semibold">Watch Our Story</p>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-100 dark:bg-gray-900">
        <div className="max-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.stat} className="space-y-2">
                <div
                  className={`md:text-4xl min-[375px]:text-3xl text-2xl font-bold ${s.textColor}`}
                >
                  {s.stat}
                </div>
                <div className="min-[375px]:text-base min-[325px]:text-sm text-xs text-gray-600 dark:text-gray-400">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 ">
        <div className="max-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="min-[450px]:space-y-6 space-y-4">
              <Badge
                textSize="text-[11px]"
                variant="outline"
                className="text-blue-600 border-blue-200"
              >
                Our Journey
              </Badge>
              <h2 className="md:text-4xl min-[450px]:text-3xl min-[375px]:text-2xl text-xl font-semibold text-gray-900 dark:text-white">
                From Garage Startup to Global Marketplace
              </h2>
              <p className="min-[450px]:text-lg min-[375px]:text-base text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Founded in 2024, we started with a simple mission: to make
                online shopping accessible, reliable, and delightful for
                everyone. What began as a small team in a garage has grown into
                a global platform serving millions of customers worldwide.
              </p>
              <p className="min-[450px]:text-lg min-[375px]:text-base text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, we continue to innovate and push boundaries, always
                putting our customers first and striving to create the best
                shopping experience possible.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="min-[400px]:size-5 size-4 text-green-500" />
                  <span className="min-[400px]:text-base text-sm text-gray-700 dark:text-gray-300">
                    Quality Guaranteed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="min-[400px]:size-5 size-4 text-green-500" />
                  <span className="min-[400px]:text-base text-sm text-gray-700 dark:text-gray-300">
                    Fast Shipping
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="min-[400px]:size-5 size-4 text-green-500" />
                  <span className="min-[400px]:text-base text-sm text-gray-700 dark:text-gray-300">
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {firstStoryCards.map((f) => (
                    <div
                      key={f.title}
                      className={`aspect-square rounded-2xl ${f.cardColor} flex items-center justify-center p-4`}
                    >
                      <div className="text-center">
                        {f.icon}
                        <div
                          className={`font-semibold min-[350px]:text-base text-sm ${f.titleColor}`}
                        >
                          {f.title}
                        </div>
                        <div
                          className={`min-[350px]:text-sm text-xs ${f.descColor} mt-2`}
                        >
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 mt-8">
                  {secondStoryCards.map((s) => (
                    <div
                      key={s.title}
                      className={`aspect-square rounded-2xl ${s.cardColor} flex items-center justify-center p-4`}
                    >
                      <div className="text-center">
                        {s.icon}
                        <div
                          className={`font-semibold min-[350px]:text-base text-sm ${s.titleColor}`}
                        >
                          {s.title}
                        </div>
                        <div
                          className={`min-[350px]:text-sm text-xs ${s.descColor} mt-2`}
                        >
                          {s.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-100 dark:bg-gray-900">
        <div className="max-container">
          <div className="text-center min-[350px]:mb-14 mb-10">
            <Badge
              textSize="text-[11px]"
              variant="outline"
              className="text-purple-600 border-purple-200 mb-4"
            >
              Our Values
            </Badge>
            <h2 className="md:text-4xl sm:text-3xl min-[330px]:text-2xl text-xl font-semibold text-gray-900 dark:text-white mb-2">
              What Drives Us Forward
            </h2>
            <p className="font-medium sm:text-xl min-[450px]:text-lg min-[350px]:text-base text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our core values shape everything we do, from product selection to
              customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 md:gap-8 gap-6">
            {valuesData.map((value) => (
              <Card
                key={value.title}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`min-[400px]:size-16 size-14 ${value.iconColor} rounded-full flex items-center justify-center mx-auto min-[400px]:mb-6 mb-4`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white min-[400px]:mb-4 mb-2">
                    {value.title}
                  </h3>
                  <p className="min-[375px]:text-base text-sm font-medium text-gray-600 dark:text-gray-400">
                    {value.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-container">
          <div className="text-center min-[400px]:mb-16 mb-12">
            <Badge
              textSize="text-[11px]"
              variant="outline"
              className="text-yellow-600 border-yellow-200 mb-4"
            >
              Meet the Team
            </Badge>
            <h2 className="md:text-4xl min-[400px]:text-3xl text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              The People Behind Your Shopping Experience
            </h2>
            <p className="sm:text-xl min-[450px]:text-lg min-[400px]:text-base text-sm font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate individuals working together to make your shopping
              journey exceptional.
            </p>
          </div>

          <div className="grid min-[500px]:grid-cols-2 lg:grid-cols-4 lg:gap-8 sm:gap-5 min-[500px]:gap-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-neutral-50 dark:bg-gray-900"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative sm:size-32 size-[100px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <Image src={member.image} alt="Ceo Avatar" fill />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="md:text-4xl min-[450px]:text-3xl min-[350px]:text-2xl text-xl  font-semibold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="sm:text-xl min-[350px]:text-base text-sm font-medium text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers and discover why we're the
            trusted choice for online shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              asChild
              className="min-[400px]:large-btn max-[350px]:small-btn bg-white text-blue-600 hover:bg-neutral-100 px-8"
            >
              <Link href="/shop">Start Shopping</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="min-[400px]:large-btn max-[350px]:small-btn border-white bg-neutral-950 text-white hover:text-white hover:bg-neutral-800 px-8"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
