export const validateBody = (req, res, next) => {
  const { body } = req;
  
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      error: {
        message: 'Request body is required'
      }
    });
  }

  if (!body.name || typeof body.name !== 'string') {
    return res.status(400).json({
      error: {
        message: 'Name is required and must be a string'
      }
    });
  }

  next();
};

export const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({
      error: {
        message: 'Valid email is required'
      }
    });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      error: {
        message: 'Password must be at least 6 characters long'
      }
    });
  }

  next();
};