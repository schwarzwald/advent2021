const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 03: Part 1', () => {
  it('Should calculate power consumption of the submarine by multiplying the gamma rate with epsilon rate', function () {
    expect(part1(`00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`)).to.equal(198);
  });
});
describe('Day 03: Part 2', () => {
  it('Should calculate life support rating of the submarine by multiplying the CO2 scrubber rating with the oxygen generator rating', function () {
    expect(part2(`00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`)).to.equal(230);
  });
});
