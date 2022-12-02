
import { ISolution, InputFile } from '../shared';

type RockPaperScissorsMove = 'R' | 'P' | 'S'
type RockPaperScissorsOutcome = 'L' | 'D' | 'W'

export class RockPaperScissorsStrategy {
   opponent: RockPaperScissorsMove;
   player: RockPaperScissorsMove;
   outcome: RockPaperScissorsOutcome;

   constructor(input: string, part2: boolean) {
      let [input0, input1] = input.split(' ')
      this.opponent = RockPaperScissorsStrategy.mapInputToMove(input0)

      if (part2) {
         this.outcome = RockPaperScissorsStrategy.mapInputToOutcome(input1)
         this.player = RockPaperScissorsStrategy.playerMoveForOutcome(this.opponent, this.outcome);
      } else {
         this.outcome = 'W';
         this.player = RockPaperScissorsStrategy.mapInputToMove(input1);
      }
   }

   static mapInputToMove(input: string): RockPaperScissorsMove {
      return <RockPaperScissorsMove>input
         .replace('A','R').replace('B','P').replace('C','S')
         .replace('X','R').replace('Y','P').replace('Z','S');
   }

   static mapInputToOutcome(input: string): RockPaperScissorsOutcome {
      return <RockPaperScissorsOutcome>input
         .replace('X','L').replace('Y','D').replace('Z','W');
   }

   static playerMoveForOutcome(opponent: RockPaperScissorsMove, outcome: RockPaperScissorsOutcome): RockPaperScissorsMove {
      if (outcome === 'D')
         return opponent;

      switch (opponent) {
         case 'R': return (outcome === 'W' ? 'P' : 'S');
         case 'P': return (outcome === 'W' ? 'S' : 'R');
         case 'S': return (outcome === 'W' ? 'R' : 'P');
      }
   }

   playerScore() : number {
      const winPoints = 6;
      const drawPoints = 3;
      let movePoints = 0;
      switch(this.player) {
         case 'R': movePoints = 1; break;
         case 'P': movePoints = 2; break;
         case 'S': movePoints = 3; break;
      }

      if (RockPaperScissorsStrategy.playerMoveForOutcome(this.opponent, 'D') === this.player)
         return drawPoints + movePoints;
      if (RockPaperScissorsStrategy.playerMoveForOutcome(this.opponent, 'W') === this.player)
         return winPoints + movePoints;

      return movePoints;
   }
}

export class RoundStrategyGuide {
   strategies: RockPaperScissorsStrategy[]

   constructor(input: string[], part2: boolean) {
      this.strategies = input.map(x => new RockPaperScissorsStrategy(x, part2))
   }

   findTotalScore() : number {
      return this.strategies.map(x => x.playerScore()).reduce((p, c) => p + c, 0);;
   }
}

class Solution02 implements ISolution {
   dayNumber: number = 2;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let guide = new RoundStrategyGuide(inputFile.readLines(), false);

      return '' + guide.findTotalScore();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      let guide = new RoundStrategyGuide(inputFile.readLines(), true);

      return '' + guide.findTotalScore();
   }
}

export default new Solution02() as ISolution;
