import WebMidi from 'webmidi'

let devices = []
// Enable WebMidi.js and trigger the onEnabled() function when ready.
WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => console.log(err));

function onEnabled() {
  WebMidi.inputs.forEach((device, index) => {
    devices.push({
      name: device.name,
      input: WebMidi.getInputByName(device.name),
      output: WebMidi.getOutputByName(device.name),
      listener: (callback: any) => getMidiMessage( device, (message: any) => {
        return callback(message)
      })
    })
  });
}


function getMidiMessage(device, callback){
  let input = WebMidi.getInputByName(device.name)
  input.addListener('midimessage', e => {
    callback(e.rawData)
  })
} 

function routeCC(inputDevice, outputDevice) {
  inputDevice.listener( e => {
    console.log(e)
    outputDevice.sendControlChange()
  })
}


