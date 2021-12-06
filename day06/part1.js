module.exports = input => {
  let fish = input.split(',').map(Number);

  for (let i = 0; i < 80; i++) {
    let size = fish.length;
    for (let j = 0; j < size; j++) {
      if (fish[j] == 0) {
        fish.push(8);
      }

      fish[j] = fish[j] > 0 ? fish[j] - 1 : 6;
    }
  }

  return fish.length;
}
