const CartPageHeader = () => {
  return (
    <section className="w-full mt-[68px] py-[68px] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-container">
        <p className="sm:text-5xl min-[400px]:text-4xl min-[350px]:text-3xl text-2xl font-semibold text-center">
          Your Shopping
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent ml-2">
            Cart
          </span>
        </p>
      </div>
    </section>
  );
};

export default CartPageHeader;
