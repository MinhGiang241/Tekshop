import jwt from "jsonwebtoken";

const generateToken = (id: any) => {
  return jwt.sign({ id }, (process.env as any).JWT_SIGNATURE, {
    expiresIn: "30d",
  });
};

export default generateToken;
