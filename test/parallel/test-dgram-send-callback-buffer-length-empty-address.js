'use strict';

const common = require('../common');
const assert = require('assert');

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const buf = Buffer.alloc(256, 'x');
const offset = 20;
const len = buf.length - offset;

const onMessage = common.mustCall(function messageSent(err, bytes) {
  assert.ifError(err);
  assert.notStrictEqual(bytes, buf.length);
  assert.strictEqual(bytes, buf.length - offset);
  client.close();
});

client.send(buf, offset, len, common.PORT, onMessage);
