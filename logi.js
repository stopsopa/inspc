
'use strict';

function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]'; // better in node.js to dealing with RowDataPacket object
}

const node = typeof global !== 'undefined' && Object.prototype.toString.call(global.process) === '[object process]';

let colorscache = null;

if (node) {

    global.__stack || Object.defineProperty(global, '__stack', {
        get: function tmp() {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function(_, stack){ return stack; };
            var err = new Error;
            Error.captureStackTrace(err, tmp);
            // Error.captureStackTrace(err, arguments.callee); // without 'use strict'
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });

    global.__line = (function () {

        function rpad(s, n) {

            (typeof n === 'undefined') && (n = 5);

            try {

                if (s && s.length && s.length >= n) {

                    return s;
                }
            }
            catch (e) {
                console.log('exception', typeof s, s, e);
            }

            return String(s + " ".repeat(n)).slice(0, n);
        }

        var tool = function (n) {

            if (typeof n === 'undefined') {

                let tmp = [];

                for (let i in __stack) {

                    if (__stack.hasOwnProperty(i)) {

                        tmp.push('stack: ' + rpad(i) + ' file:' + __stack[i].getFileName() + ':' + rpad(__stack[i].getLineNumber()) + ' ');
                    }
                }

                return tmp;
            }

            (typeof n === 'undefined') && (n = 1);

            if ( ! __stack[n] ) {

                return `${n} not in stack: ` + tool(n - 1);
            }

            const file = __stack[n].getFileName();

            if (file === null) {

                return 'corrected:' + tool(n - 1);
            }

            return (new Date()).toISOString().substring(0, 19).replace('T', ' ') + ' ' + file + ':' + rpad(__stack[n].getLineNumber());
        };

        return tool;
    }());

    const util = eval('require')('util');

    const tool = (obj, depth, colors, stack) => {
        process.stdout.write(tool.log(obj, depth, colors, stack) + "\n");
    };

    /**
     * https://nodejs.org/api/util.html#util_util_inspect_object_options
     */
    tool.log = (obj, depth = 2, colors = false, stack = 0) => {

        let opt = {
            // depth,
            // colors,
            // compact: true,
            // breakLength: 80,
        };

        if (isObject(depth)) {

            opt = Object.assign({
                colors: false,
                compact: false,
            }, opt);
        }
        else {

            opt.depth   = depth;

            opt.colors  = (typeof colorscache === 'boolean') ? colorscache : colors;
        }

        return __line(stack + 3) + "\n" + util.inspect(obj, opt);
    };

    tool.colors = c => colorscache = c;

    module.exports = tool;
}
else {

    module.exports = require('./logw');
}