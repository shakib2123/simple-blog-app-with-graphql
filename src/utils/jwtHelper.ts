import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export async function generateToken(
  payload: { userId: number },
  secret: Secret
) {
  const token = await jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
}
