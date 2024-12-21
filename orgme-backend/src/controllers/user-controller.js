/**
 * Controller method for get user info.
 * @param {*} req
 * @param {*} res
 */
const getuser = async (req, res) => {
  try {
    res.send("This is the user controller");
  } catch (e) {
    console.log("Error occurred in getuser: ", e);
    res.status(500).send("Error occurred");
  }
};

module.exports = { getuser };
