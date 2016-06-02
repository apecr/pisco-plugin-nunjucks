'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const plugin = require('../plugins/nunjucks/plugin.js');

describe('Pisco plugin commons test:', function() {
  it('Should have a description', function(done) {
    chai.assert.isString(plugin.description);
    chai.assert(plugin.description.length > 6, 'string has length > 6');
    done();
  });

  it('Should have addons', function(done) {
    chai.assert.isObject(plugin.addons);
    done();
  });
});

describe('Pisco plugin nunjucks test:', function() {
  it('Should addon \'njkRender\' be a function', function(done) {
    chai.assert.isFunction(plugin.addons.njkRender);
    done();
  });

  it('Should render nunjunks templates from/to a path', function(done) {
    let fromFile = './test/test1/from/test1.njk';
    let toFile = './test/test1/to/test1.njk';

    //Creating the templates files
    fs.writeFile(fromFile, 'one, {{ two }}, three', function(err) {
      chai.assert.isNull(err, `file '${fromFile}' is not been written`);
    });

    fs.writeFile(toFile, 'Hey there!', function(err) {
      chai.assert.isNull(err, `file '${toFile}' is not been written`);
    });

    //plugin njkRender tested:
    plugin.addons.njkRender(path.resolve('./test/test1'), 'from', 'to', { two: 'four' })
      .then(() => {
        fs.readFile(toFile, 'utf8', function (err, data) {
          chai.assert.isNull(err, `file '${toFile}' does not open`);
          chai.assert.equal(data, 'one, four, three', `nunjucks file '${toFile}' render fails`);
          done();
        })
      })
      .catch((reason) => {
        chai.assert.fail(false, reason);
      });
  });

  it('Should render nunjunks templates in the same path', function(done) {
    let fromtoFile = './test/test2/fromto/test2.njk';

    //Creating the templates files
    fs.writeFile(fromtoFile, 'one,{% for item in items %}{{ item.title }},{% endfor %}four', function(err) {
      chai.assert.isNull(err, `file '${fromtoFile}' is not been written`);
    });

    //plugin njkRender tested:
    plugin.addons.njkRender(path.resolve('./test'), 'test2/fromto', 'test2/fromto', {items: [{title: 'two'}, {title: 'three'}]})
      .then(() => {
        fs.readFile(fromtoFile, 'utf8', function (err, data) {
          chai.assert.isNull(err, `file '${fromtoFile}' does not open`);
          chai.assert.equal(data, 'one,two,three,four', `nunjucks file '${fromtoFile}' render fails`);
          done();
        })
      })
      .catch((reason) => {
        chai.assert.fail(false, reason);
      });
  });
});
