const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 01: Part 1', () => {
  it('Should calculate how many times the depth increated', () => {
    expect(part1(`199
200
208
210
200
207
240
269
260
263`)).to.equal(7);
  })
});
describe('Day 01: Part 2', () => {
  it('Should calculate how many times the 3-time measurments increated', () => {
    expect(part2(`199
200
208
210
200
207
240
269
260
263`)).to.equal(5);
  });
});
