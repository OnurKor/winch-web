import { SignJWT, jwtVerify } from "jose";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getJwtSecretKey = () => {
  const secretKey = process.env.REACT_APP_JWT_SECRET_KEY;
  console.log(secretKey);
  if (!secretKey) {
    throw new Error("Jwt secret key is not avaliable");
  }
  return new TextEncoder().encode(secretKey);
};

export async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export async function setVerifyToken(data) {
  try {
    const token = await new SignJWT({
      username: data.ret,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(getJwtSecretKey());
    cookies.set("token", token, { path: "/" });
  } catch (error) {
    console.log("error");
  }
}
