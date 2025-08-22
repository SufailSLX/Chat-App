import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;
  console.log({ token });
  if (!token) return res.status(401).send("Yor are not authenticated");
  jwt.verify(token, process.env.JWT_SECRECT, async (err, payload) => {
    if (err) return res.status(403).send("Token not valid");
    res.userId = payload.userId;
    next();
  });
};
