function isUserLogged(req) {
    return true;
    return req.session.siggedin;
}

module.exports = {isUserLogged}