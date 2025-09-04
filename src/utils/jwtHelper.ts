import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

async function generateToken(payload: { userId: number }, secret: Secret) {
  const token = await jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
}

async function getUserInfoFromToken(token: string) {
  try {
    const userData = (await jwt.verify(token, config.jwt.secret as string)) as {
      userId: number;
    };
    return userData;
  } catch (err) {
    return null;
  }
}

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
