import z from "zod";

const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name should be atleast 3 chracters" })
    .max(50, { message: "name should be at most 50 characters" }),

  email: z.string().email("must be a valid email address"),
  password: z
    .string()
    .min(3, { message: "password should be atleast 3 chracters" })
    .max(50, { message: "password should be at most 50 characters" }),
});

const loginSchema = z.object({
  email: z.string().email("must be a valid email address"),
  password: z
    .string()
    .min(3, { message: "password should be atleast 3 chracters" })
    .max(50, { message: "password should be at most 50 characters" }),
});

export const loginValidation = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const error = result.error.errors[0];
    res.status(400).json({
      status: "fail",
      message: error.message,
      field: error.path.join("."),
    });
    return;
  }
  next();
};

export const signUpValidation = (req, res, next) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const error = result.error.errors[0];
    res.status(400).json({
      status: "fail",
      message: error.message,
      field: error.path.join("."),
    });
    return;
  }
  next();
};
