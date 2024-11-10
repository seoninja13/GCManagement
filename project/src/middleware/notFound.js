export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: 'Resource not found'
    }
  });
};