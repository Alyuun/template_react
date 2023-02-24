import { BASE_URL } from "../config/config.js";

export default (req, res) => {
  res.render("header.ejs", { BASE_URL });
};