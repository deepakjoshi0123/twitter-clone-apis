const CreateTweetSchema = {
  tweet: {
    in: ["body"],
    exists: {
      options: {
        checkNull: true,
      },
      errorMessage: "The tweet field is required",
    },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage:
        "The content field must have length between 1 and 100 characters",
    },
  },
};

module.exports = CreateTweetSchema;
