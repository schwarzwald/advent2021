const expect = require('expect.js');
const part1 = require('./part1');

describe('Day 25: Part 1', () => {
  it('Should calculate after how many steps the sea cucumbers stop to move', () => {
    expect(part1(`v...>>.vv>
    .vv>>.vv..
    >>.>v>...v
    >>v>>.>.v.
    v>v.vv.v..
    >.>>..v...
    .vv..>.>v.
    v.v..>>v.v
    ....v..v.>`)).to.equal(58);
  });
});
