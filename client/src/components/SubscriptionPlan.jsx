import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { subscribe } from "../store/auth-actions";

const SubscriptionPlan = ({ duration, price, setSubscribe }) => {
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.currentUser);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    if (stripeToken) {
      dispatch(
        subscribe({
          tokenID: stripeToken.id,
          price,
          user_id: user.user_id,
          subscription_duration: duration,
          subscription_fees: price,
        })
      ).then(() => {
        setSubscribe((prev) => !prev);
      });
    }
  }, [stripeToken]);

  return (
    <div className="border border-teal-700 rounded-lg w-full">
      <div className="flex flex-col items-center border-b p-4 text-teal-700 ">
        <p className="text-3xl font-bold">{duration} Month(s)</p>
        <p className="text-2xl">${price}</p>
      </div>
      <div className="flex flex-col items-center px-4 py-2">
        <p className="text-2xl mb-4 text-teal-700">Features</p>
        <div className="flex flex-col items-center mt-2 gap-2">
          <p>Access to 10000+ movies</p>
          <p>Unlimited Streaming</p>
          <p>High-Quality Playback</p>
          <p>Multi-Device Access</p>
          <p>Offline Downloads</p>
        </div>
      </div>
      <div className="flex w-full justify-center p-4">
        <StripeCheckout
          name="Sterio"
          description={`Your total is $${price}`}
          amount={price * 100}
          currency="USD"
          token={onToken}
          stripeKey="pk_test_51NDUYXFBmrvMKHaef1ER7GgfijUTKcDNTGeM33y0ae516O3WGwGlXTwWXN1beZlEi3hOp4AwFxxy6EgayfiSX6Zh00NmkCynSK"
        >
          <button className="border border-teal-700 rounded-full px-5 py-2 uppercase hover:bg-teal-700 hover:text-white">
            Subscribe
          </button>
        </StripeCheckout>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
