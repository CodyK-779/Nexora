"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Truck, ShieldCheck } from "lucide-react";

const GPT = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-blue-500">Nexora</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            At Nexora, we’re redefining online shopping by offering high-quality
            products at unbeatable prices. We believe shopping should be simple,
            enjoyable, and trustworthy — every time.
          </p>
          <Button className="mt-6">Shop Now</Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/about-hero.jpg"
            alt="About Nexora"
            width={600}
            height={500}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="text-lg text-muted-foreground">
          We aim to connect people with products that inspire confidence,
          creativity, and comfort. From trendy fashion to must-have tech, our
          mission is to deliver convenience and quality right to your doorstep.
        </p>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl shadow-md bg-card hover:shadow-lg transition">
          <Heart className="w-10 h-10 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold">Customer First</h3>
          <p className="mt-2 text-muted-foreground">
            We put our customers at the heart of everything we do.
          </p>
        </div>
        <div className="p-6 rounded-xl shadow-md bg-card hover:shadow-lg transition">
          <Truck className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold">Fast Delivery</h3>
          <p className="mt-2 text-muted-foreground">
            Reliable shipping so you get your products quickly and safely.
          </p>
        </div>
        <div className="p-6 rounded-xl shadow-md bg-card hover:shadow-lg transition">
          <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold">Trusted Quality</h3>
          <p className="mt-2 text-muted-foreground">
            Every product goes through strict quality checks.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <Image
          src="/about-story.jpg"
          alt="Our Story"
          width={600}
          height={450}
          className="rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nexora started with a simple idea: make online shopping effortless
            and exciting. What began as a small team with a big dream has grown
            into a thriving community of satisfied shoppers. Our story is about
            passion, innovation, and dedication.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Join Our Journey</h2>
        <p className="text-muted-foreground">
          Be part of the Nexora family. Discover new products, enjoy great
          deals, and shop with confidence.
        </p>
        <Button size="lg">Start Shopping</Button>
      </div>
    </section>
  );
};

export default GPT;
