
import { ISolution, InputFile } from '../shared';

export class DeviceFile {
   name: string = '';
   size: number = 0;

   constructor(name: string, size: number) {
      this.name = name;
      this.size = size;
   }
}

export class DeviceFolder {
   name: string = '';
   parent: DeviceFolder | null = null;
   folders: DeviceFolder[] = [];
   files: DeviceFile[] = [];
   totalSize: number | null = null;

   constructor(name: string, parent: DeviceFolder | null = null) {
      this.name = name;
      this.parent = parent;
   }

   addFile(file: DeviceFile) {
      this.files.push(file);
   }

   addFolder(folder: DeviceFolder) {
      this.folders.push(folder);
   }

   path(): string {
      if (this.parent === null)
         return '/';
      let ppath: string = this.parent!.path();
      return ppath + (ppath === '/' ? '' : '/') + this.name;
   }

   size(): number {
      if (this.totalSize !== null) {
         return this.totalSize;
      }

      let currSize: number = 0;
      for (let f of this.folders) currSize += f.size();
      for (let f of this.files) currSize += f.size;
      this.totalSize = currSize;
      return currSize;
   }
}

export class DeviceFileSystem {
   root: DeviceFolder;
   curr: DeviceFolder | null;

   constructor(input: string[]) {
      this.root = new DeviceFolder('');
      this.curr = this.root;
      this.parseCommands(input);
   }

   parseCommands(input: string[]) {
      let cmds: string[] = [...input];

      let cmd: string = this.nextCommand(cmds);
      while (cmd > '') {
         if (cmd.startsWith('$ cd '))
            this.execChangeDir(cmds, cmd.substring(5))
         else if (cmd.startsWith('$ ls'))
            this.execListDir(cmds)

         cmd = this.nextCommand(cmds);
      }
   }

   traverseFolders(): DeviceFolder[] {
      return [...DeviceFileSystem.traverseFunc(this.root)];
   }

   static *traverseFunc(folder: DeviceFolder) : IterableIterator<DeviceFolder> {
      yield folder;

      for (let child1 of folder.folders) {
         for (let child2 of DeviceFileSystem.traverseFunc(child1)) {
            yield child2;
         }
      }
   }

   listAllFiles(folder: DeviceFolder, path: string = ''): string[] {
      let allFiles: string[] = [];
      for (let f of folder.folders) {
         allFiles.push(...this.listAllFiles(f, path + '/' + f.name));
      }
      for (let f of folder.files) {
         allFiles.push(path + '/' + f.name);
      }
      return allFiles;
   }

   execChangeDir(cmds: string[], name: string) {
      if (name === '/') return;
      if (name === '..') {
         this.curr = this.curr!.parent;
         return;
      }
      //console.log('cd> ' + name);
      this.curr = this.curr!.folders.filter(f => f.name === name)[0];
   }

   execListDir(cmds: string[]) {
      let cmd: string = this.peekCommand(cmds);
      while (cmd > '' && !cmd.startsWith('$')) {
         cmd = this.nextCommand(cmds);

         if (cmd.startsWith('dir ')) {
            let name = cmd.substring(4);
            this.curr!.addFolder(new DeviceFolder(name, this.curr!))
         } else {
            let [size, name] = cmd.split(' ');
            this.curr!.addFile(new DeviceFile(name, +size))
         }
         //console.log('ls> ' + cmd);
         cmd = this.peekCommand(cmds);
      }

      this.curr!.folders.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.curr!.files.sort((a, b) => (a.name > b.name) ? 1 : -1);
   }

   peekCommand(cmds: string[]): string {
      return cmds.length > 0 ? cmds[0] : '';
   }

   nextCommand(cmds: string[]): string {
      return cmds.shift() ?? '';
   }
}

class Solution07 implements ISolution {
   dayNumber: number = 7;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      let fs = new DeviceFileSystem(inputFile.readLines());

      return '' + fs.traverseFolders().map(f => f.size()).filter(n => n < 100000).reduce((p, c) => p + c, 0);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //let fs = new DeviceFileSystem(inputFile.readLines());

      return '';
   }
}

export default new Solution07() as ISolution;
