import cookie from "cookie";

export default (req, res) => {
  console.log(req.body);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 2,
      sameSite: "lax",
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
