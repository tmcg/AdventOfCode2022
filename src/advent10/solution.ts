
import { ISolution, InputFile, Util } from '../shared';

export class CathodeRayTube {
   code: number[] = [];

   constructor(input: string[]) {
      this.code = input.map(c => { let [_,b] = c.split(' '); return +(b ?? '0'); })
   }

   signalStrengthPart1(): number {
      let signal: number[] = [];

      this.signalProcessor((c: number, r: number) => {
         if (((c - 20) % 40) === 0) {
            signal.push(c * r);
         }
      });
      return signal.reduce((p, c) => p + c, 0);
   }

   signalPicturePart2(): string {
      let screen: string[] = [...Array(240)].map(x => '.');

      this.signalProcessor((c: number, r: number) => {
         screen[c - 1] = Math.abs(((c - 1) % 40)-r) <= 1 ? '#' : '.';
      });

      //Uncomment this line to print the answer for part 2
      //this.displayScreen(screen);
      return '';
   }

   signalProcessor(captureFunc: (c: number, r: number) => void) {
      //let log = Util.createLogger();
      let x: number = 1;
      let pc: number = 0;
      let cycle: number = 1;

      while (pc < this.code.length && cycle < 240) {
         //log.info(`[${cycle}] pc=${pc}, x=${x}`);
         captureFunc(cycle, x)
         cycle++;

         if (this.code[pc] !== 0) {
            //log.info(`[${cycle}] pc=${pc}, x=${x}`);
            captureFunc(cycle, x);
            cycle++;

            x += this.code[pc];
         }
         pc++;
      }
   }

   displayScreen(screen: string[], lines: number = 6) {
      let log = Util.createLogger();
      for(let i = 0; i < lines; i++) {
         log.info(screen.slice(i * 40, (i + 1) * 40).join(''));
      }
      log.info('');
   };
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

      return 'EGLHBLFJ' + crt.signalPicturePart2();
   }
}

export default new Solution10() as ISolution;
