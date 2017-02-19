/* global describe, it */
'use strict';

require('chai').should();
const { CrawlItem } = require('../src/model');

describe('CrawlItem', ()=>{
    describe('constructor', ()=>{
        it('should create private url member', ()=>{
            const url = 'http://test.com/path';
            const item = new CrawlItem(url);
            item.url.should.equal(url);
        });
    });
});