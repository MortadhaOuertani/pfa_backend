const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};
  data.city = !isEmpty(data.city) ? data.city : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";


  if (validator.isEmpty(data.bio)) {
    errors.bio = "Required bio";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "Required city";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};