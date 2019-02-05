[![npm version](https://badge.fury.io/js/inspc.svg)](https://badge.fury.io/js/inspc)
[![NpmLicense](https://img.shields.io/npm/l/inspc.svg)](https://github.com/stopsopa/inspc/blob/master/LICENSE)


logi
---

This function use native [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options)

Node.js mode with browser fallback to **logw**

    const log = require('inspc/logi');
    
    log.colors(true);
    
    log({data: 'string', fn: () => {}});
    log({data: 'string', fn: () => {}}, 2, false); // def: 2, false
    
log.dump
---

In many cases faster implementation

Node.js mode with browser fallback to **logw**

    const log = require('inspc/logn');
    // const logn = require('inspc/logn').dump;
    
    log.dump({data: 'string', fn: () => {}})    
    log.dump({data: 'string', fn: () => {}}, 2) // def: 2   
    
logt
---

Just fallback to console.log but with timestamp

    const logt = require('inspc/logt');
    
or:
    
    const log = require('inspc');
    
    cosnt logt = log.t;
    
logw
---

Just always safe version of console.log with no timestamp 

    const logw = require('inspc/logw');  
    
# grabbing output to string variable

```javascript

log.start();

log.dump('test1');

log('test2');

// true or false to additionally flush data to screen after return (def false)
const tmp = log.get(true);
```    
    
require all
---

    
    const log = require('inspc');
    
    const data = {
        one: 'two',
        three: true,
        four: () => {},
        a: ['str', null, undefined, 2, 'end', {obj:'val'}]
    };
    
    data.z = {raz: {dwa: {trzy: {cztery:  'piec'}}}};
    log.dump(data, 3)
    log.i(data, 3)
    log.json(data)
    log.i(data, 1, true) // colors on
    
will print:

![image](https://user-images.githubusercontent.com/3743506/50531636-4ca2f200-0b05-11e9-93ae-9641ed80431d.png)
    
addidional tools
---    

    require('inspc/isObject')
    require('inspc/isArray')
    
    const node = require('inspc/isNode');
    
    require('inspc/getUserAgent')
    
    const isGoogleChrome = require('inspc/isGoogleChrome')
    
    const userAgent = (function () {try {return staticContext.req.headers['user-agent']}catch(e){}}());
    
    isGoogleChrome(userAgent) 


    
         
