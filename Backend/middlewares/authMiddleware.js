import passport from 'passport';

export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
          console.error('Authentication error:', err);
          return res.status(401).json({ success: false, message: err });
      }
      if (!user) {
          // "info" contains information about the failure
          console.log('Authentication failed:', info);
          return res.status(401).json({ success: false, message: err });
      }
      // If authentication succeeded, attach the user to the request object
      req.user = user;
      next();
  })(req, res, next);
};
