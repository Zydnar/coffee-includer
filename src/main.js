'use strict';
const util = require('util');
require('util.promisify').shim();
const fs = require('fs'),
    path = require('path'),
    Transform = require('stream').Transform,
    File = require('vinyl'),
    readFile = util.promisify(fs.readFile),
    /**
     * Kills dragons, saves virgins and splits things.
     * @param content {String}
     * @returns {Array}
     */
    katana = function (content) {
        return content.split('\n');
    },

    /**
     * Combines things, previuosly splited by katana().
     * @param arr
     * @returns {String}
     */
    glue = function (arr) {
        return arr.join('\n');
    },

    /**
     * Shifts to other dimensions and teleports lines according to include scope.
     * @param arr {Array}
     * @param scope {String}
     * @returns {Array}
     */
    shifter = function (arr, scope) {
        let line = -1;
        while (++line < arr.length) {
            arr[line] = scope + arr[line];
        }
        return arr;
    },

    /**
     * Pass may only those who includes something extra, others have to simply pass through.
     * @param content {String}
     * @param file_path {String}
     * @returns {String|Promise.<String>}
     */
    bouncer = async function (content, file_path) {
        const deps = hr_department(content, file_path);
        if (deps.length > 0) {
            return await octopus_whisperer(katana(content), deps, file_path).catch((err) => console.log(err))
        } else {
            return content;
        }
    },

    /**
     * Like bookworm, but reads strings.
     * @param splited {Array}
     * @param deps {Array}
     * @param i {Number}
     * @param loc {String}
     * @returns {Promise.<Promise>}
     */
    stringworm = async function (splited, deps, i, loc) {
        return readFile(loc).then(async (data) => {
            splited[deps[i].line] = await bouncer(data.toString(), loc).catch((err) => console.log(err));
            splited[deps[i].line] = glue(shifter(katana(splited[deps[i].line]), deps[i].scope));
        }).catch((err) => {
            throw new Error(err)
        });
    },

    /**
     * One of multitasking monsters, can't stand why can't you do two things parallel.
     * @param splited {Array}
     * @param deps {Array}
     * @param filePath {String}
     * @yields {Promise.<Promise>}
     */
    octopus = function* (splited, deps, filePath) {
        for (let i = 0; i < deps.length; i++) {
            const loc = path.join(path.dirname(filePath), deps[i].incPath);
            yield stringworm(splited, deps, i, loc).catch((err) => console.log(err))
        }
    },

    /**
     * Says multitasking monster what it wants, and they do.
     * @param splited {Array}
     * @param deps {Array}
     * @param filePath {String}
     * @returns {Promise.<string>}
     */
    octopus_whisperer = async function (splited, deps, filePath) {
        const pending = [];
        for (const i of octopus(splited, deps, filePath)) {
            pending.push(i)
        }
        await Promise.all(pending).catch((err) => console.log(err));
        return glue(splited)
    },

    /**
     * Looks deeply into content and finds who are more, and who are less more.
     * @param content {String}
     * @param filePath {String}
     * @returns {Array}
     */
    hr_department = function (content, filePath) {
        const dependencies = [],
            fileDirectiveRegex = /([ ]*)(#=\s*include\s+<([^>]*)>)/,
            lines = katana(content);
        let line = -1, result;
        while (++line < lines.length) {
            result = fileDirectiveRegex.exec(lines[line]);
            if (result !== null) {
                dependencies.push({
                    line: line,
                    scope: result[1],
                    incPath: result[3],
                    filePath: filePath //relative
                });
            }
        }
        return dependencies;
    },

    /**
     * Includer class
     * @param args
     * @returns {Includer}
     * @constructor
     */
    Includer = function (args) {
        if (!(this instanceof Includer)) {
            return new Includer(args);
        }
        Transform.call(this, args);
        this._buff = '';
        this._ready = false;
        /**
         * Transform function
         * @param chunk
         * @param encoding
         * @param done
         * @returns {Promise.<void>}
         * @private
         */
        Includer.prototype._transform = async function (chunk, encoding, done) {
            if (this._ready) { // if already included
                this.push(chunk); // just push through buffer
                done();
            } else {
                // collect string into buffer
                this._buff = chunk.toString();
                if (chunk._contents) this._buff = chunk._contents.toString();
                //change file
                const src = chunk.history ? chunk.history[0] : files[0];
                const mainFilePath = path.join('.', src);
                this._buff = await bouncer(this._buff, mainFilePath).catch((err) => console.log(err));
                this._ready = true;
                if (chunk._contents) {
                    let temp = this._buff;
                    this._buff = new File();
                    this._buff.path = path.join(path.resolve('.'), path.basename(mainFilePath));
                    this._buff.contents = new Buffer(temp, encoding);
                }
                this.push(this._buff);
                this._buff = '';
                done();
            }
        };
    };

util.inherits(Includer, Transform);

module.exports = {
    Includer,
    katana,
    glue,
    shifter,
    bouncer,
    stringworm,
    octopus,
    octopus_whisperer,
    hr_department
};