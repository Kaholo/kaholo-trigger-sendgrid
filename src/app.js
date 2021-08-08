const { isMatch } = require("micromatch");
const { verifyRequest, SIG_HEADER, TIME_HEADER } = require("./helpers");

async function event(req, res, settings, triggerControllers) {
  const {publicKey} = settings;
  try { 
    const signature = req.get(SIG_HEADER);
    const timestamp = req.get(TIME_HEADER);
    const body = req.body;
    if (publicKey && (!signature || !timestamp || !body ||
        !verifyRequest(publicKey, body, signature, timestamp))){
      return res.status(403).send("Bad SendGrid event format");
    }
    body.forEach(eventPayload => {
      const {email, event: eventType} = eventPayload;
      let categories = eventPayload.category;
      if (!Array.isArray(categories)) categories = [categories];

      triggerControllers.forEach(trigger => {
          const { emailPattern, trigEventType} = trigger.params;
          const categoryPats = (trigger.params.categoryPats || "").split("\n").filter(val => val);
          
          if (emailPattern && !isMatch(email, emailPattern)) return;

          if (categoryPats.length > 0 && !categories.some(category => 
            categoryPats.some(categoryPat => isMatch(category, categoryPat)))) return;

          if (trigEventType && trigEventType !== "any" && eventType !== trigEventType) {
            const isDelivery = ["processed", "dropped", "delivered", 
                                "deferred", "bounce"].includes(eventType);
            if (trigEventType === "anyDelivery" && !isDelivery) return;
            if (trigEventType === "anyEngagement" && isDelivery) return;
          }

          trigger.execute(`SendGrid email ${eventType} - ${email}`, eventPayload);
      });
    })
    res.status(204).send("OK");
  }
  catch (err){
    res.status(500).send({err: err.message || err});
  }
}

module.exports = { 
  event
};