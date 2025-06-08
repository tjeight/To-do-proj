const Joi = require("joi");

// ✅ Joi schema
const taskSchema = Joi.object({
  task: Joi.string().required().messages({
    "string.base": "Task must be a string",
    "string.empty": "Task is required",
    "any.required": "Task is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "date.min": "Date must not be in the past",
    "any.required": "Date is required",
  }),
});

// ✅ Middleware function
const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message),
    });
  }

  next();
};

module.exports = validateTask;
