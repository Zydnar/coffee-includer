describe("Coffee-includer.js:", function () {
    const fs = require('fs'),
        path = require('path'),
        CI = require('../lib/main.js'),
        through2 = require('through2');

    describe("Katana cut strings in lines", function () {
        it("should return 3 lines as na Array and shouldn't cut your fingers", function () {
            let lol = `foo
            bar
            baz`,
                foo = CI.katana(lol);
            expect(foo.length).toBe(3);
            expect(Array.isArray(foo)).toBeTruthy();
        });
    });

    describe("Glue join strings back from array of lines into text", function () {
        it('should join strings back from array of lines into text', function () {
            let lol = `foo
            bar
            baz`,
                foo = CI.katana(lol),
                bar = CI.glue(foo);
            expect(typeof bar).toBe('string');
            expect(bar.length).toBe(lol.length);
        })
    });

    describe('Shifter shifts lines according to given scope', function () {
        it('Should shift all lines by four spaces', function () {
            let lol = `foo
            bar
            baz`,
                foo = CI.katana(lol),
                bar = CI.shifter(foo, '    ');
            let baz = (arr) => {
                let i = -1;
                while (++i < arr.length) {
                    if (arr[i].slice(0, 4) === '    ') return true
                }
                return false;
            };
            expect(Array.isArray(bar)).toBeTruthy();
            expect(baz(bar, '    ')).toBeTruthy();
        })
    });

    describe('hr_department search files for includes', function () {
        it('Should find all includes and return them as an array', function () {
            let lol = `wdwdwdw
  #=include <foo.txt>
   albo flak nie
#=include <foo1.txt>
#=include <./node_modules/yargs/README.md>`,
                filePath = './lol/not/here',
                foo = CI.hr_department(lol, filePath);
            expect(Array.isArray(foo)).toBeTruthy();
            expect(foo.length).toBe(3);
            expect(foo[2].incPath).toEqual('./node_modules/yargs/README.md');
        })
    });

    describe('Stringworm reads a lot, including includes.', function () {
        it('Should replace include lines with file contents from include.', async function () {

            let foo = `wdwdwdw
  #=include <./spec/foo.txt>
   albo flak nie
#=include <./spec/foo1.txt>
#=include <./node_modules/yargs/README.md>`,

                bar = "no flak\r\n  ja flaczę",

                baz = CI.glue(CI.shifter(CI.katana(bar), '  ')),
                splited = CI.katana(foo), deps = CI.hr_department(foo, path.dirname('.')),
                loc = path.join(path.dirname(deps[0].filePath), deps[0].incPath);
            await CI.stringworm(splited, deps, 0, loc);
            expect(splited[1]).toEqual(baz)
        })
    });

    describe('Octopus tastes rubberish. Omn mniom mniom.', function () {
        it('Should yield promises.', function () {
            let foo = `wdwdwdw
  #=include <./spec/foo.txt>
   albo flak nie
#=include <./spec/foo1.txt>
#=include <./node_modules/yargs/README.md>`,
                splited = CI.katana(foo),
                deps = CI.hr_department(foo, path.dirname('.')),
                all = [];
            for (let i of CI.octopus(splited, deps, path.dirname('.'))) {
                all.push(i)
            }
            expect(String(all[0].__proto__)).toEqual('[object Promise]')
        })
    });

    describe('Bouncer decides who walks in and who walks by.', function () {
        it('Should pass strings with includes, and return them modified', async function () {
            let lol = await CI.bouncer('There in no include', '.'),
                foo = await CI.bouncer('#=include <./spec/foo1.txt>', '.');
            expect(lol).toEqual('There in no include');
            expect(foo).toEqual('aaaaaaaaaaaaa');
        });
    });

    describe('Octopus whisperer recives work results from octopus.', function () {
        it('Should get from octopus Paul content of included file', async function () {
            let foo = `#=include <./spec/foo1.txt>`,
                splited = CI.katana(foo),
                deps = CI.hr_department(foo, '.'),
                bar = await CI.octopus_whisperer(splited, deps, '.');
            expect(bar).toEqual('aaaaaaaaaaaaa')
        })
    });

    describe("Includer - you won't guess... - it includes file dependencies.", function () {
        it('Should return a modified stream.', function () {
            const input = fs.createReadStream('./spec/test_.txt', {
                'bufferSize': 4 * 1024
            }), buffers = {1: [], 2: []};
            input
                .pipe(through2.obj(function (chunk, enc, callback) {
                    buffers[1].push(chunk);
                    this.push(chunk);
                    callback()
                }))
                .pipe(through2.obj(CI.Includer, CI.Includer._transform))
                .pipe(through2.obj(function (chunk, enc, callback) {
                    buffers[2].push(chunk);
                    this.push(chunk);
                    for (let b in buffers[1]) {
                        expect(buffers[1][b]).not.toEqual(buffers[2][b]); //TODO this is ignored and test always succeeds
                        expect(buffers[2][b]).not.toEqual(null);
                        expect(buffers[2][b]).not.toEqual("");
                    }
                    callback()
                }));
        })
    })
});
