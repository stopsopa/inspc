
#logi

This function use native [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

Node.js mode with browser fallback to **logw**

    const log = require('inspc/logi');
    
    log.colors(true);
    
    log({data: 'string', fn: () => {}});
    log({data: 'string', fn: () => {}}, 2, false); // def: 2, false
    
#log.dump

In many cases faster implementation

Node.js mode with browser fallback to **logw**

    const log = require('inspc/logn');
    // const logn = require('inspc/logn').dump;
    
    log.dump({data: 'string', fn: () => {}})    
    log.dump({data: 'string', fn: () => {}}, 2) // def: 2   
    
#logt

Just fallback to console.log but with timestamp

    const logt = require('inspc/logt');
    
#logw

Just always safe version of console.log with no timestamp    
    
         