import { getSavedAddress } from "@/actions/order-action";
import { auth } from "@/app/lib/auth";
import AddressForm from "@/components/AddressForm";
import { headers } from "next/headers";
import Image from "next/image";

export default async function AddressPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  const addresses = await getSavedAddress(session.user.id);

  console.log(addresses);

  return (
    <section className="max-w-6xl px-4 mx-auto min-[370px]:pt-36 pt-32 flex flex-col min-[940px]:flex-row justify-between  gap-10">
      <AddressForm userId={session.user.id} />
      <Image
        src="/location 1.svg"
        alt="Address"
        width={450}
        height={450}
        className="mt-14 max-[940px]:mx-auto"
      />
    </section>
  );
}
