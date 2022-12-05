
import { ISolution, InputFile } from '../shared';

export class CargoStack {
   crates: string[];

   constructor(input: string[]) {
      this.crates = input;
   }

   pop(): string {
      return this.crates.pop() ?? '';
   }

   push(c: string) {
      this.crates.push(c);
   }
}

export class CargoMove {
   count: number;
   stack1: number;
   stack2: number;

   constructor(input: string) {
      [this.count, this.stack1, this.stack2] = input.replace('move ','').replace('from ','').replace('to ','').split(' ').map(x => +x);
   }
}

export class CargoCrane {
   moves: CargoMove[] = [];
   stacks: CargoStack[] = [];

   constructor(input: string[]) {
      this.moves = input.filter(x => x.startsWith('move')).map(x => new CargoMove(x));
      let stacksInput: string[] = input.filter(s => s.includes('[')).map(s => '   ' + s)
      let stacksCount = Math.max(...input.filter(s => s.startsWith(' 1'))[0].trim().split('   ').map(x => +x))

      for (let i = 1; i <= stacksCount; i++) {
         let stackVal = stacksInput.map(x => x.charAt(i * 4)).join('').trim().split('').reverse();
         this.stacks.push(new CargoStack(stackVal));
      }
   }

   applyMove(move: CargoMove) {
      let stack1 = this.stacks[move.stack1 - 1];
      let stack2 = this.stacks[move.stack2 - 1];
      let count = move.count;
      while (count > 0) {
         stack2.push(stack1.pop());
         count--;
      }
   }
}

class Solution05 implements ISolution {
   dayNumber: number = 5;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let crane = new CargoCrane(inputFile.readLines());

      crane.moves.map(m => crane.applyMove(m))

      return '' + crane.stacks.map(s => s.crates.slice(-1)).join('');
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let crane = new CargoCrane(inputFile.readLines());

      return '';
   }
}

export default new Solution05() as ISolution;
