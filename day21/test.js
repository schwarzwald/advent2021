const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 21: Part 1', () => {
  it('Should calculate score of the losing player with the number of total dice rolls', () => {
    expect(part1(`Player 1 starting position: 4
    Player 2 starting position: 8`)).to.equal(739785);
  });
});
describe('Day 21: Part 2', () => {
  it('Should calculate score of the losing player with the number of total dice rolls', () => {
    expect(part2(`Player 1 starting position: 4
    Player 2 starting position: 8`)).to.equal(444356092776315);
  });
});
