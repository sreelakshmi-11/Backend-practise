export class Errors extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const customError = (res, error): void => {
  console.error(error);
  if (error instanceof Errors) {
    res.status(error.statusCode).json({
      status: error.statusCode || 400,
      message: error.message || "internal serer error",
      success: false,
    });
  }
};
