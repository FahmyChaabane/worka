import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { v4 as uuidv4 } from 'uuid';

const locationSchema = {
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
};

const phoneNumberSchema = {
  countryCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
};

const managerPhoneNumberSchema = {
  managerPhoneNumber: {
    type: String,
  },
  managerCountryCode: {
    type: String,
  },
};

const foundationDateSchema = {
  foundationDay: String,
  foundationMonth: String,
  foundationYear: String
}

const managerSchema = {
  managerFirstName: {
    type: String,
  },
  managerLastName: {
    type: String,
  },
  managerRole: {
    type: String
  },
  managerPhoneNumber: managerPhoneNumberSchema
}

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    manager: managerSchema,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      maxLength: 1024, // cuz gonna be hashed
    },
    type: {
      type: String,
      enum: ["LLC", "corp", "govn"],
    },
    website: {
      type: String,
    },

    foundationDate: foundationDateSchema,
    state: {
      type: String,
    },
    size: {
      type: String,

    },
    industry: {
      type: String
    },
    location: locationSchema,
    phoneNumber: phoneNumberSchema,
    avatar: {
      type: String,
    },
    description: {
      type: String,
    },
    language: {
      type: String,
      default: "English",
    },
    completed: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

companySchema.pre("save", async function (next) {
  if (this.isModified("password") && !this.isNew) {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_WORK_FACTOR));
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

companySchema.methods.generateResetPasswordToken = function () {
  const resetToken = uuidv4();
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};


companySchema.statics.generateJWT = async function (payload) {
  return await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

companySchema.statics.validatePwd = async function (passedPWD, comapnyPWD) {
  return await bcrypt.compare(passedPWD, comapnyPWD);
};



export const Company = mongoose.model("Company", companySchema);
