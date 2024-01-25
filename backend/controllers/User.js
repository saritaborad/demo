const { asyncHandler, giveresponse } = require("../utils/res_help");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const puppeteer = require("puppeteer");
const { getDynamicParams } = require("../utils/commonFunc");

exports.register = asyncHandler(async (req, res, next) => {
 const { username, password, email } = req.body;
 const user = await User.findOne({ email });
 if (user) {
  return giveresponse(res, 400, false, "User already registered!");
 }
 const hashPass = await bcrypt.hash(password, 10);
 await User.create({ username, email, password: hashPass });
 return giveresponse(res, 200, true, "User registerd success");
});

exports.login = asyncHandler(async (req, res, next) => {
 const { email, password } = req.body;

 const user = await User.findOne({ email });
 if (!user) return giveresponse(res, 404, false, "User not found!");

 let matchPass = await bcrypt.compare(password, user.password);
 if (!matchPass) {
  return giveresponse(res, 400, false, "Invalid credential!");
 }
 const token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
 res.cookie("token", token);
 return giveresponse(res, 200, true, "Login success");
});

exports.captureNetworkRequests = asyncHandler(async (req, res, next) => {
 const { targetURL } = req.body;
 const browser = await puppeteer.launch();
 const page = await browser.newPage();

 await page.setRequestInterception(true);

 page.on("request", (request) => {
  request.continue();
 });

 const requests = [];
 page.on("response", (response) => {
  requests.push({
   url: response.url(),
   status: response.status(),
   method: response.request().method(),
  });
 });

 await page.goto(targetURL);
 const filteredUrls = requests.filter((entry) => entry.url.includes("/_next/data/") && entry.url.includes("/challan-search.json")).map((entry) => entry.url);
 await browser.close();

 const dynamicParameter = getDynamicParams(filteredUrls[0]);
 const reconstructedUrl = `https://www.carinfo.app/_next/data/${dynamicParameter}/challan-search.json`;

 return giveresponse(res, 200, true, "success", reconstructedUrl);
});
