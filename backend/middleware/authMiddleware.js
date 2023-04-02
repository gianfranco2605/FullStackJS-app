const checkAuth = (req, res, next) => {
    console.log("Middleware");
    next();
};

export default checkAuth;