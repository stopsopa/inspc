
#logi

    const log = require('inspc/logi');
    
    log.colors(true);
    
    log({data: 'string', fn: () => {}});
    log({data: 'string', fn: () => {}}, 2, false); // def: 2, false
    
#log.dump

    const log = require('inspc/logn');
    
    log.dump({data: 'string', fn: () => {}})    
    log.dump({data: 'string', fn: () => {}}, 2) // def: 2    