'use strict';
const path = require('path');
const metalsmith = require('metalsmith');
const define = require('metalsmith-define');
const inplace = require('metalsmith-in-place');

module.exports = {
  addons: {
    njkRender: function(root, from, to, vars) {
      let logger = this.logger;

      logger.silly('Path from: ', from);
      logger.silly('Path to  : ', to);
      logger.silly('vars     : ', vars);
      logger.silly('Path root: ', root);

      let p = new Promise((resolve, reject) => {
        metalsmith(root)
          .source(from)
          .destination(to)
          .clean(false)
          .use(define(vars))
          .use(inplace({
            engine: 'nunjucks'
          }))
          .use(function(files, metals, done) {
            logger.silly('files:', files);
            logger.silly('metalsmith:', metals);
            done();
          })
          .build((err) => {
            logger.silly('#orange', 'building...');
            if (err) {
              logger.error('#red', err);
              reject(err);
            }
            logger.silly('#green', 'Guide generated correctly');
            resolve();
          });
      });
      return p;
    }
  }
};
