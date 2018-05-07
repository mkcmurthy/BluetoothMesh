var bleno = require('bleno');

bleno.on('stateChange', function(state) {
    console.log('on -> stateChange: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising('PiMesh1',['b1a6752152eb4d36e13e357d7c225465']);
    } else {
        bleno.stopAdvertising();
    }
});

// Notify the console that we've accepted a connection
bleno.on('accept', function(clientAddress) {
    console.log("Accepted connection from address: " + clientAddress);
    
});

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
    if (!error) {
        bleno.setServices([
            new bleno.PrimaryService({
                uuid : 'b1a6752152eb4d36e13e357d7c225465',
                characteristics : [
                	// add characteristics here
                ]
            })
        ]);
    }
});
