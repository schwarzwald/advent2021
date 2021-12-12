const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 12: Part 1', () => {
  it('Should calculate number of different paths from start to end - small', () => {
    expect(part1(`start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`)).to.equal(10);
  });

  it('Should calculate number of different paths from start to end - medium', () => {
    expect(part1(`dc-end
    HN-start
    start-kj
    dc-start
    dc-HN
    LN-dc
    HN-end
    kj-sa
    kj-HN
    kj-dc`)).to.equal(19);
  });

  it('Should calculate number of different paths from start to end - big', () => {
    expect(part1(`fs-end
    he-DX
    fs-he
    start-DX
    pj-DX
    end-zg
    zg-sl
    zg-pj
    pj-he
    RW-he
    fs-DX
    pj-RW
    zg-RW
    start-pj
    he-WI
    zg-he
    pj-fs
    start-RW`)).to.equal(226);
  });
});
describe('Day 12: Part 2', () => {
  it('Should calculate number of different paths from start to end when small caves can be visited twice - small', () => {
    expect(part2(`start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`)).to.equal(36);
  });

  it('Should calculate number of different paths from start to end - medium', () => {
    expect(part2(`dc-end
    HN-start
    start-kj
    dc-start
    dc-HN
    LN-dc
    HN-end
    kj-sa
    kj-HN
    kj-dc`)).to.equal(103);
  });


  it('Should calculate number of different paths from start to end - big', () => {
    expect(part2(`fs-end
    he-DX
    fs-he
    start-DX
    pj-DX
    end-zg
    zg-sl
    zg-pj
    pj-he
    RW-he
    fs-DX
    pj-RW
    zg-RW
    start-pj
    he-WI
    zg-he
    pj-fs
    start-RW`)).to.equal(3509);
  });

});
