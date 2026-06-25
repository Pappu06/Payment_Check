import PaymentButton from "./PaymentButton";

function ProductCard() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-100">

      <h2 className="text-2xl font-bold">
        React Payment Course
      </h2>

      <p className="text-gray-500 mt-2">
        Learn complete Razorpay Integration.
      </p>

      <h1 className="text-4xl font-bold text-indigo-600 mt-6">
        ₹499
      </h1>

      <ul className="mt-6 space-y-2 text-gray-600">
        <li>✔ Secure Payment</li>
        <li>✔ Instant Confirmation</li>
        <li>✔ Test Mode</li>
      </ul>

      <PaymentButton />

    </div>
  );
}

export default ProductCard;