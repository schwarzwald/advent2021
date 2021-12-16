const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 16: Part 1', () => {
  it('Should calculate sum of versions of all packets', () => {
    expect(part1('8A004A801A8002F478')).to.equal(16);
    expect(part1('620080001611562C8802118E34')).to.equal(12);
    expect(part1('C0015000016115A2E0802F182340')).to.equal(23);
    expect(part1('A0016C880162017C3686B18A3D4780')).to.equal(31);
  });
});
describe('Day 16: Part 2', () => {
  it('Should evaluate the packet values based on the operators', () => {
    expect(part2('C200B40A82')).to.equal(3n);
    expect(part2('04005AC33890')).to.equal(54n);
    expect(part2('880086C3E88112')).to.equal(7n);
    expect(part2('CE00C43D881120')).to.equal(9n);
    expect(part2('D8005AC2A8F0')).to.equal(1n);
    expect(part2('F600BC2D8F')).to.equal(0n);
    expect(part2('9C005AC2F8F0')).to.equal(0n);
    expect(part2('9C0141080250320F1802104A08')).to.equal(1n);
  });
});
