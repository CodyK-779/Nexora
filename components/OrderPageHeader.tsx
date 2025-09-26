interface Props {
  currentUser: boolean;
  name: string;
}

const OrderPageHeader = ({ currentUser, name }: Props) => {
  return (
    <section className="w-full min-[350px]:pt-32 pt-28 min-[350px]:pb-[68px] pb-[50px] bg-neutral-100 dark:bg-neutral-900">
      <div className="max-container">
        <p className="sm:text-5xl min-[400px]:text-4xl min-[350px]:text-3xl text-2xl font-semibold text-center">
          {currentUser ? "My" : name.split(" ")[0] + "'s"}
          <span className="text-blue-600 dark:text-blue-500 ml-2.5">
            Orders
          </span>
        </p>
      </div>
    </section>
  );
};

export default OrderPageHeader;
