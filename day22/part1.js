const disect = ([ax1, ax2], [bx1, bx2]) => {
  if (bx2 < ax1 || bx1 > ax2) {
    return [[ax1, ax2]];
  }

  if (bx1 <= ax1 && bx2 >= ax2) {
    return [];
  }

  if (bx1 <= ax1 && bx2 < ax2) {
    return [[bx2 + 1, ax2]];
  }

  if (bx2 >= ax2 && bx1 > ax1) {
    return [[ax1, bx1 - 1]];
  }

  return [[ax1, bx1 - 1], [bx2 + 1, ax2]];
}

const disect2d = ([ax1, ax2, ay1, ay2], [bx1, bx2, by1, by2]) => {
  if (by2 < ay1 || by1 > ay2 || bx2 < ax1 || bx1 > ax2) {
    return [[ax1, ax2, by1, by2]];
  }

  if (by1 <= ay1 && by2 >= ay2) {
    let sections2d = [];
    for (let [sx1, sx2] of disect([ax1, ax2], [bx1, bx2])) {
      sections2d.push([sx1, sx2, ay1, ay2]);
    }
    return sections2d;
  }

  if (by1 <= ay1 && by2 < ay2) {
    let sections2d = [];
    for (let [sx1, sx2] of disect([ax1, ax2], [bx1, bx2])) {
      sections2d.push([sx1, sx2, ay1, by2]);
    }
    sections2d.push([ax1, ax2, by2 + 1, ay2]);
    return sections2d;
  }

  if (by2 >= ay2 && by1 > ay1) {
    let sections2d = [];
    for (let [sx1, sx2] of disect([ax1, ax2], [bx1, bx2])) {
      sections2d.push([sx1, sx2, by1, ay2]);
    }
    sections2d.push([ax1, ax2, ay1, by1 - 1]);
    return sections2d;
  }

  let sections2d = [];
  sections2d.push([ax1, ax2, ay1, by1 - 1]);
  for (let [sx1, sx2] of disect([ax1, ax2], [bx1, bx2])) {
    sections2d.push([sx1, sx2, by1, by2]);
  }
  sections2d.push([ax1, ax2, by2 + 1, ay2]);

  return sections2d;
}

const disect3d = ([ax1, ax2, ay1, ay2, az1, az2], [bx1, bx2, by1, by2, bz1, bz2]) => {
  if (bz2 < az1 || bz1 > az2 || by2 < ay1 || by1 > ay2 || bx2 < ax1 || bx1 > ax2) {
    return [[ax1, ax2, ay1, ay2, az1, az2]];
  }

  if (bz1 <= az1 && bz2 >= az2) {
    let sections3d = [];
    for (let [sx1, sx2, sy1, sy2] of disect2d([ax1, ax2, ay1, ay2], [bx1, bx2, by1, by2])) {
      sections3d.push([sx1, sx2, sy1, sy2, az1, az2]);
    }
    return sections3d;
  }

  if (bz1 <= az1 && bz2 < az2) {
    let sections3d = [];
    for (let [sx1, sx2, sy1, sy2] of disect2d([ax1, ax2, ay1, ay2], [bx1, bx2, by1, by2])) {
      sections3d.push([sx1, sx2, sy1, sy2, az1, bz2]);
    }
    sections3d.push([ax1, ax2, ay1, ay2, bz2 + 1, az2]);
    return sections3d;
  }

  if (bz2 >= az2 && bz1 > az1) {
    let sections3d = [];
    for (let [sx1, sx2, sy1, sy2] of disect2d([ax1, ax2, ay1, ay2], [bx1, bx2, by1, by2])) {
      sections3d.push([sx1, sx2, sy1, sy2, bz1, az2]);
    }
    sections3d.push([ax1, ax2, ay1, ay2, az1, bz1 - 1]);
    return sections3d;
  }

  let sections3d = [];
  sections3d.push([ax1, ax2, ay1, ay2, az1, bz1 - 1]);
  for (let [sx1, sx2, sy1, sy2] of disect2d([ax1, ax2, ay1, ay2], [bx1, bx2, by1, by2])) {
    sections3d.push([sx1, sx2, sy1, sy2, bz1, bz2]);
  }
  sections3d.push([ax1, ax2, ay1, ay2, bz2 + 1, az2]);

  return sections3d;
}

module.exports = input =>
  input.split(/\r?\n/)
    .map(t => t.trim().match(/(\w+) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/))
    .map(([_, state, x1, x2, y1, y2, z1, z2]) => [state, +x1, +x2, +y1, +y2, +z1, +z2])
    .reduce((sections, [state, x1, x2, y1, y2, z1, z2]) => {
      if (Math.abs(x1) > 50 || Math.abs(x2) > 50
        || Math.abs(y1) > 50 || Math.abs(y2) > 50
        || Math.abs(z1) > 50 || Math.abs(z2) > 50) {
        return sections;
      }
      let newSections = [];
      let region = [x1, x2, y1, y2, z1, z2];

      for (let section of sections) {
        newSections.push(...disect3d(section, region));
      }
      if (state == 'on') {
        newSections.push(region);
      }
      return newSections;
    }, [])
    .reduce((sum, [x1, x2, y1, y2, z1, z2]) => sum + (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1), 0);