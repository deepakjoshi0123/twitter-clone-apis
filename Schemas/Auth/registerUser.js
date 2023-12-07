const RegisterUserSchema = {
  username: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The username field is required ",
    },
    isLength: {
      options: { min: 5, max: 15 },
      errorMessage: "The username field must have length between 5 and 15 ",
    },
    isUsernameAvailable: true,
  },

  password: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The password field is required",
    },
    isLength: {
      options: { min: 6, max: 20 },
      errorMessage:
        "The password field must have length between 6 and 20 characters",
    },
  },

  email: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The email field is required",
    },
    isEmail: {
      errorMessage: "The email field must be a valid e-mail address",
    },
    isEmailExists: true,
    isLength: {
      options: { min: 6, max: 64 },
      errorMessage:
        "The email field must have length between 6 and 64 characters",
    },
  },

  name: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The name field is required",
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        "The name field must have length between 7 and 64 characters",
    },
  },

  DOB: {
    in: ["body"],
    toDate: true,
    optional: {
      options: { nullable: true },
    },
    isISO8601: {
      errorMessage: "The birth date field must be a valid date",
    },
    isBefore: {
      options: new Date().toISOString(),
      errorMessage: "The birth date field cannot have a future date",
    },
  },
};

module.exports = RegisterUserSchema;
