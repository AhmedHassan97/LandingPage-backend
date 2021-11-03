const authResolver = require("../../services/auth");

const rootResolver = {
  ...authResolver,
};

module.exports = rootResolver;
