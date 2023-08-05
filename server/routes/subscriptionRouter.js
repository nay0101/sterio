const express = require("express");
const router = express.Router();
const subscription = require("../controllers/SubscriptionController");

// subscription
router.get("/", subscription.getAllSubscriptions);
router.get("/:user_id", subscription.getOneSubscription);
router.put("/", subscription.subscribe);

module.exports = router;
