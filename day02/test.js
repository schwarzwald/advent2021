const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 02: Part 1', () => {
  it('Should calculate horizontal and vertical position after following instructions', () => {
    expect(part1(`forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`)).to.equal(150);
  });
});
describe('Day 02: Part 2', () => {
  it('Should calculate horizontal and vertical position after using aim within the instructions', () => {
    expect(part2(`forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`)).to.equal(900);
  });
});
