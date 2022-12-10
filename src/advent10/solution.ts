
import { ISolution, InputFile, Util } from '../shared';

export class CathodeRayTube {
   code: number[] = [];

   constructor(input: string[]) {
      this.code = input.map(c => { let [_,b] = c.split(' '); return +(b ?? '0'); })
   }

   signalStrengthPart1(): number {
      //let log = Util.createLogger();
      let x: number = 1;
      let pc: number = 0;
      let cycle: number = 1;
      let signal: number[] = [];

      let captureSignal = (c: number, r: number) => {
         if (((c - 20) % 40) === 0) {
            signal.push(c * r);
         }
      }

      while (pc < this.code.length && cycle < 240) {
         //log.info(`[${cycle}] pc=${pc}, x=${x}`);
         
         captureSignal(cycle, x);
         cycle++;

         if (this.code[pc] !== 0) {
            captureSignal(cycle, x);
      
            cycle++;
            x += this.code[pc];
         }

         pc++;
      }
      return signal.reduce((p, c) => p + c, 0);
   }
}

class Solution10 implements ISolution {
   dayNumber: number = 10;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let crt = new CathodeRayTube(inputFile.readLines());

      return '' + crt.signalStrengthPart1();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let crt = new CathodeRayTube(inputFile.readLines());

      return '';
   }
}

export default new Solution10() as ISolution;
