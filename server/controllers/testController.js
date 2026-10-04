const getServerStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management System backend is running successfully.",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getServerStatus,
};
