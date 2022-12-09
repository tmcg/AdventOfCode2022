
import { ISolution, InputFile, Util } from '../shared';

export class ElfForest {
   trees: number[][] = [];
   vmap: number[][] = [];

   constructor(input: string[]) {
      for (let j = 0; j < input.length; j++) {
         this.trees.push(input[j].split('').map(x => +x));
         this.vmap.push(input[j].split('').map(x => 0));
      }
   }

   calcVisibleMap(): ElfForest {
      for(let j = 0; j < this.trees.length; j++) {
         let jedge: boolean = (j === 0 || j === this.trees.length - 1);
         for (let i = 0; i < this.trees[j].length; i++) {
            let iedge: boolean = (i === 0 || i === this.trees[j].length - 1);
            if (iedge || jedge) {
               this.vmap[j][i] = 1;
               continue;
            }

            let left = this.trees[j].slice(0, i);
            let right = this.trees[j].slice(i + 1);
            let col = this.trees.map(r => r[i]);
            let up = col.slice(0, j);
            let down = col.slice(j + 1);

            let val = this.trees[j][i];
            this.vmap[j][i] = (
               left.filter(n => n >= val).length === 0 ||
               right.filter(n => n >= val).length === 0 ||
               up.filter(n => n >= val).length === 0 ||
               down.filter(n => n >= val).length === 0
            ) ? 1 : 0;
         }
      }

      return this;
   }

   countVisibleTrees(): number {
      return this.vmap.reduce((a,b) => a + b.reduce((c,d) => c + d, 0), 0);
   }
}

class Solution08 implements ISolution {
   dayNumber: number = 8;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let forest = new ElfForest(inputFile.readLines());

      return '' + forest.calcVisibleMap().countVisibleTrees();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let forest = new ElfForest(inputFile.readLines());

      return '';
   }
}

export default new Solution08() as ISolution;
