
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
   head: IPosition = {x: 0, y: 0};
   tail: IPosition = {x: 0, y: 0};
   tailPath: Set<string>;

   constructor(input: string[]) {
      this.moves = input.map(x => new RopeMove(x));
      this.tailPath = new Set<string>();
      this.tailPath.add(this.tailPos());
   }

   headPos(): string { return `${this.head.x},${this.head.y}`; }

   tailPos(): string { return `${this.tail.x},${this.tail.y}`; }

   applyMove(move: RopeMove) {
      for (let i = 0; i < move.count; i++) {
         this.stepHead(move.direction);
      }
   }

   stepHead(direction: string) {
      let newHeadX: number = this.head.x;
      let newHeadY: number = this.head.y;
      let newTailX: number = this.tail.x;
      let newTailY: number = this.tail.y;

      switch(direction) {
         case 'R': newHeadX += 1; break;
         case 'L': newHeadX -= 1; break;
         case 'U': newHeadY += 1; break;
         case 'D': newHeadY -= 1; break;
      }

      if (newHeadX - this.tail.x >= 2) {
         newTailX = newHeadX - 1;
         newTailY = newHeadY;
      } else if (this.tail.x - newHeadX >= 2) {
         newTailX = newHeadX + 1;
         newTailY = newHeadY;
      } else if (newHeadY - this.tail.y >= 2) {
         newTailX = newHeadX;
         newTailY = newHeadY - 1;
      } else if (this.tail.y - newHeadY >= 2) {
         newTailX = newHeadX;
         newTailY = newHeadY + 1;
      }

      this.head = {x:newHeadX, y:newHeadY}
      this.tail = {x:newTailX, y:newTailY}
      this.tailPath.add(this.tailPos());
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
      //let b = new RopeBridge(inputFile.readLines());

      return '';
   }
}

export default new Solution09() as ISolution;
