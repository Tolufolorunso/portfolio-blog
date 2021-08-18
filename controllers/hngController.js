exports.resume = (req, res, next) => {
  console.log(req)
  res.status(200).render('resume')
}

exports.contact = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(404).render('error')
  }
}
