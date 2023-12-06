const LoginUserSchema = {
  email: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The email field is required",
    },
  },

  password: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The password field is required",
    },
  },
};

module.exports = LoginUserSchema;
