'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const plugin = require('../plugins/nunjucks');

function initPlugin(p) {
  p.addons.logger = require('piscosour/lib/logger.js');
}

describe('Pisco plugin commons test:', function() {

  it('Should have addons', function(done) {
    assert.isObject(plugin.addons);
    done();
  });
});

describe('Pisco plugin nunjucks test:', function() {
  it('Should addon \'njkRender\' be a function', function(done) {
    assert.isFunction(plugin.addons.njkRender);
    done();
  });

  it('Should render nunjunks templates from/to a path', function(done) {
    let fromFile = './test/test1/from/test1.njk';
    let toFile = './test/test1/to/test1.njk';

    //Initialize Test Environment
    initPlugin(plugin);
    let initTestEnv = new Promise((resolve, reject) => {
      fs.writeFile(fromFile, 'one, {{ two }}, three', function(err) {
        assert.isNull(err, `file '${fromFile}' is not been written`);

        fs.writeFile(toFile, 'Hey there!', function(err) {
          assert.isNull(err, `file '${toFile}' is not been written`);

	  resolve();
        });
      });
    });

    //plugin njkRender tested:
    initTestEnv.then(
      plugin.addons.njkRender(path.resolve('./test/test1'), 'from', 'to', { two: 'four' })
        .then(() => {
          fs.readFile(toFile, 'utf8', function (err, data) {
            assert.isNull(err, `file '${toFile}' does not open`);
            assert.equal(data, 'one, four, three', `nunjucks file '${toFile}' render fails`);
            done();
          })
        })
        .catch((reason) => {
          assert.fail(false, reason);
        }));
  });

  it('Should render nunjunks templates in the same path', function(done) {
    let fromtoFile = './test/test2/fromto/test2.njk';

    //Initialize Test Environment
    initPlugin(plugin);
    let initTestEnv = new Promise((resolve, reject) => {
      fs.writeFile(fromtoFile, 'one,{% for item in items %}{{ item.title }},{% endfor %}four', function(err) {
        assert.isNull(err, `file '${fromtoFile}' is not been written`);
        resolve();
      });
    });

    //plugin njkRender tested:
    initTestEnv.then(
      plugin.addons.njkRender(path.resolve('./test'), 'test2/fromto', 'test2/fromto', {items: [{title: 'two'}, {title: 'three'}]})
        .then(() => {
          fs.readFile(fromtoFile, 'utf8', function (err, data) {
            assert.isNull(err, `file '${fromtoFile}' does not open`);
            assert.equal(data, 'one,two,three,four', `nunjucks file '${fromtoFile}' render fails`);
            done();
          })
        })
        .catch((reason) => {
          assert.fail(false, reason);
        }));
  });
});
