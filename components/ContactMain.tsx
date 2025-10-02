"use client";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  HeadphonesIcon,
  CheckCircle2,
  Send,
  Clock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { faqs } from "./ContactUsData";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactMain = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    form.reset();
  };

  return (
    <section className="py-16">
      <div className="max-container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-xl dark:bg-gray-900">
              <CardHeader className="pb-4">
                <CardTitle className="min-[450px]:text-2xl min-[350px]:text-xl text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <HeadphonesIcon className="min-[450px]:size-6 size-5 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <p className="min-[450px]:text-base min-[328px]:text-sm text-xs font-medium text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="sm:text-base text-sm font-medium text-gray-600 dark:text-gray-400">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="min-[450px]:h-12 h-10 min-[450px]:text-base text-sm dark:border-neutral-600"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john@example.com"
                                  {...field}
                                  className="min-[450px]:h-12 h-10 min-[450px]:text-base text-sm dark:border-neutral-600"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How can we help you?"
                                {...field}
                                className="min-[450px]:h-12 h-10 min-[450px]:text-base text-sm dark:border-neutral-600"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your inquiry in detail..."
                                {...field}
                                className="min-h-32 min-[450px]:text-base text-sm resize-none dark:border-neutral-600"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full min-[375px]:large-btn bg-blue-600 hover:bg-blue-700"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Office Hours */}
            <Card className="border-0 shadow-lg dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="min-[400px]:text-base min-[350px]:text-sm text-xs font-medium text-gray-600 dark:text-gray-400">
                    Monday - Friday
                  </span>
                  <span className="min-[400px]:text-base min-[350px]:text-sm text-xs font-semibold text-gray-900 dark:text-white">
                    8:00 AM - 8:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="min-[400px]:text-base min-[350px]:text-sm text-xs font-medium text-gray-600 dark:text-gray-400">
                    Saturday
                  </span>
                  <span className="min-[400px]:text-base min-[350px]:text-sm text-xs font-semibold text-gray-900 dark:text-white">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="min-[400px]:text-base min-[350px]:text-sm text-xs font-medium text-gray-600 dark:text-gray-400">
                    Sunday
                  </span>
                  <span className="min-[400px]:text-base min-[350px]:text-sm text-xs font-semibold text-gray-900 dark:text-white">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="border-0 shadow-lg dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    className="border-b border-gray-200 dark:border-gray-700 py-4 cursor-pointer w-full"
                    key={faq.id}
                    onClick={() =>
                      setOpenIndex(openIndex === faq.id ? null : faq.id)
                    }
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="min-[450px]:text-base pr-2 text-sm font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`${
                          openIndex === faq.id ? "rotate-180" : ""
                        } min-[450px]:size-[18px] size-4  transition-all duration-500 ease-in-out`}
                      />
                    </div>
                    <p
                      className={`min-[450px]:text-sm text-xs text-gray-600 dark:text-gray-400 transition-all duration-500 ease-in-out  ${
                        openIndex === faq.id
                          ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                          : "opacity-0 max-h-0 -translate-y-2"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                ))}
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  View all FAQs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Support Note */}
            <Card className="border-0 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="py-6 min-[400px]:px-6 px-4">
                <div className="flex items-start gap-3">
                  <HeadphonesIcon className="min-[400px]:min-w-5 min-w-4 text-blue-600 " />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Need Immediate Help?
                    </h4>
                    <p className="min-[375px]:text-sm text-xs text-blue-700 dark:text-blue-300">
                      Our live chat support is available 24/7 for urgent
                      inquiries. Click the chat button in the bottom right
                      corner to get instant help.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;
