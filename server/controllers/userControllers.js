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
      return next(new HttpError("이미지를 선택하세요.", 422));
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
          return next(new HttpError("이미지를 변경할 수 없습니다.", 422));
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
  } catch (error) {}
}

module.exports = { userProfile, updateUser, changeAvatar };
