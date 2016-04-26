var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var proxyquire = require('proxyquire');

var request = require('superagent');
var Promise = require('bluebird');

chai.use(sinonChai);

var BOT_TOKEN = 'botToken';
var CHAT_ID = 'chatId';
/* eslint-disable no-unused-expressions */
describe('Testing error-shout-bot', function() {
  var ErrorShout = proxyquire('../index', { 'request': request });

  var requestGetSpy;
  var requestPostSpy;

  beforeEach(function() {
    requestGetSpy = sinon.spy(request, 'get');
    requestPostSpy = sinon.spy(request, 'post');
  });

  afterEach(function() {
    request.get.restore();
    request.post.restore();
  });

  it('ErrorShout Should have default function defined', function() {
    expect(ErrorShout).be.function;
  });

  var Shout = new ErrorShout(BOT_TOKEN, CHAT_ID);
  it('Shout.getBotName should be a function', function() {
    expect(Shout.getBotName).be.function;
  });

  it('Shout.getBotName should return a promise', function() {
    expect(Shout.getBotName()).be.instanceOf(Promise);
  });

  it('Shout.getBotName should make a get Request', function() {
    Shout.getBotName();
    expect(requestGetSpy).to.be.called;
  });

  it('Shout.sendError should be a function', function() {
    expect(Shout.sendError).be.function;
  });

  it('Shout.sendError should return a promise', function() {
    expect(Shout.sendError('something')).be.instanceOf(Promise);
  });

  it('Shout.sendError should make a post Request', function() {
    Shout.sendError('something');
    expect(requestPostSpy).to.be.called;
  });
});
/* eslint-disable no-unused-expressions */
