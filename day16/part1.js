const read = (input, start, length) => {
  let result = 0;
  let chunk = parseInt(input[Math.floor(start / 4)], 16);;

  for (let i = start; i < start + length; i++) {
    if (i % 4 == 0) {
      chunk = parseInt(input[Math.floor(i / 4)], 16);
      if (start + length - i >= 4) {
        result = (result << 4) | chunk;
        i += 3;
        continue;
      }
    }

    result = (result << 1) | 1 & (chunk >> (3 - i % 4));
  }
  return result;
}

const readPacket = (input, i = 0) => {
  let version = read(input, i, 3);
  let type = read(input, i + 3, 3);
  i += 6;

  if (type == 4) {
    let res = 0;
    let cont = 0;

    do {
      cont = read(input, i, 1);
      res = (res << 4) | read(input, i + 1, 4);
      i += 5;
    } while (cont == 1);

    return [version, type, res, [], i];
  }

  let contentType = read(input, i, 1);
  let packets = [];
  i++;

  if (contentType == 0) {
    let length = read(input, i, 15);
    i += 15;
    let target = i + length;

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

  return [version, type, 0, packets, i];
}

const count = (packet) => packet[0] + packet[3].reduce((sum, p) => sum + count(p), 0);

module.exports = input => count(readPacket(input));
