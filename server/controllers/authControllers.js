const HttpError = require("../models/errorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register
async function register(req, res, next) {
  try {
    const { name, email, password, password2 } = req.body;

    if (!name || !email || !password) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 400));
    }

    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("이메일이 이미 존재합니다.", 400));
    }

    if (password.trim().length < 6) {
      return next(new HttpError("비밀번호는 6자 이상이어야 합니다.", 400));
    }

    if (password != password2) {
      return next(new HttpError("비밀번호가 일치하지 않습니다.", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPassword,
    });

    res.status(201).json(`${newUser.name}님 가입되었습니다.`);
  } catch (error) {
    return next(new HttpError("사용자 등록에 실패하였습니다.", 400));
  }
}

// Login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 400));
    }

    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("잘못된 이메일주소입니다.", 400));
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return next(new HttpError("잘못된 비밀번호입니다.", 400));
    }

    const { _id: id, name, isAdmin } = user;
    const token = jwt.sign(
      { id, name, email, isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token, id, name, email, isAdmin });
  } catch (error) {
    return next(
      new HttpError("로그인에 실패했습니다. 계정을 다시 확인해 주세요.", 400)
    );
  }
}

// Newsletter
async function newsletter(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 400));
    }

    res.status(201).json({ name, email });
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports = {
  register,
  login,
  newsletter,
};
