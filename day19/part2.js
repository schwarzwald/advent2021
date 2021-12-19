const rotx = [[1, 0, 0], [0, 0, 1], [0, -1, 0]];
const roty = [[0, 0, -1], [0, 1, 0], [1, 0, 0]];
const rotz = [[0, 1, 0], [-1, 0, 0], [0, 0, 1]];

class Cluster {

  constructor(id, points) {
    this.id = id;
    this.points = points;
    this.origin = [0, 0, 0];
    this.relative = [];

    for (let i = 0; i < this.points.length; i++) {
      let distances = new Set();
      this.relative.push(distances);

      for (let j = 0; j < this.points.length; j++) {
        if (i != j) {
          distances.add(this._manhattan(this.points[i], this.points[j]));
        }
      }
    }
  }

  compareRelativeDistance(c2) {
    let d1 = this.relative;
    let d2 = c2.relative;

    for (let p of d1) {
      for (let q of d2) {
        let count = 0;
        for (let distance of p) {
          if (q.has(distance)) {
            count++;
          }
          if (count >= 11) {
            return true;
          }
        }
      }
    }

    return false;
  }

  _manhattan(p, q) {
    return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]);
  }

  multiply(matrix) {
    this.points.forEach(p => this._mul3(p, matrix));
    this._mul3(this.origin, matrix);
    return this;
  }

  flip() {
    this.points.forEach(p => {
      p[0] *= -1;
      p[2] *= -1;
    });
    this.origin[0] *= -1;
    this.origin[2] *= -1;
  }

  add(vec) {
    this.points.forEach(p => {
      p[0] += vec[0];
      p[1] += vec[1];
      p[2] += vec[2];
    });

    this.origin[0] += vec[0];
    this.origin[1] += vec[1];
    this.origin[2] += vec[2];
    return this;
  }


  _mul3(vec, matrix) {
    let [a, b, c] = vec;
    vec[0] = a * matrix[0][0] + b * matrix[1][0] + c * matrix[2][0];
    vec[1] = a * matrix[0][1] + b * matrix[1][1] + c * matrix[2][1];
    vec[2] = a * matrix[0][2] + b * matrix[1][2] + c * matrix[2][2];
    return vec;
  }

  match(c2) {
    return this._countOverlaps(c2) >= 12;
  }

  _countOverlaps(c2) {
    let count = 0;

    for (let p of this.points) {
      for (let q of c2.points) {
        if (p[0] == q[0] && p[1] == q[1] && p[2] == q[2]) {
          count++;
        }
      }
    }

    return count;
  }

}

const fit = (c1, c2) => {
  if (!c1.compareRelativeDistance(c2)) {
    return null;
  }

  let fitted = fitAlongX(c1, c2);
  if (fitted) {
    return fitted;
  }

  fitted = fitAlongX(c1, c2.multiply(rotz));
  if (fitted) {
    return fitted;
  }

  fitted = fitAlongX(c1, c2.multiply(roty));
  if (fitted) {
    return fitted;
  }
}

const fitAlongX = (c1, c2) => {
  for (let flip = 0; flip < 2; flip++) {
    if (flip) {
      c2.flip();
    }

    for (let i = 0; i < 4; i++) {
      if (i > 0) {
        c2.multiply(rotx);
      }

      let fitted = fitByTranslate(c1, c2);
      if (fitted) {
        return fitted;
      }
    }
  }
}

const fitByTranslate = (c1, c2) => {
  if (c1.match(c2)) {
    return c2;
  }

  for (let i = 0; i < c1.points.length; i++) {
    for (let j = 0; j < c2.points.length; j++) {
      c2.add(c1.points[i].map((v, k) => v - c2.points[j][k]));
      if (c1.match(c2)) {
        return c2;
      }
    }
  }
}

const manhattan = (v1, v2) => {
  return Math.abs(v1[0] - v2[0]) + Math.abs(v1[1] - v2[1]) + Math.abs(v1[2] - v2[2]);
}

module.exports = input => {
  let points = [];
  let clusters = [];
  for (let line of input.split(/\r?\n/)) {
    if (line.includes('---')) {
      if (points.length) {
        clusters.push(new Cluster(clusters.length, points));
        points = [];
      }
    } else if (line.trim().length) {
      points.push(line.split(',').map(Number));
    }
  }
  if (points.length) {
    clusters.push(new Cluster(clusters.length, points))
  }

  let available = clusters.slice(1);
  let current = clusters[0];
  let assembled = [current];
  let queue = [];

  while (available.length) {
    let finished = true;

    for (let i = 0; i < available.length; i++) {
      let fitted = fit(current, available[i]);

      if (fitted) {
        assembled.push(fitted);
        queue.push(fitted);
        available.splice(i, 1);
        finished = false;
        break;
      }
    }
    if (finished) {
      current = queue.pop();
    }
  }

  let max = 0;
  for (let i = 0; i < assembled.length - 1; i++) {
    for (let j = i + 1; j < assembled.length; j++) {
      max = Math.max(max, manhattan(assembled[i].origin, assembled[j].origin));
    }
  }

  return max;
}
