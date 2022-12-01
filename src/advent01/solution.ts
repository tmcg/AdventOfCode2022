
import { ISolution, InputFile } from '../shared';

export class ElfPartyMember {
   calories: number[];

   constructor(input: string) {
      this.calories = input.split(' ').map(x => +x)
   }

   totalCalories() : number {
      return this.calories.reduce((p, c) => p + c, 0)
   }
}

export class ElfParty {
   elves: ElfPartyMember[]

   constructor(input: string) {
      let input2 = input.replace(/\r\n/g," ").replace(/  /g,":").split(":")
      this.elves = input2.map(x => new ElfPartyMember(x))
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

class SolutionXX implements ISolution {
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

export default new SolutionXX() as ISolution;
