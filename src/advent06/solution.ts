
import { ISolution, InputFile, Util } from '../shared';

export class ElfStreamBuffer {
   data: string = '';
   marker: number = -1;

   constructor(input: string) {
      this.data = input;
      this.marker = this.findMarker();
   }

   findMarker(): number {
      let groups: string[] = Util.range(this.data.length - 3).map(n => this.data.substring(n, n + 4))
      return groups.map(g => new Set(g)).map((s,i) => s.size === 4 ? i : -1).filter(n => n >= 0)[0] + 4
   }
}

class Solution06 implements ISolution {
   dayNumber: number = 6;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let buf = new ElfStreamBuffer(inputFile.readText());

      return '' + buf.findMarker();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let buf = new ElfStreamBuffer(inputFile.readText());

      return '';
   }
}

export default new Solution06() as ISolution;
