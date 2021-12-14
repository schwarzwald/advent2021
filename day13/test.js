const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 13: Part 1', () => {
  it('Should calculate number of visible dots after the first fold', () => {
    expect(part1(`6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0
    
    fold along y=7
    fold along x=5`)).to.equal(17);
  });
});
describe('Day 13: Part 2', () => {
  it('Should display the image after folding it', () => {
    expect(part2(`6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0
    
    fold along y=7
    fold along x=5`)).to.equal(`#####\n#   #\n#   #\n#   #\n#####`);
  });
});
