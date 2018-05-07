
var noble = require('noble');
var store = [];
var macAddress;
var rss, localName, channel;
var count = 0;


//Object  structure to store the discovered devices details
var deviceInfo = {

	init: function(macAddress, localName, rss){
		this.macAddress = macAddress;
		this.localName = localName;
		this.rss = rss;
	},

	describe: function(){
		var description = this.macAddress + " " + this.localName + " " + this.rss;
		return description;
	}
};

noble.startScanning();

noble.on('discover', function(peripheral) {
  macAddress = peripheral.uuid;
  rss = peripheral.rssi;
  localName = peripheral.advertisement.localName;

  localName = '' + localName;				//localName might not be a string. So this statement makes localName a string.
  macAddress = macAddress.match(/.{2}/g).join(':');	//seperating the macAddress with a colon
 // console.log(macAddress);
  //Identifying and storing bluetooth devices with name  PiMesh% 
  if(localName.substring(0, 2) == 'Pi')
  {
    
    var device = Object.create(deviceInfo);
    device.init(macAddress,localName,rss);
    store.push(device);
    
   //connect only to one device and communicate
    if(count === 0){
    peripheral.connect(function(error) {
      console.log('Connected to Peripheral: ' + macAddress + "\n");
      peripheral.discoverServices(null, function(error, services) {
	
        console.log('Discovered the following Services:');
        for (var i in services) {
          console.log('  ' + i + ' uuid: ' + services[i].uuid);
        }
      });
      count++;
    });
   }
  }
});


//Running the scanning of devices for given interval(3 sec for now)
var clearTime = setTimeout(function(){
noble.stopScanning();

//displaying the devices discovered
store.forEach(function(device){
	console.log(device.macAddress + " "+ device.localName);
});

},3000);

