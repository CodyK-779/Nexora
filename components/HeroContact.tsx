import { Badge } from "./ui/badge";

const HeroContact = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16 lg:py-24">
      <div className="max-container text-center">
        <Badge
          textSize="text-[11px]"
          variant="secondary"
          className="min-[450px]:mb-6 mb-4 bg-white/20 text-white border-none"
        >
          We're Here to Help
        </Badge>
        <h1 className="md:text-6xl min-[400px]:text-5xl min-[350px]:text-4xl text-3xl font-semibold min-[400px]:mb-6 mb-4">
          Get in Touch
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            With Us
          </span>
        </h1>
        <p className="md:text-2xl sm:text-xl min-[400px]:text-lg min-[350px]:text-base text-sm text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>
    </section>
  );
};

export default HeroContact;
