// import Admin from "../model/admin.model.js";
// import jwt from "jsonwebtoken";

// // ADMIN LOGIN
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: "Admin not found" });
//     }

//     if (admin.password !== password) {
//       return res.status(401).json({ message: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Admin login successful",
//       token
//     });

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  
  if (email === process.env.ADMIN_email && password === process.env.ADMIN_pw) {
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Admin login successful",
      token
    });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
};
