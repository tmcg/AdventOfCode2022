
import { ISolution, InputFile } from '../shared';

export class ElfPartyMember {
   calories: number[];

   constructor(calories: number[]) {
      this.calories = calories
   }

   totalCalories() : number {
      return this.calories.reduce((p, c) => p + c, 0)
   }
}

export class ElfParty {
   elves: ElfPartyMember[]

   constructor(input: string) {
      this.elves = input.split("\r\n\r\n").map(e => new ElfPartyMember(e.split("\r\n").map(Number)))
   }

   findMaxCalories() : number {
      let elvesCalories = this.elves.map(e => e.totalCalories())
      return Math.max(...elvesCalories);
   }

   findTopThreeTotalCalories() : number {
      let elvesCalories = this.elves.map(e => e.totalCalories())
      return elvesCalories.sort().slice(-3).reduce((p, c) => p + c, 0);
   }
}

class Solution01 implements ISolution {
   dayNumber: number = 1;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let party = new ElfParty(inputFile.readText());

      return ''+party.findMaxCalories();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let party = new ElfParty(inputFile.readText());

      return ''+party.findTopThreeTotalCalories();
   }
}

export default new Solution01() as ISolution;
