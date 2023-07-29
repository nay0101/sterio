import SubscriptionPlans from "../components/SubscriptionPlans";
import Announcement from "../layout/Announcement";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Subscriptions = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <SubscriptionPlans />
      <Footer />
    </>
  );
};

export default Subscriptions;
