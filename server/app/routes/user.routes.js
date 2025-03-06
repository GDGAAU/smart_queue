const express = require("express");
const router = express.Router();
const { register, login} = require("../controllers/user.controller");
// const authMiddleware = require("../middlewares/auth_middle_ware");
// const adminMiddleware = require("../middlewares/admin_middle_ware");

router.post("/register", register);
router.post("/login", login);

module.exports = router;