exports.authenticateAdmin = async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ msg: "Access Denied. No token provided." });
        }

        // ✅ Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await User.findById(decoded.userId);

        // ✅ Check if User is Admin
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ msg: "Unauthorized. Admin access required." });
        }

        req.admin = admin; // Store Admin Data in Request
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ msg: "Invalid Token" });
    }
};