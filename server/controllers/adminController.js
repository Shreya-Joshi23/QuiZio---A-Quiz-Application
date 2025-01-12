import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

const signupadmin = async (req, res) => {
  const { email, firstName, lastName, password, profilePic } = req.body;

  const requiredbody = z.object({
    email: z
      .string()
      .min(3)
      .max(100)
      .email({ message: "Must be a valid email" }),
    firstName: z.string().min(3).max(100),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),
  });
  const parsedData = requiredbody.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      success: false,
      message: "Invalid format",
      errors: parsedData.error.errors,
    });
  }

  try {
    const ifemailexists = await Admin.findOne({ email });
    if (ifemailexists) {
      return res.status(400).json({
        success:false,
        error: "Email already in use",
      });
    }
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const creator = new Admin({
      email,
      firstName,
      lastName,
      password: hashedpassword,
    });
    const admin =await creator.save();
    if (admin) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        process.env.JWT_ADMIN_PASSWORD
      );

      const isProduction=process.env.NODE_ENV === 'production'

      res.cookie("token", token, {
        domain: isProduction ? '.vercel.app' : 'localhost',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      });
      res.status(200).json({
        success: true,
        token: token,
        message: "Admin signup succeeded",
        user: { ...creator, role: "admin" },
      });
    }
  } catch (error) {
    res.status(403).json({
      error:error.message,
      success: false,
      message: "Admin signup failed",
    });
  }
};

const signinadmin = async (req, res) => {
  const { email, password } = req.body;
  const requiredbody = z.object({
    email: z
      .string()
      .min(3)
      .max(100)
      .email({ message: "Must be a valid email" }),
  });
  const parsedData = requiredbody.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      message: "Invalid format",
      errors: parsedData.error.errors,
    });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success:false,
        message: "No such creator/admin exists.Create an account first",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect credentials",
      });
    }
    if (admin) {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        process.env.JWT_ADMIN_PASSWORD
      );

      const isProduction=process.env.NODE_ENV === 'production'

      res.cookie("token", token, {
        domain:isProduction ? '.vercel.app' : 'localhost',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      });

      return res.status(200).json({
        success:true,
        token: token,
        message: "Admin signed in successfully",
        user: { ...admin, role: "admin" },
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(403).json({
      success:false,
      message: "Wrong credentials",
    });
  }
};

const logoutadmin = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({success:true, message: "Admin logged out" });
  } catch (error) {
    res
      .status(400)
      .json({success:false, message: "Error while logging out ", error: error.message });
  }
};

export { signupadmin, signinadmin, logoutadmin };
