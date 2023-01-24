const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req, res, next) => {
    // header authorization
    // Bearer lñsdhfipuryhtkdvm,cxnbvkjhyguireyhgjkdh
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
        const token = bearerToken.split("Bearer ")[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET, "HS512");
            const {id, name, email} = decoded
            req['user'] = { id, name, email }
            next();
        } catch (error) {
            next({
                status: 400,
                errorContent: error,
                message: "Invalid Token.",
            });
        }
    } else {
        next({
            status: 400,
            errorContent: { message: "" },
            message: "Token is not able.",
        });
    }
};

module.exports = authenticate;