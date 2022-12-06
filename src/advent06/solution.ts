
import { ISolution, InputFile, Util } from '../shared';

export class ElfStreamBuffer {
   data: string = '';

   constructor(input: string) {
      this.data = input;
   }

   findMarker(packetSize: number): number {
      let groups: string[] = Util.range(this.data.length - packetSize + 1).map(n => this.data.substring(n, n + packetSize))
      return groups.map(g => new Set(g)).map((s,i) => s.size === packetSize ? i : -1).filter(n => n >= 0)[0] + packetSize
   }

   findMarkerPart1() {
      return this.findMarker(4);
   }

   findMarkerPart2() {
      return this.findMarker(14);
   }
}

class Solution06 implements ISolution {
   dayNumber: number = 6;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let buf = new ElfStreamBuffer(inputFile.readText());

      return '' + buf.findMarkerPart1();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let buf = new ElfStreamBuffer(inputFile.readText());

      return '' + buf.findMarkerPart2();
   }
}

export default new Solution06() as ISolution;
