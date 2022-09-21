import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

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

const bornSchema = {
  day: {
    type: String,
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },
};

const domainSchema = {
  name: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
};

const phoneNumberSchema = {
  countryCode: {
    type: String,
  },
  number: {
    type: String,
  },
};

const educationSchema = {
  schoolName: {
    type: String,
  },
  from: {
    month: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  to: {
    month: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  degree: {
    type: String,
  },
  stillStudying: {
    type: Boolean,
  },
};

const workSchema = {
  companyName: {
    type: String,
  },
  from: {
    month: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  to: {
    month: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  post: {
    type: String,
  },
  stillWorking: {
    type: Boolean,
  },
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      maxLength: 1024, // cuz gonna be hashed
    },
    expectations: [
      {
        type: String,
        enum: ["expc1", "expc2", "expc3", "expc4"],
      },
    ],
    // workAvailability: {
    //   type: Boolean,
    // },
    // currentlyStudying: {
    //   type: Boolean,
    // },
    gender: {
      type: String,
      enum: ["Female", "Male"],
    },
    location: locationSchema,
    born: bornSchema,
    domain: domainSchema,
    phoneNumber: phoneNumberSchema,
    //confirmationcodeNumber
    education: [educationSchema],
    work: [workSchema],
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    bio2: {
      type: String,
    },
    language: {
      type: String,
      default: "English",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2h",
  });
};

userSchema.statics.validatePwd = async function (passedPWD, userPWD) {
  return await bcrypt.compare(passedPWD, userPWD);
};

userSchema.pre("save", async function (next) {
  const user = this;
  // temporairement!
  // !user.isNew pcq deja crypté
  if (user.isModified("password") && !user.isNew) {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_WORK_FACTOR));
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

export const User = mongoose.model("User", userSchema);
