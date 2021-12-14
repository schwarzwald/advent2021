const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 14: Part 1', () => {
  it('Should calculate the difference between the most frequent and less frequent letter after 10 rounds', () => {
    expect(part1(`NNCB

    CH -> B
    HH -> N
    CB -> H
    NH -> C
    HB -> C
    HC -> B
    HN -> C
    NN -> C
    BH -> H
    NC -> B
    NB -> B
    BN -> B
    BB -> N
    BC -> B
    CC -> N
    CN -> C`)).to.equal(1588);
  });
});
describe('Day 14: Part 2', () => {
  it('Should calculate the difference between the most frequent and less frequent letter after 40 rounds ', () => {
    expect(part2(`NNCB

    CH -> B
    HH -> N
    CB -> H
    NH -> C
    HB -> C
    HC -> B
    HN -> C
    NN -> C
    BH -> H
    NC -> B
    NB -> B
    BN -> B
    BB -> N
    BC -> B
    CC -> N
    CN -> C`)).to.equal(2188189693529);
  });
});
