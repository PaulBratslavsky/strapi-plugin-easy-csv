'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('easy-csv')
      .service('myService')
      .getWelcomeMessage();
  },
});
