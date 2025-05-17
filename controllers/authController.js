import oauth2client from "../utils/googleConfig.js";
import axios from "axios";
const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleRes.tokens.access_token}`,
        },
      }
    );

    const { email, name, picture } = userRes.data;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        image: picture,
      });
    }
    if (!email || !name) {
      return res.status(400).json({ message: "Missing user info from Google" });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  } catch (err) {
    console.error(
      "Google login error:",
      err.response?.data || err.message || err
    );
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default googleLogin;
