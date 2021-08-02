# kaholo-trigger-sendgrid
Kaholo trigger for integration with SendGrid Webhook

## How to use:
After installing the plugin on Kaholo,
Follow this [documentation](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook#getting-started) to setup your webhook on SendGrid.
Also make sure to copy your API Token from SendGrid and store it in Kaholo's vault.

## Settings
1. Public Key (String) **Optional** - If specified, validate the request with the key specified, otherwise, don't verify reqest.

## Method: Email Event:
Triggers whenever there is an email event sent to our SendGrid webhook.

### Webhook URL:
**{KAHOLO_URL}/webhook/sendgrid/event**

### Parameters:
1. Email Pattern (String) **Optional** - The email or email [global pattern](https://github.com/micromatch/micromatch) to accept. Filters any alerts that didn't come come from the specified mail.
2. Event Type (Options) **Optional** - The type of events to catch. Possible values are:
* Any
* Any Delivery Event ( Dropped | Delivered | Deferred | Bounce )
* Any Engagement Event ( Open | Click | Spam Report | Unsubscribe || Group Unsubscribe || Group Resubscribe)
* Any specific existing event typy: Dropped | Delivered | Deferred | Bounce | Open | Click | Spam Report | Unsubscribe || Group Unsubscribe || Group Resubscribe
3. Category Patterns (Text) **Optional** - The categories or the [global patterns](https://github.com/micromatch/micromatch) of the categories. Can enter multiple values bu seperating each with a new line.