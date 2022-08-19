function isUserLogged(req) {
    return req.session.siggedin;
}

module.exports = {isUserLogged}