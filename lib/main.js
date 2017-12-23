'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = require('util');
require('util.promisify').shim();
var fs = require('fs'),
    path = require('path'),
    Transform = require('stream').Transform,
    File = require('vinyl'),
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
    var line = -1;
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
bouncer = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(content, file_path) {
        var deps;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        deps = hr_department(content, file_path);

                        if (!(deps.length > 0)) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 4;
                        return octopus_whisperer(katana(content), deps, file_path).catch(function (err) {
                            return console.log(err);
                        });

                    case 4:
                        return _context.abrupt('return', _context.sent);

                    case 7:
                        return _context.abrupt('return', content);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function bouncer(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}(),


/**
 * Like bookworm, but reads strings.
 * @param splited {Array}
 * @param deps {Array}
 * @param i {Number}
 * @param loc {String}
 * @returns {Promise.<Promise>}
 */
stringworm = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(splited, deps, i, loc) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', readFile(loc).then(function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                _context2.next = 2;
                                                return bouncer(data.toString(), loc).catch(function (err) {
                                                    return console.log(err);
                                                });

                                            case 2:
                                                splited[deps[i].line] = _context2.sent;

                                                splited[deps[i].line] = glue(shifter(katana(splited[deps[i].line]), deps[i].scope));

                                            case 4:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, _this);
                            }));

                            return function (_x7) {
                                return _ref3.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            throw new Error(err);
                        }));

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function stringworm(_x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}(),


/**
 * One of multitasking monsters, can't stand why can't you do two things parallel.
 * @param splited {Array}
 * @param deps {Array}
 * @param filePath {String}
 * @yields {Promise.<Promise>}
 */
octopus = /*#__PURE__*/_regenerator2.default.mark(function octopus(splited, deps, filePath) {
    var i, loc;
    return _regenerator2.default.wrap(function octopus$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    i = 0;

                case 1:
                    if (!(i < deps.length)) {
                        _context4.next = 8;
                        break;
                    }

                    loc = path.join(path.dirname(filePath), deps[i].incPath);
                    _context4.next = 5;
                    return stringworm(splited, deps, i, loc).catch(function (err) {
                        return console.log(err);
                    });

                case 5:
                    i++;
                    _context4.next = 1;
                    break;

                case 8:
                case 'end':
                    return _context4.stop();
            }
        }
    }, octopus, this);
}),


/**
 * Says multitasking monster what it wants, and they do.
 * @param splited {Array}
 * @param deps {Array}
 * @param filePath {String}
 * @returns {Promise.<string>}
 */
octopus_whisperer = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(splited, deps, filePath) {
        var pending, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

        return _regenerator2.default.wrap(function _callee4$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        pending = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context5.prev = 4;

                        for (_iterator = octopus(splited, deps, filePath)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            i = _step.value;

                            pending.push(i);
                        }
                        _context5.next = 12;
                        break;

                    case 8:
                        _context5.prev = 8;
                        _context5.t0 = _context5['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context5.t0;

                    case 12:
                        _context5.prev = 12;
                        _context5.prev = 13;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 15:
                        _context5.prev = 15;

                        if (!_didIteratorError) {
                            _context5.next = 18;
                            break;
                        }

                        throw _iteratorError;

                    case 18:
                        return _context5.finish(15);

                    case 19:
                        return _context5.finish(12);

                    case 20:
                        _context5.next = 22;
                        return Promise.all(pending).catch(function (err) {
                            return console.log(err);
                        });

                    case 22:
                        return _context5.abrupt('return', glue(splited));

                    case 23:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee4, this, [[4, 8, 12, 20], [13,, 15, 19]]);
    }));

    return function octopus_whisperer(_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
    };
}(),


/**
 * Looks deeply into content and finds who are more, and who are less more.
 * @param content {String}
 * @param filePath {String}
 * @returns {Array}
 */
hr_department = function hr_department(content, filePath) {
    var dependencies = [],
        fileDirectiveRegex = /([ ]*)(#=\s*include\s+<([^>]*)>)/,
        lines = katana(content);
    var line = -1,
        result = void 0;
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
    Includer.prototype._transform = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(chunk, encoding, done) {
            var src, mainFilePath, temp;
            return _regenerator2.default.wrap(function _callee5$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (!this._ready) {
                                _context6.next = 5;
                                break;
                            }

                            // if already included
                            this.push(chunk); // just push through buffer
                            done();
                            _context6.next = 17;
                            break;

                        case 5:
                            // collect string into buffer
                            this._buff = chunk.toString();
                            if (chunk._contents) this._buff = chunk._contents.toString();
                            //change file
                            src = chunk.history ? chunk.history[0] : files[0];
                            mainFilePath = path.join('.', src);
                            _context6.next = 11;
                            return bouncer(this._buff, mainFilePath).catch(function (err) {
                                return console.log(err);
                            });

                        case 11:
                            this._buff = _context6.sent;

                            this._ready = true;
                            if (chunk._contents) {
                                temp = this._buff;

                                this._buff = new File();
                                this._buff.path = path.join(path.resolve('.'), path.basename(mainFilePath));
                                this._buff.contents = new Buffer(temp, encoding);
                            }
                            this.push(this._buff);
                            this._buff = '';
                            done();

                        case 17:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee5, this);
        }));

        return function (_x11, _x12, _x13) {
            return _ref5.apply(this, arguments);
        };
    }();
};

util.inherits(Includer, Transform);

module.exports = {
    Includer: Includer,
    katana: katana,
    glue: glue,
    shifter: shifter,
    bouncer: bouncer,
    stringworm: stringworm,
    octopus: octopus,
    octopus_whisperer: octopus_whisperer,
    hr_department: hr_department
};

//# sourceMappingURL=main.js.map