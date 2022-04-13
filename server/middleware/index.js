//Production Route for public double check
export const checkPublicScope = (req, res, next) => {
  if (req.authInfo.checkLocalScope('read')) {
    next();
  } else {
    res.status(403).end('Forbidden');
  }
};

//Production Route for admin double check
export const checkAdminScope = (req, res, next) => {
  if (req.authInfo.checkLocalScope('adminRT')) {
    next();
  } else {
    res.status(403).end('Forbidden');
  }
};
