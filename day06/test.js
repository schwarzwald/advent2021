const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 06: Part 1', () => {
  it('Should calculate how many lanternfish would there be after certain number of days', () => {
    expect(part1('3,4,3,1,2')).to.equal(5934);
  })
});
describe('Day 06: Part 2', () => {
  it('Should calculate how many lanternfish would there be after certain number of days', () => {
    expect(part2('3,4,3,1,2')).to.equal(26984457539);
  });
});
