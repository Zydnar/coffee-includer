'use strict';
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs'),
    path = require('path'),
    Transform = require('stream').Transform;
    const util = require('util');
                require('util.promisify').shim();
    const gutil = require('gulp-util'),
    File = gutil.File,
    readFile = util.promisify(fs.readFile),
    /**
     * Kills dragons, saves virgins and splits things.
     * @param content {String}
     * @returns {Array}
     */
    katana = function katana(content) {
        return content.split('\n');
    },
    /**
     * Combines things, previuosly splited by katana().
     * @param arr
     * @returns {String}
     */
    glue = function glue(arr) {
        return arr.join('\n');
    },
    /**
     * Shifts to other dimensions and teleports lines according to include scope.
     * @param arr {Array}
     * @param scope {String}
     * @returns {Array}
     */
    shifter = function shifter(arr, scope) {
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
    bouncer = (() => {
        var _ref = _asyncToGenerator(function* (content, file_path) {
            const deps = hr_department(content, file_path);
            if (deps.length > 0) {
                return yield octopus_whisperer(katana(content), deps, file_path).catch(function (err) {
                    return console.log(err);
                });
            } else {
                return content;
            }
        });
        return function bouncer(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })(),
    /**
     * Like bookworm, but reads strings.
     * @param splited {Array}
     * @param deps {Array}
     * @param i {Number}
     * @param loc {String}
     * @returns {Promise.<Promise>}
     */
    stringworm = (() => {
        var _ref2 = _asyncToGenerator(function* (splited, deps, i, loc) {
            return readFile(loc).then((() => {
                var _ref3 = _asyncToGenerator(function* (data) {
                    splited[deps[i].line] = yield bouncer(data.toString(), loc).catch(function (err) {
                        return console.log(err);
                    });
                    splited[deps[i].line] = glue(shifter(katana(splited[deps[i].line]), deps[i].scope));
                });
                return function (_x7) {
                    return _ref3.apply(this, arguments);
                };
            })()).catch(function (err) {
                throw new Error(err);
            });
        });
        return function stringworm(_x3, _x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    })(),
    /**
     * One of multitasking monsters, can't stand why can't you do two things parallel.
     * @param splited {Array}
     * @param deps {Array}
     * @param filePath {String}
     * @yields {Promise.<Promise>}
     */
    octopus = function* octopus(splited, deps, filePath) {
        for (let i = 0; i < deps.length; i++) {
            const loc = path.join(path.dirname(filePath), deps[i].incPath);
            yield stringworm(splited, deps, i, loc).catch(err => console.log(err));
        }
    },
    /**
     * Says multitasking monster what it wants, and they do.
     * @param splited {Array}
     * @param deps {Array}
     * @param filePath {String}
     * @returns {Promise.<string>}
     */
    octopus_whisperer = (() => {
        var _ref4 = _asyncToGenerator(function* (splited, deps, filePath) {
            const pending = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = octopus(splited, deps, filePath)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    const i = _step.value;
                    pending.push(i);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            yield Promise.all(pending).catch(function (err) {
                return console.log(err);
            });
            return glue(splited);
        });
        return function octopus_whisperer(_x8, _x9, _x10) {
            return _ref4.apply(this, arguments);
        };
    })(),
    /**
     * Looks deeply into content and finds who are more, and who are less more.
     * @param content {String}
     * @param filePath {String}
     * @returns {Array}
     */
    hr_department = function hr_department(content, filePath) {
        const dependencies = [],
            fileDirectiveRegex = /([ ]*)(#=\s*include\s+<([^>]*)>)/,
            lines = katana(content);
        let line = -1,
            result;
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
    Includer = function Includer(args) {
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
        Includer.prototype._transform = (() => {
            var _ref5 = _asyncToGenerator(function* (chunk, encoding, done) {
                if (this._ready) {
                    // if already included
                    this.push(chunk); // just push through buffer
                    done();
                } else {
                    // collect string into buffer
                    this._buff = chunk.toString();
                    if (chunk._contents) this._buff = chunk._contents.toString();
                    //change file
                    const src = chunk.history ? chunk.history[0] : files[0];
                    const mainFilePath = path.join('.', src);
                    this._buff = yield bouncer(this._buff, mainFilePath).catch(function (err) {
                        return console.log(err);
                    });
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
            });
            return function (_x11, _x12, _x13) {
                return _ref5.apply(this, arguments);
            };
        })();
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
