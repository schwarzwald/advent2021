const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 15: Part 1', () => {
  it('Should calculate the lowest risk level for any path', () => {
    expect(part1(`1163751742
    1381373672
    2136511328
    3694931569
    7463417111
    1319128137
    1359912421
    3125421639
    1293138521
    2311944581`)).to.equal(40);
  });
});
describe('Day 15: Part 2', () => {
  it('Should calculate the lowest risk level for any path on a 5 times larger map', () => {
    expect(part2(`1163751742
    1381373672
    2136511328
    3694931569
    7463417111
    1319128137
    1359912421
    3125421639
    1293138521
    2311944581`)).to.equal(315);
  });
});
