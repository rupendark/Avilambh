const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
    generateToken: function (user) {
        return jwt.sign({ id: user._id, email: user.email,role : user.role, name: user.name }, process.env.secret, {
            expiresIn: "5h",
        });

    },
    isGuest: async function (req, res, next) {
        try {
            const { jwtToken } = req.cookies;
            if (!jwtToken) {
                return res.json({ status: 401, message: "Unauthorized Request..." })
            }

            let userDetails = jwt.verify(jwtToken, process.env.secret)

            req.user = userDetails;
            // console.log(req.user);
            next();
        } catch (err) {
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
        }

    }
}

