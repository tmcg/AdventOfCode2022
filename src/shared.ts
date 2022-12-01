
import * as fs from 'fs';
import * as os from 'os';
import winston from 'winston';

export interface ISolution {
   readonly dayNumber: number;
   solvePart1() : string;
   solvePart2() : string;
}

export enum Compass {
   North = 0,
   East = 1,
   South = 2,
   West = 3
}

export function CompassFromCode(code: string): Compass {
   switch(code) {
      case 'N': return Compass.North;
      case 'S': return Compass.South;
      case 'E': return Compass.East;
      case 'W': return Compass.West;
      default: throw 'Invalid compass code'
   }
}

export function CompassTurn(direction : Compass, left : boolean) : Compass {
   return (direction + (left ? 3 : 1)) % 4;
}

export interface IPosition extends Vec2 {}

export interface Vec2 {
   x : number,
   y : number
}

export interface Vec3 {
   x : number;
   y : number;
   z : number;
}

export interface Vec4 {
   x : number;
   y : number;
   z : number;
   w : number;
}

export interface IRectangle {
   left: number;
   top: number;
   right: number;
   bottom: number;
}

export class Vector2 implements Vec2 {
   constructor(public x: number, public y: number) {}

   id = () => `${this.x},${this.y}`;
}

export class Vector3 implements Vec3 {
   constructor(public x: number, public y: number, public z: number) {}

   id = () => `${this.x},${this.y},${this.z}`;
}

export class Vector4 implements Vec4 {
   constructor(public x: number, public y: number, public z: number, public w: number) {}

   id = () => `${this.x},${this.y},${this.z},${this.w}`;
}

export class Rectangle implements IRectangle {
   constructor(public left: number, public top: number, public right: number, public bottom: number) {}

   width(): number { return this.right - this.left; }
   height(): number { return this.bottom - this.top; }

   contains(pos: Vec2): boolean {
      return pos.x >= this.left && pos.x <= this.right
         && pos.y <= this.top && pos.y >= this.bottom;
   }

   id = () => `${this.left},${this.top},${this.right},${this.bottom}`;
}

export interface Dictionary<T> {
   [key: string]: T;
}

export class InputFile {
   _fileName : string;

   constructor(dayNumber : number, fileName: string = 'input.txt') {
      this._fileName = `./src/advent${(''+dayNumber).padStart(2,'0')}/${fileName}`;
   }

   readLines() : string[] {
      return this.readText().split(os.EOL);
   }

   readText() : string {
      return fs.readFileSync(this._fileName, 'utf8');
   }
}

export class OutputFile {
   _fileName : string;

   constructor(fileName : string) {
      this._fileName = fileName;
   }

   writeLines(lines : string[]) {
      this.writeText(lines.join(os.EOL));
   }

   writeText(text : string) {
      fs.writeFileSync(this._fileName, text, 'utf8');
   }
}

export class Util {
   static range(size : number, startAt : number = 0) : number[] {
      return [...Array(size).keys()].map(i => i + startAt);
   }

   static padZero(value : number, size : number) {
      return (''+value).padStart(size, '0');
   }

   static createLogger(transports: winston.transport[] = []) : any {

      const logger = winston.createLogger({
         level: 'info',
         format: winston.format.simple(),
         transports: transports.length > 0 ? transports : [Util.toConsoleTransport()],
      });

      return {
         info(msg : string) {
            logger.info(msg);
         },
         write(obj : any) {
            logger.info(JSON.stringify(obj));
         }
      }
   }

   static toConsoleTransport() : winston.transport {
      return new winston.transports.Console();
   }

   static toFileTransport(filename: string = './output.log'): winston.transport {
      return new winston.transports.File({ filename: filename })
   }
}

export class SetUtil {
   static union<T>(setA: Set<T>, setB: Set<T>): Set<T> {
      return new Set<T>([...setA, ...setB]);
   }

   static intersect<T>(setA: Set<T>, setB: Set<T>): Set<T> {
      return new Set<T>([...setA].filter(t => setB.has(t)));
   }

   static subtract<T>(setA: Set<T>, setB: Set<T>): Set<T> {
      return new Set<T>([...setA].filter(t => !setB.has(t)));
   }

   static isSuperset<T>(setA: Set<T>, setB: Set<T>): boolean {
      for (let b of setB) {
         if (!setA.has(b))
            return false;
      }
      return true;
   }

   static areEqual<T>(setA: Set<T>, setB: Set<T>): boolean {
      return setA.size === setB.size && [...setA].every(t => setB.has(t));
   }
}


export class Stack<T> {
   private items: T[] = [];

   push(item: T) {
      this.items.push(item);
   }

   pop(): T | undefined {
      return this.items.pop();
   }

   peek(): T | undefined {
      return this.items[this.size() - 1];
   }

   size(): number {
      return this.items.length;
   }

   toArray(): T[] {
      return [...this.items];
   }
}