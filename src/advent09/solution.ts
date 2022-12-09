
import { ISolution, InputFile, IPosition } from '../shared';

export class RopeMove {
   direction: string;
   count: number;

   constructor(input: string) {
      let [d, c] = input.split(' ')
      this.direction = d;
      this.count = +c;
   }
}

export class RopeBridge {
   moves: RopeMove[];
   knots: IPosition[] = []
   tailPath: Set<string>;

   constructor(input: string[], knotCount: number = 2) {
      this.moves = input.map(x => new RopeMove(x));

      this.knots = [...Array(knotCount)].map(n => ({x: 0, y: 0}));
      this.tailPath = new Set<string>();
      this.tailPath.add(this.tailPos());
   }

   knotPos(n: number): string { let s = this.knots[n]; return `${s.x},${s.y}`; }

   ropePos(): string { return [...this.knots.keys()].map(p => this.knotPos(p)).join('  '); }

   headPos(): string { return this.knotPos(0); }

   tailPos(): string { return this.knotPos(this.knots.length - 1); }

   applyMove(move: RopeMove) {
      for (let i = 0; i < move.count; i++) {
         for (let k = 0; k < this.knots.length - 1; k++) {
            this.stepMove(move.direction, k);
         }
         this.tailPath.add(this.tailPos());
      }
   }

   stepMove(direction: string, knotId: number) {
      let newHeadX: number = this.knots[knotId].x;
      let newHeadY: number = this.knots[knotId].y;
      let newTailX: number = this.knots[knotId + 1].x;
      let newTailY: number = this.knots[knotId + 1].y;

      if (knotId === 0) {
         switch(direction) {
            case 'R': newHeadX += 1; break;
            case 'L': newHeadX -= 1; break;
            case 'U': newHeadY += 1; break;
            case 'D': newHeadY -= 1; break;
         }
         this.knots[knotId] = {x:newHeadX, y:newHeadY}
      }

      let deltaX: number = newHeadX - newTailX;
      let deltaY: number = newHeadY - newTailY;
      // make adjustments in the case of fully diagonal movement
      let adjustX: number = (deltaX >= 2 ? -1 : 0) + (deltaX <= -2 ? 1 : 0);
      let adjustY: number = (deltaY >= 2 ? -1 : 0) + (deltaY <= -2 ? 1 : 0);

      if (deltaX >= 2) {
         newTailX = newHeadX - 1;
         newTailY = newHeadY + adjustY;
      } else if (deltaX <= -2) {
         newTailX = newHeadX + 1;
         newTailY = newHeadY + adjustY;
      } else if (deltaY >= 2) {
         newTailY = newHeadY - 1;
         newTailX = newHeadX + adjustX;
      } else if (deltaY <= -2) {
         newTailY = newHeadY + 1;
         newTailX = newHeadX + adjustX;
      }

      this.knots[knotId + 1] = {x:newTailX, y:newTailY}
   }
}

class Solution09 implements ISolution {
   dayNumber: number = 9;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let b = new RopeBridge(inputFile.readLines());

      b.moves.map(m => b.applyMove(m));

      return '' + [...b.tailPath.keys()].length;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let b = new RopeBridge(inputFile.readLines(), 10);

      b.moves.map(m => b.applyMove(m));

      return '' + [...b.tailPath.keys()].length;
   }
}

export default new Solution09() as ISolution;
