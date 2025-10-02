import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    description: "We'll respond quickly",
    details: "support@nexora.com",
    action: "mailto:support@nexora.com",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    description: "Mon-Fri from 8am to 5pm",
    details: "+1 (555) 123-4567",
    action: "tel:+15551234567",
    color: "bg-green-50 dark:bg-green-900/20 text-green-600",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Live Chat",
    description: "24/7 customer support",
    details: "Start chatting now",
    action: "#chat",
    color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Visit Us",
    description: "Visit our office",
    details: "View on Google Maps",
    action: "https://maps.google.com",
    color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600",
  },
];

export const faqs = [
  {
    id: 1,
    question: "How long does shipping usually take?",
    answer:
      "At Nexora, most orders are processed within 1–2 business days. Standard shipping typically takes 3–7 business days depending on your location, while express options are available at checkout.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, PayPal, and secure digital wallets. For select regions, we also support cash-on-delivery and installment payments.",
  },
  {
    id: 3,
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you’ll receive a confirmation email with a tracking link. You can also log in to your Nexora account and track your order from the “My Orders” section.",
  },
  {
    id: 4,
    question: "Are the products on Nexora authentic?",
    answer:
      "Once your order is shipped, you’ll receive a confirmation email with a tracking link. You can also log in to your Nexora account and track your order from the “My Orders” section.",
  },
];

export const dots = [
  {
    start: {
      lat: 64.2008,
      lng: -149.4937,
    },
    end: {
      lat: 34.0522,
      lng: -118.2437,
    },
  },
  {
    start: { lat: 64.2008, lng: -149.4937 },
    end: { lat: -15.7975, lng: -47.8919 },
  },
  {
    start: { lat: -15.7975, lng: -47.8919 },
    end: { lat: 38.7223, lng: -9.1393 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 28.6139, lng: 77.209 },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: 43.1332, lng: 131.9113 },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: -1.2921, lng: 36.8219 },
  },
];
