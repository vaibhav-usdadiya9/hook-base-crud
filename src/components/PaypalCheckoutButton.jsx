import { PayPalButtons } from "@paypal/react-paypal-js";
import {  useState } from "react";

const PaypalCheckoutButton = ({ totalSumAmount }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const [order, setOrder] = useState();

  const handleApprove = (orderId) => {
    // Call backend function to fulfill order

    // if response is success
    setPaidFor(true);

    // window.location.href = "/cart";
    // Refresh user's account or subscription status

    // if response is error
    // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@laptophub.in for assistance.");
  };

  if (paidFor) {
    // Display success message, modal or redirect user to success page

    // alert("Thank you for your purchase!");
    alert(`Your Order id is : ${order.id}`);
  
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <>
      <PayPalButtons
        className="mt-3"
        style={{
          color: "blue",
          shape: "pill",
        }}
        onClick={(data, actions) => {
          const hasAlreadyBoughtOrder = false;

          if (hasAlreadyBoughtOrder) {
            setError("You already bought this order.");

            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalSumAmount() * 0.01368,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          setOrder(order);

          handleApprove(data.orderID);
        }}
        onError={async (err) => {
          setError(err);
          console.error("PayPal Checkout onError", err);
        }}
        onCancel={(actions) => {
          alert("your order is saved to draft");
        }}
      />
    </>
  );
};

export default PaypalCheckoutButton;
