const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 17: Part 1', () => {
  it('Should calculate the highest y position it can achieve while hitting the target', () => {
    expect(part1('target area: x=20..30, y=-10..-5')).to.equal(45);
  });
});
describe('Day 17: Part 2', () => {
  it('Should calculate number of all possible initial velocities to hit the target', () => {
    expect(part2('target area: x=20..30, y=-10..-5')).to.equal(112);
  })
});
