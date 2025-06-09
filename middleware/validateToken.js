const jwt = require("jsonwebtoken");


//Checks if user is validated to enter the website
const validateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
       
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

module.exports =  validateToken;