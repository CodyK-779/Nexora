import { dots } from "./ContactUsData";
import { Card, CardContent } from "./ui/card";
import WorldMap from "./ui/world-map";

const ContactMap = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center sm:mb-12 min-[375px]:mb-10 mb-8">
          <h2 className="sm:text-3xl min-[425px]:text-2xl text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Visit Our Headquarters
          </h2>
          <p className="sm:text-xl min-[425px]:text-lg min-[350px]:text-base text-sm font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our global footprint spans continents, delivering worldwide
          </p>
        </div>

        <Card className="border shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <WorldMap dots={dots} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactMap;
