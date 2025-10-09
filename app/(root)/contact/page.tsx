import HeroContact from "@/components/HeroContact";
import ContactMethods from "@/components/ContactMethods";
import ContactMain from "@/components/ContactMain";
import ContactMap from "@/components/ContactMap";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 mt-[68px]">
      {/* Hero Section */}
      <HeroContact />

      {/* Contact Methods */}
      <ContactMethods />

      {/* Main Content */}
      <ContactMain />

      {/* Map Section */}
      <ContactMap />
    </div>
  );
}
