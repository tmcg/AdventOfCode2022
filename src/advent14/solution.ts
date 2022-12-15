
import { ISolution, InputFile, Util, Dictionary, Vector2 } from '../shared';

type CaveTile = '.' | '#' | 'o';

export class SandCave {
   points: Dictionary<CaveTile> = {};
   abyss: number = 0;
   part2: boolean = false

   constructor(input: string[], part2: boolean = false) {
      this.part2 = part2;
      this.addPoints(input);
      this.abyss = Math.max(...Object.keys(this.points).map(k => parseInt(k.split(',')[1]))) + 2;
      if (this.part2) {
         this.addPoints([`-2000,${this.abyss} -> 2000,${this.abyss}`]);
      }
   }

   addPoints(input: string[]) {
      let lines = input
         .map(ax => ax.split(' -> '))
         .map(bx => bx
            .map((e,i) => [e, bx[i+1]])
            .filter(t => t[1] > '')
            .map(pa => pa.map(pb => {
               let pn: number[] = pb.split(',').map(n => +n); 
               return new Vector2(pn[0], pn[1]);
            })));

      for (let j = 0; j < lines.length; j++) {
         for (let i = 0; i < lines[j].length; i++) {
            let start: Vector2 = lines[j][i][0];
            let finish: Vector2 = lines[j][i][1];

            if (start.x === finish.x) {
               // move in y
               let yy: number[] = [start.y, finish.y].sort();
               for (let cy = yy[0]; cy <= yy[1]; cy++) {
                  this.points[`${start.x},${cy}`] = '#'
               }
            } else {
               // move in x
               let xx: number[] = [start.x, finish.x].sort();
               for (let cx = xx[0]; cx <= xx[1]; cx++) {
                  this.points[`${cx},${start.y}`] = '#'
               }
            }
         }
      }
   }

   tileAt(pos: string): CaveTile {
      return this.points[pos] ?? '.';
   }

   addSand(): boolean {
      //let log = Util.createLogger();

      let pos = new Vector2(500, 0);
      let tileId: (x: number, y: number) => string = 
         (x,y) => `${x},${y}`;

      while (true) {
         //log.info(`sand moving: ${pos.id()}`);
         if (pos.y >= this.abyss)
            return false;

         if (this.tileAt(tileId(pos.x, pos.y + 1)) === '.') {
            pos.y += 1;
         } else if (this.tileAt(tileId(pos.x - 1, pos.y + 1)) === '.') {
            pos.y += 1;
            pos.x -= 1;
         } else if (this.tileAt(tileId(pos.x + 1, pos.y + 1)) === '.') {
            pos.y += 1;
            pos.x += 1;
         } else {
            this.points[tileId(pos.x, pos.y)] = 'o';
            return pos.y > 0;
         }
      }
   }

   fillCave(): number {
      let sandCount = this.part2 ? 1 : 0;
      while(this.addSand()) { sandCount++; }
      return sandCount;
   }
}

class Solution14 implements ISolution {
   dayNumber: number = 14;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let cave = new SandCave(inputFile.readLines());

      return '' + cave.fillCave();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let cave = new SandCave(inputFile.readLines(), true);

      return '' + cave.fillCave();
   }
}

export default new Solution14() as ISolution;
