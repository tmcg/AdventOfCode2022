
import { ISolution, InputFile, Util } from '../shared';

export class ElfForest {
   trees: number[][] = [];
   vmap: number[][] = [];
   smap: number[][] = [];

   constructor(input: string[]) {
      for (let j = 0; j < input.length; j++) {
         this.trees.push(input[j].split('').map(x => +x));
         this.vmap.push(input[j].split('').map(x => 0));
         this.smap.push(input[j].split('').map(x => 0));
      }
   }

   calcVisibleMap(): ElfForest {
      for(let j = 0; j < this.trees.length; j++) {
         for (let i = 0; i < this.trees[j].length; i++) {
            let left = this.trees[j].slice(0, i).filter(n => n >= this.trees[j][i]);
            let right = this.trees[j].slice(i + 1).filter(n => n >= this.trees[j][i]);
            let col = this.trees.map(r => r[i]);
            let up = col.slice(0, j).filter(n => n >= this.trees[j][i]);
            let down = col.slice(j + 1).filter(n => n >= this.trees[j][i]);

            this.vmap[j][i] = Math.min(left.length, right.length, up.length, down.length) === 0 ? 1 : 0;
         }
      }

      return this;
   }

   countVisibleTrees(): number {
      return this.vmap.reduce((a,b) => a + b.reduce((c,d) => c + d, 0), 0);
   }

   calcScenicMap(): ElfForest {
      for(let j = 0; j < this.trees.length; j++) {
         for (let i = 0; i < this.trees[j].length; i++) {
            let left = this.trees[j].slice(0, i).reverse();
            let right = this.trees[j].slice(i + 1);
            let col = this.trees.map(r => r[i]);
            let up = col.slice(0, j).reverse();
            let down = col.slice(j + 1);

            this.smap[j][i] = 1;
            for (let path of [left,right,up,down]) {
               let dist: number = 0;
               for (let x = 0; x < path.length; x++) {
                  dist += 1;
                  if (path[x] >= this.trees[j][i]) break;
               }
               this.smap[j][i] *= dist;
            }
         }
      }

      return this;
   }

   maxScenicScore(): number {
      return this.smap.reduce((a, b) => Math.max(a, b.reduce((c, d) => Math.max(c, d))), 0);
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
      let forest = new ElfForest(inputFile.readLines());

      return '' + forest.calcScenicMap().maxScenicScore();
   }
}

export default new Solution08() as ISolution;
