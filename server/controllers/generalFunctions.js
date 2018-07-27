// Constant response strings
const DB_ERR = "Database error.";
const INVALID_REQUEST = "Bad Request";
const INVALID_DETAILS = "Invalid details";
const INVALID_TIME = "Timestamp invalid or out of date.";
const NO_RECIPIENT = "Target doesn't exist";
const NOT_ALLOWED = "Action not allowed";
const INVALID_ID = "Conversation id is invalid";
const IMG_URL_START = "http://it-project.herokuapp.com/img/Av";
const IMG_FILE_TYPE = ".jpg";
const DEFAULT_PIC = 'http://it-project.herokuapp.com/img/Av0.jpg';
const USER_TAKEN = "Username is taken.";

// Constant values
const AUTH_USERNAME = 0;
const AUTH_TOKEN = 1;
const PENDING_CONNECTION = 0;
const FRIEND_CONNECTION = 1;
const BLOCKED_CONNECTION = 2;
const CONBLOCK_SIZE = 10;



var creationErrorCallback = function(err){
  if(err){
    res.status(500).json({"error":DB_ERR}); // sends an error if write fails
  }
}

var badRequestRes = function(res){
  res.status(400).json({"error":INVALID_REQUEST});
}

var unauthorizedRes = function(res){
  res.status(401).json({"error":INVALID_DETAILS});
}

var dbErrorRes = function(res){
  res.status(500).json({"error":DB_ERR});
}

var conflictRes = function(res){
  res.status(409).json({"error":NOT_ALLOWED})
}

var badTimeRes = function(res){
  res.status(409).json({"error":INVALID_TIME})
}

var forbiddenRes = function(res){
  res.status(403).json({"error":NOT_ALLOWED})
}

var targetConflictRes = function(res){
  res.status(422).json({"error":NO_RECIPIENT});
}

var invalidConBlockId = function(res){
  res.status(422).json({"error":INVALID_ID});
}

var usernameTaken = function(res){
  res.status(422).json({"error":USER_TAKEN});
}

var successNoData = function(res){
  res.sendStatus(200);
}

var successCreated = function(res){
  res.sendStatus(201);
}


module.exports.creationErrorCallback = creationErrorCallback;
module.exports.badRequestRes = badRequestRes;
module.exports.unauthorizedRes = unauthorizedRes;
module.exports.dbErrorRes = dbErrorRes;
module.exports.conflictRes = conflictRes;
module.exports.badTimeRes = badTimeRes;
module.exports.forbiddenRes = forbiddenRes;
module.exports.targetConflictRes = targetConflictRes;
module.exports.invalidConBlockId = invalidConBlockId;
module.exports.usernameTaken = usernameTaken;
module.exports.successNoData = successNoData;
module.exports.successCreated = successCreated;
module.exports.DEFAULT_PIC = DEFAULT_PIC;
module.exports.AUTH_USERNAME = AUTH_USERNAME;
module.exports.AUTH_TOKEN = AUTH_TOKEN;
module.exports.FRIEND_CONNECTION = FRIEND_CONNECTION;
module.exports.PENDING_CONNECTION = PENDING_CONNECTION;
module.exports.CONBLOCK_SIZE = CONBLOCK_SIZE;
module.exports.IMG_URL_START = IMG_URL_START;
module.exports.IMG_FILE_TYPE = IMG_FILE_TYPE;
