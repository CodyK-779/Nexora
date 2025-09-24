"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addNewAddress } from "@/actions/order-action";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

const AddressForm = ({ userId }: Props) => {
  const [title, setTitle] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const resetForm = () => {
    setTitle("");
    setStreet("");
    setCity("");
    setState("");
    setPostal("");
    setCountry("");
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postal.trim() ||
      !country.trim()
    ) {
      toast.error("Please fill in all input forms before submitting");
      return;
    }

    setSaving(true);

    try {
      const result = await addNewAddress(
        userId,
        title,
        street,
        city,
        state,
        postal,
        country
      );

      if (result.success) {
        toast.success("New Address Saved!");
      } else {
        console.error("Failed to add new address:", result.error);
        toast.error("Failed to add new address");
      }
    } catch (error) {
      console.error("Failed to add new address:", error);
    } finally {
      setSaving(false);
      resetForm();
    }
  };

  return (
    <div className="lg:min-w-[450px] sm:min-w-[400px]">
      <h1 className="min-[450px]:text-4xl min-[370px]:text-3xl text-2xl font-semibold md:whitespace-nowrap">
        Add Shipping{" "}
        <span className="text-blue-600 dark:text-blue-500">Address</span>
      </h1>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title"
        className="w-full min-[450px]:py-6 py-5 text-base mt-8"
      />
      <div className="flex min-[450px]:flex-row flex-col items-center gap-2.5 mt-4">
        <Input
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="w-full min-[450px]:py-6 py-5 text-base"
        />
        <Input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="w-full min-[450px]:py-6 py-5 text-base"
        />
      </div>
      <div className="flex min-[450px]:flex-row flex-col items-center gap-2.5 mt-4">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City / District / Town"
          className="w-full min-[450px]:py-6 py-5 text-base"
        />
        <Input
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          placeholder="Postal Code"
          className="w-full min-[450px]:py-6 py-5 text-base"
        />
      </div>
      <Textarea
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder="Address (Area and Street)"
        className="w-full mt-4 h-32"
      />
      <Button
        size="lg"
        disabled={saving}
        onClick={handleSubmit}
        className="flex items-center gap-2 mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors ease-in"
      >
        {saving ? (
          <>
            <Loader2 className="animate-spin" />
            Saving...
          </>
        ) : (
          <>SAVE ADDRESS</>
        )}
      </Button>
      <button
        className="flex items-center gap-2 text-sm font-medium mt-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4" />
        Back
      </button>
    </div>
  );
};

export default AddressForm;
