
import { ISolution, InputFile, Util } from '../shared';

//let log = Util.createLogger([Util.toFileTransport()]);

export class Monkey {
   input: string[] = [];
   items: number[] = [];
   oper: string = '';
   testDiv: number = 1;
   throwToTrue: number = 0;
   throwToFalse: number = 0;
   inspections: number = 0;

   constructor(input: string) {
      let mi: string[] = input.split('\r\n').map(x => x.trim());
      this.items = mi[1].split(':')[1].trim().split(', ').map(x => +x);
      this.oper = mi[2].split(':')[1].trim();
      this.testDiv = +(mi[3].split(':')[1].substring(14));
      this.throwToTrue = +(mi[4].split(':')[1].trim().substring(15));
      this.throwToFalse = +(mi[5].split(':')[1].trim().substring(15));
   }

   inspect(monkeyFn: (n: number) => Monkey, lcm: number = 0) {
      if (this.items.length < 1) return;

      //log.info(`  Monkey inspects an item with a worry level of ${this.items[0]}`);
      this.inspections++;

      if (lcm > 0) {
         this.items[0] = this.applyWorry(this.items[0] % lcm, 1);
      } else {
         this.items[0] = this.applyWorry(this.items[0], 3);
      }
      //log.info(`    Worry level rules are applied to a new worry level of ${this.items[0]}`);

      if ((this.items[0] % this.testDiv) === 0) {
         //log.info(`    Current worry level is divisible by ${this.testDiv}`);
         //log.info(`    Item with worry level ${this.items[0]} is thrown to monkey ${this.throwToTrue}`);
         this.throwItem(monkeyFn(this.throwToTrue));
      } else {
         //log.info(`    Current worry level is not divisible by ${this.testDiv}`);
         //log.info(`    Item with worry level ${this.items[0]} is thrown to monkey ${this.throwToFalse}`);
         this.throwItem(monkeyFn(this.throwToFalse));
      }
   }

   applyWorry(n: number, worryDiv: number): number {
      return Math.floor(eval(this.oper.substring(6).replaceAll('old', `${n}`)) / worryDiv);
   }

   throwItem(to: Monkey) {
      to.items.push(this.items.shift()!);
   }
}

export class MonkeyTroop {
   monkeys: Monkey[] = [];
   lcm: number = 0;
   rounds: number = 0;

   constructor(input: string, part2: boolean = false) {
      this.monkeys = input.split('\r\n\r\n').map(x => new Monkey(x));
      this.lcm = part2 ? this.monkeys.map(m => m.testDiv).reduce((a, b) => a * b, 1) : 0;
      this.rounds = part2 ? 10000 : 20;
   }

   nextRound() {
      for (let n = 0; n < this.monkeys.length; n++) {
         let m = this.monkeys[n];
         //log.info(`Monkey ${n}:`);

         while (m.items.length > 0) {
            m.inspect((n) => this.monkeys[n], this.lcm);
         }
      }
   }

   calculateMonkeyBusiness(): number {
      for (let i = 0; i < this.rounds; i++) {
         this.nextRound();
      }

      let mb = this.monkeys.map(m => m.inspections).sort((a, b) => b - a);
      return mb[0] * mb[1];
   }
}

class Solution11 implements ISolution {
   dayNumber: number = 11;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let mt = new MonkeyTroop(inputFile.readText());

      return '' + mt.calculateMonkeyBusiness();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let mt = new MonkeyTroop(inputFile.readText(), true);

      return '' + mt.calculateMonkeyBusiness();
   }
}

export default new Solution11() as ISolution;
