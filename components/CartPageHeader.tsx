const CartPageHeader = () => {
  return (
    <section className="w-full pt-32 pb-[68px] bg-neutral-100 dark:bg-neutral-900">
      <div className="max-container">
        <p className="sm:text-5xl min-[400px]:text-4xl min-[350px]:text-3xl text-2xl font-semibold text-center">
          Your Shopping
          <span className="text-blue-600 dark:text-blue-500 ml-2">Cart</span>
        </p>
      </div>
    </section>
  );
};

export default CartPageHeader;
