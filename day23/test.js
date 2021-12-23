const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 23: Part 1', () => {
  it('Should calculate the minimal energy required to sort the amphipods', () => {
    expect(part1(
      `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`)).to.equal(12521);
  });
});
describe('Day 23: Part 2', function () {
  this.timeout(10000);
  it('Should calculate the minimal energy required to sort the amphipods with additional lines', () => {
    expect(part2(
      `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`)).to.equal(44169);
  });
});
