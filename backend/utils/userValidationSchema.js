export const userValidationSchema = {
  username: {
    isString: {
      errorMessage: "Username must be a string.",
    },
    notEmpty: {
      errorMessage: "Username must not be empty.",
    },
    isLength: {
      options: {
        min: 3,
        max: 8,
      },
      errorMessage: "Username length should be between 3 and 8.",
    },
  },
  password: {
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
      errorMessage: "Password length should be between 5 and 20.",
    },
    notEmpty: {
      errorMessage: "Password must not be empty.",
    },
  },
};
