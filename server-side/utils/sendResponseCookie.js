const sendResponseCookie = async (res, token) => {
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    domain: process.env.DOMAIN,
  };

  await res.cookie("token", token, options);
};

module.exports = sendResponseCookie;
