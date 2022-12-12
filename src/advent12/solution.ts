
import { ISolution, InputFile, Vector2, Dictionary, Compass, Util } from '../shared';
import Graph from 'node-dijkstra';
import { string } from 'mathjs';

export class HeightSquare extends Vector2 {
   ch: string = '';
   constructor(x: number, y: number, public signal: number) {
      super(x, y);
      this.ch = String.fromCharCode(signal);
   }
}

export class HeightMap {
   space: Dictionary<HeightSquare> = {};
   graph: Graph = new Graph();
   start: string = '';
   finish: string = '';

   constructor(input: string[]) {
      let width: number = input[0].length;
      let height: number = input.length;
      let hm = input.map(x => x.split('').map(x => x))

      // parse the input
      for (let j = 0; j < height; j++) {
         for (let i = 0; i < width; i++) {
            const cc = hm[j][i].replace('S','a').replace('E','z').charCodeAt(0)
            const sq = new HeightSquare(i, j, cc)
            this.space[sq.id()] = sq;
            if (hm[j][i] === 'S') { this.start = sq.id(); }
            if (hm[j][i] === 'E') { this.finish = sq.id(); }
         }
      }

      // build the graph
      for (let y = 0; y < height; y++) {
         for (let x = 0; x < width; x++) {
            this.addNode(this.squareAt(x, y)!)
         }
      }

      //console.log(this.graph);
   }

   squareAt(x: number, y: number, d: Compass | null = null): HeightSquare | null {
      if (d === Compass.East) x++
      if (d === Compass.West) x--;
      if (d === Compass.North) y--;
      if (d === Compass.South) y++;

      const id = `${x},${y}`;
      return id in this.space ? this.space[id] : null;
   }

   addNode(sq: HeightSquare) {
      let n = this.squareAt(sq.x, sq.y, Compass.North);
      let s = this.squareAt(sq.x, sq.y, Compass.South);
      let e = this.squareAt(sq.x, sq.y, Compass.East);
      let w = this.squareAt(sq.x, sq.y, Compass.West);

      let edges: Dictionary<number> = {};
      [n,s,e,w].filter(x => x !== null).forEach(x => {
         let sd = x!.signal - sq.signal;
         if (sd <= 1) {
            edges[x!.id()] = 1;
         }
      });

      this.graph.addNode(sq.id(), edges);
   }
}

class Solution12 implements ISolution {
   dayNumber: number = 12;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let hm = new HeightMap(inputFile.readLines());
      let hmp = hm.graph.path(hm.start,hm.finish);

      return '' + ((hmp as string[]).length - 1);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let hm = new HeightMap(inputFile.readLines());

      return '';
   }
}

export default new Solution12() as ISolution;
