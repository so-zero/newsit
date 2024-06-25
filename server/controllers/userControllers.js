const HttpError = require("../models/errorModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// User Profile
async function userProfile(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("유저의 정보가 없습니다.", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// Change User Avatar
async function changeAvatar(req, res, next) {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("이미지를 선택하세요.", 400));
    }

    const user = await User.findById(req.user.id);
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "..", "uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    let fileName = avatar.name;
    let splitted = fileName.split(".");
    let newFilename =
      splitted[0] + uuid() + "." + splitted[splitted.length - 1];

    avatar.mv(
      path.join(__dirname, "..", "uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }

        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );
        if (!updatedAvatar) {
          return next(new HttpError("이미지를 변경할 수 없습니다.", 400));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
}

// Update User
async function updateUser(req, res, next) {
  try {
    const { name, email, currentPassword, newPassword, newPassword2 } =
      req.body;
    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("모든 필드를 입력해 주세요.", 400));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("유저를 찾을 수 없습니다.", 403));
    }

    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id != req.user.id) {
      return next(new HttpError("이메일이 이미 존재합니다.", 400));
    }

    const validateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validateUserPassword) {
      return next(new HttpError("비밀번호가 일치하지 않습니다.", 400));
    }

    if (newPassword !== newPassword2) {
      return next(new HttpError("새로운 비밀번호가 일치하지 않습니다.", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(newPassword, salt);

    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        password: HashPassword,
      },
      { new: true }
    );

    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
}

async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.userId) {
    return next(new HttpError("이 사용자를 삭제할 권한이 없습니다.", 400));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("사용자가 삭제되었습니다.");
  } catch (error) {
    return next(new HttpError(error));
  }
}

async function getUsers(req, res, next) {
  if (!req.user.isAdmin) {
    return next(new HttpError("사용자를 확인할 수 없습니다.", 400));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ users: usersPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    return next(new HttpError(error));
  }
}

module.exports = {
  userProfile,
  updateUser,
  changeAvatar,
  deleteUser,
  getUsers,
};
