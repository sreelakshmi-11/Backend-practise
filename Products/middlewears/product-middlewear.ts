import z from "zod";

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "product name should be at least 3 characters" })
    .max(50, { message: "product name must be less than 50 characters" }),
  price: z.string(),
  category: z.string(),
});

export const productValidation = async (req, res, next) => {
  const result = await productSchema.safeParse(req.body);
  const error = result.error?.errors[0];
  if (!result.success) {
    res.status(400).json({
      status: "fail",
      message: error?.message,
    });
    return;
  }
  next();
};
