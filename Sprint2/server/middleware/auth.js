function auth(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true;
    next();
    return;
  }
  res.status(401).send('Unauthorized');
}

module.exports = auth;
