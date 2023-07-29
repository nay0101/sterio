const Subscription = require("../models/subscriptions");
const User = require("../models/users");

const getAllSubscriptions = async (req, res) => {
  try {
    const result = await Subscription.find();
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const getOneSubscription = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await Subscription.findOne({ user_id });
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const subscribe = async (req, res) => {
  try {
    const { subscription_duration, subscription_fees, user_id } = req.body;
    const result = await Subscription.findOne({ user_id });
    const user = await User.findById(user_id, "-password");
    const total_subscription_duration =
      result.subscription_duration + subscription_duration * 30;
    const total_subscription_fees =
      result.subscription_fees + subscription_fees;
    await Subscription.findByIdAndUpdate(result._id, {
      subscription_duration: total_subscription_duration,
      subscription_fees: total_subscription_fees,
      subscription_status: "Active",
    });
    const subscription_result = await Subscription.findById(result._id);
    res.status(200).json({
      subscription_status: subscription_result.subscription_status,
      user_id,
      username: user.username,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = { getAllSubscriptions, getOneSubscription, subscribe };
