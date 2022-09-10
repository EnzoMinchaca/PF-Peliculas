const request = require('request')
const dotenv = require('dotenv')
dotenv.config()
const paypalApi = 'https://api-m.sandbox.paypal.com'
const auth = {
    user: process.env.CLIENT,
    pass: process.env.KEY_SECRET
}

class PaymentController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    async getPaymentLink(req, res) {
        try {
            const payment = await this.subscriptionService.createPayment(req); 
            return res.json(payment);
        } 
        catch (error) {
            console.log(error); 
            return res
                .status(500)
                .json({ error: true, msg: "Failed to create payment" });
        }
    }
}
  
const createPayment = (req, res) => {
    const body = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: req.body.price   //es el precio que le pasariamos por body
        },descripcion: "Buy Movie"
      }],
      application_context: {
        brand_name: 'HenryMovies',
        landing_page: 'NO_PREFERENCE',    //es por default, dejarlo asi para nuestros fines
        user_action: 'PAY_NOW',   //accion para que en paypal muestre el monto del pago
        return_url: "http://localhost:3000/confirmPay",
        cancel_url: "http://localhost:3000/cancelPay"
      }
    }

    request.post(`${paypalApi}/v2/checkout/orders`, {
      auth,
      body,
      json: true
    }, (err, response) => {
      res.json({data: response.body})
    })
  }

  const executePayment = (req, res) => {
    const token = req.body.token
    request.post(`${paypalApi}/v2/checkout/orders/${token}/capture`, {
      auth,
      body: {},
      json: true
    }, (err, response) => {
      res.json({data: response.body})
    })
  }

module.exports = {PaymentController, createPayment, executePayment};