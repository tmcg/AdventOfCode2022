
import { ISolution, InputFile } from '../shared';

export class SectionAssignmentPair {
   elf1: [number, number]
   elf2: [number, number]

   constructor(input: string) {
      let input1: number[] = input.split(',')[0].split('-').map(x => +x);
      this.elf1 = [input1[0], input1[1]]
      let input2: number[] = input.split(',')[1].split('-').map(x => +x);
      this.elf2 = [input2[0], input2[1]]
   }

   findAssignmentContainer(): number {
      if (this.testAssignmentContainer(this.elf1, this.elf2))
         return 1;
      if (this.testAssignmentContainer(this.elf2, this.elf1))
         return 2;
      return 0;
   }

   testAssignmentContainer(a1: [number, number], a2: [number, number]): boolean
   {
      return a1[0] <= a2[0] && a1[1] >= a2[1];
   }

   findAssignmentOverlap(): number {
      if (this.testAssignmentOverlap(this.elf1, this.elf2))
         return 1;
      return 0;
   }

   testAssignmentOverlap(a1: [number, number], a2: [number, number]): boolean {
      return a1[1] >= a2[0] && a1[0] <= a2[1];
   }
}

export class SectionAssignmentPairList {
   assignments: SectionAssignmentPair[];

   constructor(input: string[]) {
      this.assignments = input.map(x => new SectionAssignmentPair(x));
   }

   countContainedAssignments(): number {
      return this.assignments.filter(x => x.findAssignmentContainer() > 0).length;
   }

   countOverlappingAssignments(): number {
      return this.assignments.filter(x => x.findAssignmentOverlap() > 0).length;
   }
}

class Solution04 implements ISolution {
   dayNumber: number = 4;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let list = new SectionAssignmentPairList(inputFile.readLines());

      return '' + list.countContainedAssignments();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let list = new SectionAssignmentPairList(inputFile.readLines());

      return '' + list.countOverlappingAssignments();
   }
}

export default new Solution04() as ISolution;
