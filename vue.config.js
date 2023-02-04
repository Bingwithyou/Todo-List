const { defineConfig } = require("@vue/cli-service");
const ENV = process.env.NODE_ENV;
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: ENV === "development" ? "" : "/Todo-List/",
});
