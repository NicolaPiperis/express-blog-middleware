function index (req, res) {
    res.send(req.user.username + " Home page");
};

module.exports = {
    index,
};