interface Props {
  currentUser: boolean;
  name: string;
}

const OrderPageHeader = ({ currentUser, name }: Props) => {
  return (
    <section className="w-full mt-[68px] min-[350px]:py-[68px] py-[50px] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-container">
        <p className="sm:text-5xl min-[400px]:text-4xl min-[350px]:text-3xl text-2xl font-semibold text-center">
          {currentUser ? "My" : name.split(" ")[0] + "'s"}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent ml-2.5">
            Orders
          </span>
        </p>
        <p className="text-neutral-200 min-[470px]:text-lg min-[420px]:text-base text-sm text-center font-medium min-[350px]:mt-4 mt-2">
          All your orders in one spot — view receipts, track shipments,{" "}
          <br className="max-[587px]:hidden" /> or reorder your favorites
          easily.
        </p>
      </div>
    </section>
  );
};

export default OrderPageHeader;
