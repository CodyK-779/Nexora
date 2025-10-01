import { Shield, Truck, Headphones, RefreshCw, Heart } from "lucide-react";

export const teamMembers = [
  {
    name: "Cody",
    role: "CEO & Founder",
    image: "/ceo.jpg",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Operations",
    image: "/team-2.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Product Director",
    image: "/team-3.jpg",
  },
  {
    name: "David Kim",
    role: "Technology Lead",
    image: "/team-4.jpg",
  },
];

export const stats = [
  {
    stat: "10M+",
    desc: "Happy Customers",
    textColor: "text-blue-600",
  },
  {
    stat: "100+",
    desc: "Countries Served",
    textColor: "text-purple-600",
  },
  {
    stat: "50K+",
    desc: "Products Available",
    textColor: "text-yellow-500",
  },
  {
    stat: "24/7",
    desc: "Customer Support",
    textColor: "text-green-500",
  },
];

export const firstStoryCards = [
  {
    icon: (
      <Shield className="min-[400px]:size-12 min-[350px]:size-10 size-8 text-blue-600 mx-auto mb-3" />
    ),
    cardColor:
      "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800",
    title: "Quality First",
    titleColor: "text-blue-900 dark:text-blue-100",
    desc: "Every product verified",
    descColor: "text-blue-700 dark:text-blue-300",
  },
  {
    icon: (
      <Truck className="min-[400px]:size-12 min-[350px]:size-10 size-8 text-purple-600 mx-auto mb-3" />
    ),
    cardColor:
      "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800",
    title: "Fast Delivery",
    titleColor: "text-purple-900 dark:text-purple-100",
    desc: "2-day shipping guaranteed",
    descColor: "text-purple-700 dark:text-purple-300",
  },
];

export const secondStoryCards = [
  {
    icon: (
      <Headphones className="min-[400px]:size-12 min-[350px]:size-10 size-8 text-yellow-600 mx-auto mb-3" />
    ),
    cardColor:
      "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800",
    title: "24/7 Support",
    titleColor: "text-yellow-900 dark:text-yellow-100",
    desc: "Always here to help",
    descColor: "text-yellow-700 dark:text-yellow-300",
  },
  {
    icon: (
      <RefreshCw className="min-[400px]:size-12 min-[350px]:size-10 size-8 text-green-600 mx-auto mb-3" />
    ),
    cardColor:
      "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800",
    title: "Easy Returns",
    titleColor: "text-green-900 dark:text-green-100",
    desc: "30-day money back",
    descColor: "text-green-700 dark:text-green-300",
  },
];

export const valuesData = [
  {
    icon: <Heart className="min-[400px]:size-8 size-6 text-blue-600" />,
    iconColor: "bg-blue-100 dark:bg-blue-900",
    title: "Customer First",
    desc: "Every decision we make starts with our customers' needs and happiness.",
  },
  {
    icon: <Shield className="min-[400px]:size-8 size-6 text-green-600" />,
    iconColor: "bg-green-100 dark:bg-green-900",
    title: "Trust & Quality",
    desc: "We stand behind every product and ensure the highest quality standards.",
  },
  {
    icon: <Truck className="min-[400px]:size-8 size-6 text-purple-600" />,
    iconColor: "bg-purple-100 dark:bg-purple-900",
    title: "Innovation",
    desc: "Constantly evolving to bring you the latest trends and shopping technologies.",
  },
];
