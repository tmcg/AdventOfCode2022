
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
      this.dist = ManhattanDistance(this.pos.x, this.pos.y, this.beacon.x, this.beacon.y);
   }
}

export class ElfSensorZone {
   sensors: ElfSensor[] = [];
   beacons: Set<string>;
   minx: number;
   maxx: number;

   constructor(input: string[]) {
      this.sensors = input.map(x => new ElfSensor(x));
      this.beacons = new Set<string>();
      for (let b of this.sensors.map(x => x.beacon)) {
         this.beacons.add(Vector2.id(b))
      }

      this.minx = Math.min(...this.sensors.map(s => s.pos.x - s.dist));
      this.maxx = Math.max(...this.sensors.map(s => s.pos.x + s.dist));
   }

   testBeacon(x: number, y: number): boolean {
      for (let i = 0; i < this.sensors.length; i++) {
         let si: ElfSensor = this.sensors[i];
         if (ManhattanDistance(x, y, si.pos.x, si.pos.y) <= si.dist && !this.beaconAt(x, y)) {
            return false;
         }
      }
      return true;
   }

   beaconAt(x: number, y: number): boolean {
      return this.beacons.has(`${x},${y}`);
   }

   findEmptyPositionCount(y: number): number {
      let count: number = 0;
      for (let x = this.minx; x < this.maxx; x++) {
         if (!this.testBeacon(x, y)) { count++; }
      }
      return count;
   }

   findMissingPositionId(maxSize: number): number {
      for (let i = 0; i < this.sensors.length; i++) {
         let si: ElfSensor = this.sensors[i];
         for (let sd = 0; sd < si.dist; sd++) {
            let xp: number = sd + 2;
            let yp: number = si.dist - xp + 1;

            for (let k = 0; k < 4; k++) {
               let x: number = si.pos.x + xp + (k === 0 || k === 2 ? -1 : 1);
               let y: number = si.pos.y + yp + (k === 1 || k === 2 ? -1 : 1);
               if (x >= 0 && y >= 0 && x <= maxSize && y <= maxSize && this.testBeacon(x, y)) {
                  return x*4000000 + y;
               }
            }
         }
      }
      return 0;
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
      let zone = new ElfSensorZone(inputFile.readLines());

      return '' + zone.findMissingPositionId(4000000);
   }
}

export default new Solution15() as ISolution;
