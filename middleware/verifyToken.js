import jwt from 'jsonwebtoken'


export const VerifyToken = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({ message: "no token" })
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                console.error("JWT verification error:", error);
                return res.status(401).json({ message: "Token expired or invalid" });
            }

            console.log("Verified user:", decoded);
            req.user = decoded;
            next();
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}