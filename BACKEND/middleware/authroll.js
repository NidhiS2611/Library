const authroll = (...allowedrole) => {
    return (req, res, next) => {
        try {
        

            if (!allowedrole.includes(req.user.role)) {
                return res.status(403).json({ message: 'access denied' });
            }
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'internal server error' });
        }
    };
};

module.exports = { authroll };

