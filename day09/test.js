const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 09: Part 1', () => {
  it('Should calculate the sum of risk levels for all lowpoints', () => {
    expect(part1(`2199943210
3987894921
9856789892
8767896789
9899965678`)).to.equal(15);
  });
});
describe('Day 09: Part 2', () => {
  it('Should calculate the product of size of three largest basins', () => {
    expect(part2(`2199943210
3987894921
9856789892
8767896789
9899965678`)).to.equal(1134);
  });
});
