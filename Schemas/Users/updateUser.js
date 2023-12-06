const UpdateUserSchema = {
  username: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    isLength: {
      options: { min: 2, max: 64 },
      errorMessage: "The username field must have length between 3 to 15 chars",
    },
    isUserNameExists: true,
  },

  bio: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },

    isLength: {
      options: { min: 6, max: 64 },
      errorMessage:
        "The bio field must have length between 3 and 30 characters",
    },
  },

  name: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },

    isLength: {
      options: { min: 2, max: 64 },
      errorMessage:
        "The name field must have length between 7 and 64 characters",
    },
  },

  DOB: {
    in: ["body"],
    optional: {
      options: { nullable: true },
    },
    toDate: true,
    isISO8601: {
      errorMessage: "The birth date field must be a valid date",
    },
    isBefore: {
      options: new Date().toISOString(),
      errorMessage: "The birth date field cannot have a future date",
    },
  },
};

module.exports = UpdateUserSchema;
