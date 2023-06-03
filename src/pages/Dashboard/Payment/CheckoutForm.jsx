import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useCart from "../../../Hooks/useCart";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if(price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    if (!elements || !stripe) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Paid successfully!",
        showConfirmButton: false,
        timer: 1200,
      });
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous user",
            email: user?.email || "Anonymous email",
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError);
    }

    setProcessing(false);
    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      //save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent?.id,
        price,
        date: new Date(),
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        itemNames: cart.map((item) => item.name),
        menuItems: cart.map((item) => item.menuItemId),
        orderStatus: "service pending",
      };

      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data?.deleteResult?.deletedCount > 0) {
          refetch();
          card.clear();
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="max-w-md mx-auto w-full mt-8"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && (
        <p className="font-semibold text-red-600 text-center mt-4 mb-4">
          {cardError}
        </p>
      )}
      {transactionId && (
        <p className="font-semibold text-green-600 text-center mt-4 mb-4">
          Transaction id: {transactionId}
        </p>
      )}

      <div className="flex mb-8">
        <button
          className="bg-[#d1a054] btn-sm rounded text-white font-semibold hover:bg-slate-800 duration-200 mx-auto mt-8"
          type="submit"
          disabled={!stripe || !clientSecret || processing}   // || processing
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
