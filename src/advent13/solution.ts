
import { ISolution, InputFile } from '../shared';

type NumberOrPacket = number | Packet;
type Packet = NumberOrPacket[];
type CompareResult = 'ordered' | 'unordered' |'unknown';

export class SignalPair {
   leftPacket: Packet;
   rightPacket: Packet;

   constructor(public left: string, public right: string) {
      this.leftPacket = JSON.parse(left);
      this.rightPacket = JSON.parse(right);
   }

   compare(): CompareResult {
      return SignalPair.compareFunc(this.leftPacket, this.rightPacket);
   }

   static compareFunc(left: Packet, right: Packet): CompareResult {
      let leftRightZip = left.map((el, ix) => [el, right[ix]]);

      for (const [leftVal, rightVal] of leftRightZip) {
         if (rightVal === undefined) return 'unordered';

         const leftIsNum: boolean = typeof leftVal === 'number';
         const rightIsNum: boolean = typeof rightVal === 'number';

         if (leftIsNum && rightIsNum) {
            if (leftVal === rightVal) continue;
            if (leftVal < rightVal) return 'ordered';
            return 'unordered';
         }

         const result = SignalPair.compareFunc(leftIsNum ? [leftVal] : leftVal as Packet, rightIsNum ? [rightVal] : rightVal as Packet);
         if (result !== 'unknown')
            return result;
      }

      return left.length < right.length ? 'ordered' : 'unknown';
   }
}

export class DistressSignal {
   pairs: SignalPair[] = [];

   constructor(input: string) {
      this.pairs = input
         .split('\r\n\r\n')
         .map(x => { 
            let [a,b] = x.split('\r\n'); 
            return new SignalPair(a, b);
         });
   }

   sumOfOrderedIndices(): number {
      return this.pairs.map((el,ix) => el.compare() === 'ordered' ? ix + 1 : 0).reduce((p, c) => p + c, 0);
   }
}

class Solution13 implements ISolution {
   dayNumber: number = 13;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let ds = new DistressSignal(inputFile.readText())

      //4661 TOO LOW
      return '' + ds.sumOfOrderedIndices();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let ds = new DistressSignal(inputFile.readText())

      return '';
   }
}

export default new Solution13() as ISolution;
