import User from "../models/userModel.js";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ExamAttempt from "../models/attemptModel.js";

const signupuser = async (req, res) => {
  
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
    const ifemailexists = await User.findOne({ email });
    if (ifemailexists) {
      return res.status(400).json({
        error: "Email already in use",
      });
    }
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const isuser = new User({
      email,
      firstName,
      lastName,
      password: hashedpassword,
    });
    const user=await isuser.save()
    console.log(user)
    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_USER_PASSWORD
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
        message: "User signup succeeded",
        user: { ...user, role: "user" },
      });
    }
  } catch (error) {
    res.status(403).json({
      error:error.message,
      success: false,
      message: "User signup failed",
    });
  }
};

const signinuser = async (req, res) => {
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
      success:false,
      message: "Invalid format",
      errors: parsedData.error.errors,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success:false,
        message: "No such user exists.Create an account first",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success:false,
        message: "Incorrect credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER_PASSWORD
    );

    const isProduction=process.env.NODE_ENV === "production"
    console.log(`isProduction:${isProduction}`)

    res.cookie("token", token, {
      path:"/",
      domain: isProduction ? '.vercel.app' : undefined,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProduction,
      sameSite:"none"
    });

    return res.status(200).json({
      success:true,
      token: token,
      message: "User signin succeeded",
      user: { ...user, role: "user" },
    });
  } catch {
    res.status(403).json({
      success:false,
      message: "Wrong credentials",
    });
  }
};

const logoutuser = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ success:true,message: "User logged out" });
  } catch (error) {
    res
      .status(400)
      .json({success:false, message: "Error while logging out ", error: error.message });
  }
};

const userattempt = async (req, res) => {
  try {
    console.log("UserId:", req.userId);

    const { examId } = req.params;
    console.log("ExamId:", examId);

    const { userscore } = req.body;
    console.log("Userscore:", userscore);

    if (!examId || userscore===undefined || userscore===null || userscore < 0) {
      return res.status(400).json({
        success: false,
        message: "Exam ID and user score are required.",
      });
    }

    const attempt = new ExamAttempt({
      examId,
      userId:req.userId,
      score: userscore,
      completedAt: Date.now(),
    });

    const response = await attempt.save();

    return res.status(200).json({
      success: true,
      message: "Quiz completed successfully",
      attempt: response,
    });
  } catch (error) {
    console.error("Error while attempting:", error.message);

    return res.status(400).json({
      success: false,
      message: "Error while attempting",
      error: error.message,
    });
  }
};

export { signupuser, signinuser, logoutuser, userattempt };
