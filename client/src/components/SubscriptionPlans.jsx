import { useSelector } from "react-redux";
import SubscriptionPlan from "./SubscriptionPlan";
import { publicRequest } from "../request-methods";
import { useEffect, useState } from "react";

const SubscriptionPlans = () => {
  const user = useSelector((store) => store.auth.currentUser);
  const [duration, setDuration] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const getSubscriptionStatus = async () => {
    const { result } = (
      await publicRequest.get(`/subscription/${user.user_id}`)
    ).data;
    setDuration(result.subscription_duration);
  };

  useEffect(() => {
    getSubscriptionStatus();
  }, [subscribe]);

  return (
    <section className="pb-8 mx-8 mt-5" id="subscriptions">
      <div className="text-3xl my-5">Current Plans</div>
      {user.subscription_status === "Active" ? (
        <div className="text-xl text-teal-700 border-b pb-5">
          Credit Remaining: {duration} Days
        </div>
      ) : (
        <div className="text-xl text-teal-700 border-b pb-5">
          No Active Plans
        </div>
      )}

      <div className="text-3xl mt-5 mb-5">Available Plans</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <SubscriptionPlan
          duration={1}
          price={5.99}
          setSubscribe={setSubscribe}
        />
        <SubscriptionPlan
          duration={3}
          price={17.97}
          setSubscribe={setSubscribe}
        />
        <SubscriptionPlan
          duration={6}
          price={35.94}
          setSubscribe={setSubscribe}
        />
        <SubscriptionPlan
          duration={12}
          price={71.88}
          setSubscribe={setSubscribe}
        />
      </div>
    </section>
  );
};

export default SubscriptionPlans;
