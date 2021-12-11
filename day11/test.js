const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 11: Part 1', () => {
  it('Should calculate how many flashes there were after 100 rounds', () => {
    expect(part1(`5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`)).to.equal(1656);
  })
});
describe('Day 11: Part 2', () => {
  it('Should calculate how after how many steps all octopuses flash at once', () => {
    expect(part2(`5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`)).to.equal(195);
  })
});
