import React from "react";

const RazorpayCheckoutButton = ({totalSumAmount}) => {
  const initializeRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorPay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    var options = {
      key: "rzp_test_zjcmmiQwB7TrQ4", // Enter the Key ID generated from the Dashboard
      amount: totalSumAmount() * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Laptop Store",
      description: "Test Transaction",
      handler: function (response) {
        if (response) {
          alert(`Your transaction Id Is : ${response.razorpay_payment_id}`);
        }
      },
      prefill: {
        name: "pratik Kumar",
        email: "pratik.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(" Sorry ! Your payment is failed due to some reason at a time");
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.reason);
      alert(`Your transaction Id Is : ${response.error.metadata.payment_id}`);
    });

    rzp1.open();
  };
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => makePayment()}
    >
      Pay With Razorpay
    </button>
  );
};

export default RazorpayCheckoutButton;
