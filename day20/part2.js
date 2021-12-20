const enhance = (image, algorithm, round) => {
  let empty = 0;
  for (let r = 0; r <= round % 2; r++) {
    empty = 511 * (algorithm[empty] == '#' ? 1 : 0);
  }

  let paddingType = algorithm[empty];
  let paddingLarge = paddingType.repeat(image[0].length)
  let paddingSmall = paddingType.repeat(2);

  let padded = [paddingLarge, paddingLarge, ...image, paddingLarge, paddingLarge];
  padded = padded.map(p => paddingSmall + p + paddingSmall);

  let enhanced = [];
  for (let y = 1; y < padded.length - 1; y++) {
    enhanced[y - 1] = '';

    for (let x = 1; x < padded[0].length - 1; x++) {
      let number = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          number = (number << 1) | (padded[y + i][x + j] == '#' ? 1 : 0);
        }
      }
      enhanced[y - 1] += algorithm[number];
    }
  }

  return enhanced;
}

module.exports = input => {
  let lines = input.split(/\r?\n/);
  let algorithm = lines[0].trim();
  let image = lines.slice(2).map(t => t.trim());

  let enhanced = image;
  for (let i = 0; i < 50; i++) {
    enhanced = enhance(enhanced, algorithm, i);
  }

  return enhanced.reduce((sum, c) => [...c].filter(x => x == '#').length + sum, 0);
}
