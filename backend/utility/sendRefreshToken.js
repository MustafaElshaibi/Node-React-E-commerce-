
module.exports = (res, refresh) => {
  res.cookie("refreshToken", refresh, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
}