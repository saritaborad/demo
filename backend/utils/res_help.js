const giveresponse = function (res, status_code, success, message, data = null) {
 var data = data == null ? {} : data;
 const json_to_send = { status: status_code, success, message, data };
 return res.status(status_code).json(json_to_send);
};

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { asyncHandler, giveresponse };
