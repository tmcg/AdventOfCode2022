
import { ISolution, InputFile, ManhattanDistance, Vec2, Vector2 } from '../shared';

export class ElfSensor {
   pos: Vec2;
   beacon: Vec2;
   dist: number;

   constructor(input: string) {
      //console.log(input);
      let rx = /Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/
      let vals = rx.exec(input)!.slice(1,5).map(x => +x);

      this.pos = {x: vals[0], y: vals[1]}
      this.beacon = {x: vals[2], y: vals[3]}
      this.dist = ManhattanDistance(this.pos, this.beacon);
   }
}

export class ElfSensorZone {
   sensors: ElfSensor[] = [];
   beacons: Vec2[] = [];
   minx: number;
   maxx: number;

   constructor(input: string[]) {
      this.sensors = input.map(x => new ElfSensor(x));
      let bs = new Set();
      for (let b of this.sensors.map(x => x.beacon)) {
         let id: string = Vector2.id(b);
         if (!bs.has(id)) {
            bs.add(id);
            this.beacons.push(b);
         }
      }

      this.minx = Math.min(...this.sensors.map(s => s.pos.x - s.dist));
      this.maxx = Math.max(...this.sensors.map(s => s.pos.x + s.dist));
   }

   isBeacon(x: number, y: number) {
      for (let i = 0; i < this.beacons.length; i++) {
         if (this.beacons[i].x === x && this.beacons[i].y === y) {
            return true;
         }
      }
      return false;
   }

   findEmptyPositionCount(y: number): number {
      let positions: Vec2[] = [];
      for (let x = this.minx; x < this.maxx; x++) {
         for (let i = 0; i < this.sensors.length; i++) {
            if (this.isBeacon(x, y)) continue;
            if (ManhattanDistance({x: x, y: y}, this.sensors[i].pos) <= this.sensors[i].dist) {
               positions.push({x: x, y: y});
               break;
            }
         }
      }

      //console.log(positions);
      return positions.length;
   }
}

class Solution15 implements ISolution {
   dayNumber: number = 15;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let zone = new ElfSensorZone(inputFile.readLines());

      // 3933482 TOO LOW
      return '' + zone.findEmptyPositionCount(2000000);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let zone = new ElfSensorZone(inputFile.readLines());

      return '';
   }
}

export default new Solution15() as ISolution;
