const {EventWebhook, EventWebhookHeader} = require('@sendgrid/eventwebhook');

const verifyRequest = function (publicKey, payload, signature, timestamp) {
  const eventWebhook = new EventWebhook();
  const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);
  return eventWebhook.verifySignature(ecPublicKey, payload, signature, timestamp);
}

module.exports = { 
    verifyRequest,
    SIG_HEADER: EventWebhookHeader.SIGNATURE(),
    TIME_HEADER: EventWebhookHeader.TIMESTAMP()
};