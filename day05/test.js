const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 05: Part 1', () => {
  it('Should calculate how many points are crossed by at least two horizontal or vertical lines', () => {
    expect(part1(`0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`)).to.equal(5);
  });
});
describe('Day 05: Part 2', () => {
  it('Should calculate how many points are crossed by at least two lines', () => {
    expect(part2(`0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`)).to.equal(12);
  });
});
