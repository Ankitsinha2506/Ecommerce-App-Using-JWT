const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);
        req.user = verified;
        next();

    } catch (error) {
        console.log(error);
        res.status(400).send("Invalid Token")

    }
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(500).send("user is not an admin so user can't be deleted.")
        }
    })
}

module.exports = {
    verifyToken,
    verifyAdmin,
};

