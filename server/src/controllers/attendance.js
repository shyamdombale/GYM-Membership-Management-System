exports.checkin = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Attendance checked in successfully"
  });
};