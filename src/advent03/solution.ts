
import { ISolution, InputFile } from '../shared';

export class Rucksack {
   comp1: string = '';
   comp2: string = '';
   shared: string = '';
   priority: number = 0;

   constructor(input: string) {
      let len: number = input.length / 2;
      this.comp1 = input.substring(0, len);
      this.comp2 = input.substring(len, input.length)
      this.shared = [...this.comp1].filter(x => this.comp2.includes(x))[0];

      let code = this.shared.charCodeAt(0);
      let codeLower = 'a'.charCodeAt(0);
      let codeUpper = 'A'.charCodeAt(0);
      this.priority = code >= codeLower ? code - codeLower + 1 : code - codeUpper + 27;
   }
}

class Solution03 implements ISolution {
   dayNumber: number = 3;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let rs: Rucksack[] = inputFile.readLines().map(x => new Rucksack(x));

      return '' + rs.map(r => r.priority).reduce((p, c) => p + c, 0);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let test = new TestClass(inputFile.readLines());

      return '';
   }
}

export default new Solution03() as ISolution;
