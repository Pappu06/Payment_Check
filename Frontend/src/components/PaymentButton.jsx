function PaymentButton() {

  const handlePayment = () => {
    console.log("Pay Button Clicked");
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
    >
      Pay Now
    </button>
  );
}

export default PaymentButton;