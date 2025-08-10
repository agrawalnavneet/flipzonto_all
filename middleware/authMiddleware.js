// function ensureAuth(req, res, next) {
//     if (req.session && req.session.user) return next();
//     res.redirect('/login');
//   }
  
//   module.exports = ensureAuth;
  




function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    // For API requests, return an error message instead of redirecting
    if (req.originalUrl.startsWith('/api')) {
      return res.status(401).json({ error: 'Unauthorized: Please log in.' });
    }
    // For non-API requests, continue with the redirect to login
    res.redirect('/login');
  }
}

module.exports = ensureAuth;
