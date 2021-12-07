const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 07: Part 1', () => {
  it('Should calculate the fuel consumption to get to the best position', () => {
    expect(part1('16,1,2,0,4,2,7,1,2,14')).to.equal(37);
  })
});
describe('Day 07: Part 2', () => {
  it('Should calculate the fuel consumption to get to the best position, with increasing consumption rate', () => {
    expect(part2('16,1,2,0,4,2,7,1,2,14')).to.equal(168);
  })
});
