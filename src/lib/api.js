import {WebMidi} from 'webmidi'

export class MidiDevices {
	constructor(){
		this.devices = []
		WebMidi
			.enable()
			.then(this.onEnabled())
			.catch(err => console.log(err));
	}

	onEnabled() {
			WebMidi.inputs.forEach((device, index) => {
			  this.devices.push({
			    name: device.name,
			    input: WebMidi.getInputByName(device.name),
			    output: WebMidi.getOutputByName(device.name),
			    listener: (callback: any) => this.getMidiMessage(device, message => {
			      return callback(message)
			    })
			  })
			});
	}
	
	getDevices(){
		return this.devices
	}

	getMidiMessage(device, callback){
	  let input = WebMidi.getInputByName(device.name)
	  input.addListener('midimessage', e => {
	    callback(e)
	  })
	}
}

export const midi = new MidiDevices()
