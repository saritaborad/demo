const fs = require("fs");
const path = require("path");

const deleteFile = (filename) => {
 let filePath = path.join(__dirname + "../uploads/" + filename);
 if (filePath) if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

const getDynamicParams = (url) => {
 const regex = /\/_next\/data\/(.*?)\/challan-search.json/;
 const match = url.match(regex);
 const dynamicParameter = match ? match[1] : null;

 return dynamicParameter;
};

module.exports = { deleteFile, getDynamicParams };
