/*{
    "sourceMaps": "inline",
    "presets": [
      ["@babel/env", {
        "targets": {
          "node": "current"
        }
      }]
    ],
    "ignore": ["/node_modules/"],
    "plugins": [
      ["module-resolver", { 
        "alias": {
          "shared": "../shared/src"
        }
      }]
    ]
  }
  */
module.exports = function (api) {
  api.cache(true)
  console.log("Using root babel.config.js")
  const presets = [["@babel/env", {
    "targets": {
      "node": "current"
    }
  }]];
  const plugins = [];

  return {
    presets,
    plugins,
    ignore
  };
}