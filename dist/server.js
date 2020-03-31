"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = (0, _express["default"])();
server.use("/", _routes["default"]);
server.listen(_config["default"].PORT, function () {
  console.log("Running at http://localhost:".concat(_config["default"].PORT, "!"));
});
var _default = server;
exports["default"] = _default;