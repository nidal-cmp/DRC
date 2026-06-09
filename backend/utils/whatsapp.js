const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsApp(phone, orderData) {
  try {
    const itemList = orderData.items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} (₹${item.unit_price})`
      )
      .join("\n");

    const messageBody = `
🍽️ Order Confirmation

Hello ${orderData.customer_name},

Thank you for your order.

🆔 Order ID: ${orderData.order_id}

📦 Items:
${itemList}

💰 Total Amount: ₹${orderData.total_amount}

⏱️ Estimated Preparation Time: 25 minutes

📌 Status: Received

We appreciate your order and will begin preparing it shortly.

Thank you!
`;

    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phone}`,
      body: messageBody,
    });

    console.log(
      `WhatsApp sent successfully. SID: ${response.sid}`
    );

    return true;
  } catch (error) {
    console.error("WhatsApp Error:", error);
    return false;
  }
}

module.exports = sendWhatsApp;