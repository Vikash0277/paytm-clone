import express from "express";
import {  z } from "zod";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware.js";
import dotenv from "dotenv";
import { Account } from "../db.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const signupBody = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
      signupBody.parse(req.body);

      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
          return res.status(400).json({ message: "User exists" });
      }

      const newUser = await User.create({
          username: req.body.username,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
      });

      await Account.create({
          userId: newUser._id,
          balance: Math.floor(1 + Math.random() * 10000),
      });

      const token = jwt.sign(
          {
              userId: newUser._id,
              firstName: newUser.firstName,
          },
          JWT_SECRET
      );
      console.log("User created successfully", newUser);
      return res.status(201).json({ 
          message: "User created successfully",
          token 
      });
     
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
});


const signinBody = z.object({
  username: z.string(),
  password: z.string(),
});

// signin

router.post("/signin", async (req, res) => {
  const success = signinBody.parse(req.body);
  if (!success) {
    return res.status().json({
      message: "Enter valid Username or password",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (user && user.password === req.body.password) {
    return res.json({
      message: "User logged in successfully",
      token: jwt.sign(
        {
          userId: user._id,
          firstName: user.firstName,
        },
        JWT_SECRET
      ),
    });
  }
  console.log("Invalid username or password");
  console.log(req.body.username, req.body.password);
  return res.status(400).json({
    message: "Invalid username or password",
  });
});

const updateBody = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});



router.put("/", authMiddleware, async (req, res) => {
  const success = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  try {
    await User.updateOne(
      { _id: req.userId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
        },
      }
    );
  
  
    res.json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user",
    });
  }
});





router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $or: [
        {
          firstName: {
            "$regex": filter,
          },
        },
        {
          lastName: {
            "$regex": filter,
          },
        },
      ]
    });

    res.json({
      user: users.map(user =>(
        {
          username: user.username,
          firstName:user.firstName,
          lastName: user.lastName,
          _id : user._id
        }
      ))
    })
  } catch (error) { 
    res.json({
      message : "error while finding users"
    })
  }

});



export {router};
