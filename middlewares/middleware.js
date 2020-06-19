exports.appTime = (req, res, next) => {
  const now = new Date();
  req.time = {
    year: now.getFullYear(),
    today: now.toDateString(),
  };
  next();
};

exports.globalError = (error, req, res, next) => {
  if (error) {
    res.status(422).render("error", {
      title: "Error page",
      time: req.time,
      error: error.message,
      isAuthenticated: req.session.isLoggedIn,
    });
  }
};

exports.authorize = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/admin/login");
  }
  next();
};
