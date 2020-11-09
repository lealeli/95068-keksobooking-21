const path = require("path");

module.exports = {
  entry: [
    "./js/server.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/util.js",
    "./js/map.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
};
