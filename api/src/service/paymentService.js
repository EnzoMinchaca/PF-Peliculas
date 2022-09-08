const axios = require('axios')

class PaymentService {
    async createPayment(req) {
        const url = "https://api.mercadopago.com/checkout/preferences"

        // const body = {
        //     payer_email: "test_user_11831113@testuser.com",
        //     items: [
        //       {
        //         title: "Dummy Title",
        //         description: "Dummy description",
        //         picture_url: "http://www.myapp.com/myimage.jpg",
        //         category_id: "cat123",
        //         quantity: 1,
        //         unit_price: 10
        //       },
        //       {
        //         title: "Otra cosa",
        //         description: "ALgo nose",
        //         picture_url: "http://www.myapp.com/myimage.jpg",
        //         category_id: "cat123",
        //         quantity: 1,
        //         unit_price: 500
        //       },
        //       {
        //         title: "Una bici",
        //         description: "Esta copada",
        //         picture_url: "http://www.myapp.com/myimage.jpg",
        //         category_id: "cat123",
        //         quantity: 1,
        //         unit_price: 17800
        //       }
        //     ],
        //     back_urls: {
        //       success: "http://localhost:3000",
        //       failure: "/failure",
        //       pending: "/pending"
        //     },
        //     notification_url: "https://www.your-site.com/ipn"
        //   };

        const body = {
            payer_email: req.body.email,
            // items: [
            // {
            //     title: req.body.title,
            //     description: req.body.description,
            //     picture_url: "https://es.web.img3.acsta.net/c_310_420/pictures/22/07/11/17/07/2506648.jpg",
            //     category_id: "cat123",
            //     quantity: 1,
            //     unit_price: req.body.price
            // }
            // ],
            items: req.body.items,
            back_urls: {
                success: "http://localhost:3000/confirm",
                failure: "http://localhost:3000/confirm",
                pending: "http://localhost:3000/confirm"
            },
            notification_url: "https://www.your-site.com/ipn"
        };

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        return payment.data
    }
}

module.exports = PaymentService
