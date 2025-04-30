const { sendEmailPlaceOder } = require("../helper/sendMail")

const notificationController = {

    orderConform : async (req, res) => {
        try {
            const {to } = req.body
           await sendEmailPlaceOder(to) 
           return res.status(200).json({ msg: "Oder Conform Email Send " + to })
        } catch (error) {
            console.log("🚀 ~ orderConform: ~ error:", error)
            
        }
    }

}

module.exports = notificationController