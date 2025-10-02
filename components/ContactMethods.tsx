import { contactMethods } from "./ContactUsData";
import { Card, CardContent } from "./ui/card";

const ContactMethods = () => {
  return (
    <section className="py-14 bg-neutral-100 dark:bg-gray-900">
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-14 h-14 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  {method.details}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
