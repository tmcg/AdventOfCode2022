
import solution, { MonkeyTroop } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {
  let sampleInput: string[] = [
    'Monkey 0:',
    '  Starting items: 79, 98',
    '  Operation: new = old * 19',
    '  Test: divisible by 23',
    '    If true: throw to monkey 2',
    '    If false: throw to monkey 3',
    '',
    'Monkey 1:',
    '  Starting items: 54, 65, 75, 74',
    '  Operation: new = old + 6',
    '  Test: divisible by 19',
    '    If true: throw to monkey 2',
    '    If false: throw to monkey 0',
    '',
    'Monkey 2:',
    '  Starting items: 79, 60, 97',
    '  Operation: new = old * old',
    '  Test: divisible by 13',
    '    If true: throw to monkey 1',
    '    If false: throw to monkey 3',
    '',
    'Monkey 3:',
    '  Starting items: 74',
    '  Operation: new = old + 3',
    '  Test: divisible by 17',
    '    If true: throw to monkey 0',
    '    If false: throw to monkey 1'
  ];

  it('should read input', () => {
    let mt = new MonkeyTroop(sampleInput.join('\r\n'));

    expect(mt.monkeys.length).toBe(4);
    expect(mt.monkeys[0].items).toStrictEqual([79,98]);
    expect(mt.monkeys[1].items).toStrictEqual([54,65,75,74]);
    expect(mt.monkeys[2].items).toStrictEqual([79,60,97]);
    expect(mt.monkeys[3].items).toStrictEqual([74]);
    expect(mt.monkeys[0].oper).toBe('new = old * 19');
    expect(mt.monkeys[1].oper).toBe('new = old + 6');
    expect(mt.monkeys[2].oper).toBe('new = old * old');
    expect(mt.monkeys[3].oper).toBe('new = old + 3');
    expect(mt.monkeys[0].testDiv).toBe(23);
    expect(mt.monkeys[1].testDiv).toBe(19);
    expect(mt.monkeys[2].testDiv).toBe(13);
    expect(mt.monkeys[3].testDiv).toBe(17);
    expect(mt.monkeys[0].throwToTrue).toBe(2);
    expect(mt.monkeys[1].throwToTrue).toBe(2);
    expect(mt.monkeys[2].throwToTrue).toBe(1);
    expect(mt.monkeys[3].throwToTrue).toBe(0);
    expect(mt.monkeys[0].throwToFalse).toBe(3);
    expect(mt.monkeys[1].throwToFalse).toBe(0);
    expect(mt.monkeys[2].throwToFalse).toBe(3);
    expect(mt.monkeys[3].throwToFalse).toBe(1);
    expect(mt.lcm).toBe(0);
  });

  it('should inspect items', () => {
    let mt = new MonkeyTroop(sampleInput.join('\r\n'));

    mt.monkeys[0].inspect((n) => mt.monkeys[n]);
    expect(mt.monkeys[0].items).toStrictEqual([98]);
    expect(mt.monkeys[1].items).toStrictEqual([54,65,75,74]);
    expect(mt.monkeys[2].items).toStrictEqual([79,60,97]);
    expect(mt.monkeys[3].items).toStrictEqual([74,500]);
    mt.monkeys[0].inspect((n) => mt.monkeys[n]);
    expect(mt.monkeys[0].items).toStrictEqual([]);
    expect(mt.monkeys[1].items).toStrictEqual([54,65,75,74]);
    expect(mt.monkeys[2].items).toStrictEqual([79,60,97]);
    expect(mt.monkeys[3].items).toStrictEqual([74,500,620]);
    mt.monkeys[0].inspect((n) => mt.monkeys[n]);
    expect(mt.monkeys[0].items).toStrictEqual([]);
    expect(mt.monkeys[1].items).toStrictEqual([54,65,75,74]);
    expect(mt.monkeys[2].items).toStrictEqual([79,60,97]);
    expect(mt.monkeys[3].items).toStrictEqual([74,500,620]);
  })

  it('should finish round 1', () => {
    let mt = new MonkeyTroop(sampleInput.join('\r\n'));

    mt.nextRound();
    expect(mt.monkeys[0].items).toStrictEqual([20,23,27,26]);
    expect(mt.monkeys[1].items).toStrictEqual([2080,25,167,207,401,1046]);
    expect(mt.monkeys[2].items).toStrictEqual([]);
    expect(mt.monkeys[3].items).toStrictEqual([]);
  });

  it('should calculate monkey business part 1', () => {
    let mt = new MonkeyTroop(sampleInput.join('\r\n'));
    expect(mt.calculateMonkeyBusiness()).toBe(10605);
  });

  it('should calculate monkey business part 2', () => {
    let mt = new MonkeyTroop(sampleInput.join('\r\n'), true);
    expect(mt.lcm).toBe(96577);

    let roundNum: number = 0;
    mt.nextRound(); roundNum++;
    expect(mt.monkeys[0].inspections).toBe(2);
    expect(mt.monkeys[1].inspections).toBe(4);
    expect(mt.monkeys[2].inspections).toBe(3);
    expect(mt.monkeys[3].inspections).toBe(6);
    while(roundNum < 20) {
      mt.nextRound(); roundNum++;
    }
    expect(mt.monkeys[0].inspections).toBe(99);
    expect(mt.monkeys[1].inspections).toBe(97);
    expect(mt.monkeys[2].inspections).toBe(8);
    expect(mt.monkeys[3].inspections).toBe(103);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('120384');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('32059801242');
  });
});
