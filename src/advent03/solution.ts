
import { ISolution, InputFile } from '../shared';

export class ElfRucksack {
   content: string = '';
   comp1: string = '';
   comp2: string = '';
   shared: string = '';
   priority: number = 0;

   constructor(input: string) {
      let len: number = input.length / 2;
      this.content = input;
      this.comp1 = input.substring(0, len);
      this.comp2 = input.substring(len, input.length)
      this.shared = [...this.comp1].filter(x => this.comp2.includes(x))[0];
      this.priority = ElfRucksack.calculatePriority(this.shared);
   }

   static calculatePriority(s: string) {
      let code = s.charCodeAt(0);
      let codeLower = 'a'.charCodeAt(0);
      let codeUpper = 'A'.charCodeAt(0);
      return code >= codeLower ? code - codeLower + 1 : code - codeUpper + 27;
   }
}

export class ElfRucksackGroup {
   badge: string = '';
   priority: number = 0;

   constructor(s1: string, s2: string, s3: string) {
      let rs1 = new ElfRucksack(s1);
      let rs2 = new ElfRucksack(s2);
      let rs3 = new ElfRucksack(s3);

      this.badge = [...rs1.content].filter(x => rs2.content.includes(x) && rs3.content.includes(x))[0];
      this.priority = ElfRucksack.calculatePriority(this.badge);
   }
}

class Solution03 implements ISolution {
   dayNumber: number = 3;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let rs: ElfRucksack[] = inputFile.readLines().map(x => new ElfRucksack(x));

      return '' + rs.map(r => r.priority).reduce((p, c) => p + c, 0);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let lines: string[] = inputFile.readLines();

      let rsg: ElfRucksackGroup[] = lines
         .map((x, i) => (i % 3) === 0 ? i : -1)
         .filter(x => x >= 0)
         .map(i => new ElfRucksackGroup(lines[i], lines[i + 1], lines[i + 2]));

      return '' + rsg.map(r => r.priority).reduce((p, c) => p + c, 0);
   }
}

export default new Solution03() as ISolution;
