
import solution, { DeviceFileSystem, DeviceFolder } from './solution';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  const sampleInput: string[] = [
    '$ cd /',
    '$ ls',
    'dir a',
    '14848514 b.txt',
    '8504156 c.dat',
    'dir d',
    '$ cd a',
    '$ ls',
    'dir e',
    '29116 f',
    '2557 g',
    '62596 h.lst',
    '$ cd e',
    '$ ls',
    '584 i',
    '$ cd ..',
    '$ cd ..',
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k'
  ];

  it('should parse input', () => {
    let fs = new DeviceFileSystem(sampleInput);
    expect(fs.root.name).toBe('');
    expect(fs.root.parent).toBe(null);
    expect(fs.root.folders.length).toBe(2);
    expect(fs.root.folders[0].name).toBe('a');
    expect(fs.root.folders[1].name).toBe('d');
    expect(fs.root.files.length).toBe(2);
    expect(fs.root.files[0].name).toBe('b.txt');
    expect(fs.root.files[0].size).toBe(14848514);
    expect(fs.root.files[1].name).toBe('c.dat');
    expect(fs.root.files[1].size).toBe(8504156);
  });

  it('should traverse files and folders', () => {
    let fs = new DeviceFileSystem(sampleInput);

    let paths: string[] = fs.listAllFiles(fs.root);
    expect(paths.length).toBe(10);
    expect(paths[0]).toBe('/a/e/i');
    expect(paths[1]).toBe('/a/f');
    expect(paths[2]).toBe('/a/g');
    expect(paths[3]).toBe('/a/h.lst');
    expect(paths[4]).toBe('/d/d.ext');
    expect(paths[5]).toBe('/d/d.log');
    expect(paths[6]).toBe('/d/j');
    expect(paths[7]).toBe('/d/k');
    expect(paths[8]).toBe('/b.txt');
    expect(paths[9]).toBe('/c.dat');

    let f: DeviceFolder[] = fs.traverseFolders();
    expect(f.length).toBe(4)
    expect(f[0].path()).toBe('/');
    expect(f[1].path()).toBe('/a');
    expect(f[2].path()).toBe('/a/e');
    expect(f[3].path()).toBe('/d');
    expect(f[0].size()).toBe(48381165);
    expect(f[1].size()).toBe(94853);
    expect(f[2].size()).toBe(584);
    expect(f[3].size()).toBe(24933642);
    //f.map(a => console.log(`path=${a.path()} size=${a.size()}`));
  });

  it('should find smallest size to delete', () => {
    let fs = new DeviceFileSystem(sampleInput);
    expect(fs.findSmallestSizeToDelete()).toBe(24933642);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).toBe('1391690');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).toBe('5469168');
  });
});
