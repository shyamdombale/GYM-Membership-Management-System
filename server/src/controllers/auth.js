const jwt = require("jsonwebtoken");

// Temporary Register
exports.register = async (req, res) => {
  return res.status(201).json({
    message: "Registered Successfully"
  });
};

// Temporary Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    const token = jwt.sign(
      { id: 1, role: "admin" },
      process.env.JWT_SECRET || "replace_me",
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: 1,
        name: "Admin",
        role: "admin",
      },
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
}