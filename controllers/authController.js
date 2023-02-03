const { createOtp, verifyOtp } = require("../services/userServices")

exports.otpLogin = async (req, res, next) => {
    try {
        const resp = await createOtp(req.body);
        res.status(200).send({
            message: "Success",
            data: resp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }

}

exports.verifyOtp = async (req, res) => {
    try {
        const resp = await verifyOtp(req.body);

        res.status(200).send({
            message: "Success",
            data: resp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}