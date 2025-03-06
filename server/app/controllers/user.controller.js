const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../../config/db");
const { genSalt, hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { phone, first_name, last_name, email, password } = req.body;

  // Check for required fields
  if (!email || !password || !first_name || !last_name || !phone) {
    console.log("Missing fields in registration");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }


  try {
    // Check if the user already exists
    const [existingUser] = await dbConnection.query(
      "SELECT phone, email FROM Users WHERE phone = ? OR email = ?",
      [phone, email]
    );

    if (existingUser && existingUser.length) {
      console.log(existingUser);
      console.log("User already exists");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or phone number already registered" });
    }

    // Check password length
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Encrypt the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Insert new user into the database
    await dbConnection.query(
      "INSERT INTO Users (phone, first_name, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [phone, first_name, last_name, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}

async function login(req, res) {
  const { phone, email, password } = req.body;

  // Check for required fields
  if (!phone && !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Phone or email and password are required" });
  }

  try {
    // Use phone number or email to find the user
    const query = phone
      ? "SELECT id, phone, password, role FROM Users WHERE phone = ?"
      : "SELECT id, email, password, role FROM Users WHERE email = ?";
    
    const params = phone ? [phone] : [email];

    const [user] = await dbConnection.query(query, params);

    if (!user || user.length === 0) {
      console.log("Invalid phone/email or password - no user found");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid phone/email or password" });
    }

    const userData = user[0]; // Safely access the first result
    console.log("userdata", userData);

    // Compare the password
    const validPassword = await compare(password, userData.password);
    console.log(password, userData.password, validPassword);

    if (!validPassword) {
      console.log("Invalid phone/email or password - password mismatch");
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid phone/email or password" });
    }

    // Generate a token with the user's role included
    const phoneOrEmail = userData.phone || userData.email;
    const userid = userData.id;
    const role = userData.role; // Get the role from the database

    const token = jwt.sign({ phoneOrEmail, userid, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(StatusCodes.OK).json({ msg: "Login success", token, phoneOrEmail, userid, role });
  } catch (error) {
    console.error("Login error:", error.message, error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}


module.exports = { register, login };