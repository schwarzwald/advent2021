const max = (...args) => args.reduce((m, e) => e > m ? e : m);
const min = (...args) => args.reduce((m, e) => e < m ? e : m);

const read = (input, start, length) => {
  let result = 0n;
  let chunk = BigInt(parseInt(input[Math.floor(start / 4)], 16));

  for (let i = start; i < start + length; i++) {
    if (i % 4 == 0) {
      chunk = BigInt(parseInt(input[Math.floor(i / 4)], 16));

      if (start + length - i >= 4) {
        result = (result << 4n) | chunk;
        i += 3;
        continue;
      }
    }

    result = (result << 1n) | (1n & (chunk >> BigInt(3 - i % 4)));
  }
  return result;
}

const evaluate = (type, packets) => {
  switch (type) {
    case 0n: return packets.reduce((sum, p) => sum + p[2], 0n);
    case 1n: return packets.reduce((sum, p) => sum * p[2], 1n);
    case 2n: return min(...packets.map(p => p[2]));
    case 3n: return max(...packets.map(p => p[2]));
    case 5n: return packets[0][2] > packets[1][2] ? 1n : 0n;
    case 6n: return packets[0][2] < packets[1][2] ? 1n : 0n;
    case 7n: return packets[0][2] == packets[1][2] ? 1n : 0n;
  }
}

const readPacket = (input, i = 0) => {
  let version = read(input, i, 3);
  let type = read(input, i + 3, 3);
  i += 6;

  if (type == 4n) {
    let res = 0n;

    while (true) {
      let cont = read(input, i, 1);
      res = (res << 4n) | read(input, i + 1, 4);
      i += 5;

      if (cont == 0n) {
        return [version, type, res, [], i];
      }
    }
  }

  let contentType = read(input, i, 1);
  let packets = [];
  i++;

  if (contentType == 0) {
    let length = read(input, i, 15);
    i += 15;
    let target = BigInt(i) + length;

    while (i < target) {
      let packet = readPacket(input, i)
      i = packet[4];
      packets.push(packet);
    }
  } else {
    let length = read(input, i, 11);
    i += 11;

    for (let x = 0; x < length; x++) {
      let packet = readPacket(input, i);
      i = packet[4];
      packets.push(packet);
    }
  }

  return [version, type, evaluate(type, packets), packets, i];
}

module.exports = input => readPacket(input)[2];