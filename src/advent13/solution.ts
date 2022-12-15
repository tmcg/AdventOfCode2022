
import { ISolution, InputFile, Util } from '../shared';

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
   packets: Packet[] = [];

   constructor(input: string) {
      this.pairs = input
         .split('\r\n\r\n')
         .map(x => { 
            let [a,b] = x.split('\r\n'); 
            return new SignalPair(a, b);
         });

      this.packets = input
         .split('\r\n')
         .filter(x => x > '')
         .map(x => JSON.parse(x));

      this.packets.push(JSON.parse('[[2]]'));
      this.packets.push(JSON.parse('[[6]]'));
   }

   sumOfOrderedIndices(): number {
      return this.pairs.map((el,ix) => el.compare() === 'ordered' ? ix + 1 : 0).reduce((p, c) => p + c, 0);
   }

   decoderKey(): number {
      //let log = Util.createLogger();

      let sortedPackets = this.packets.sort((a, b) => {
         let result = SignalPair.compareFunc(a,b);
         if (result === 'ordered') return -1;
         if (result === 'unordered') return 1;
         return 0;
      })

      let result: number = 1;
      for (let i = 0; i < sortedPackets.length; i++) {
         //log.info(`${i} => ${sortedPackets[i]}`);
         let packetStr: string = JSON.stringify(sortedPackets[i]);
         if (packetStr === '[[2]]' || packetStr === '[[6]]') {
            result *= (i+1);
         }
      }
      return result;
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
      let ds = new DistressSignal(inputFile.readText())

      return '' + ds.decoderKey();
   }
}

export default new Solution13() as ISolution;
