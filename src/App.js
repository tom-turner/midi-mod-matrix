import React from 'react';
import { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { Viewer } from './components/Viewer'
import { Utilities } from './components/Utilities'
import { Matrix } from './components/Matrix'
import { WebMidi } from 'webmidi'


function App() {
  let [devices, setDevices] = useState([])

  let getMidiMessage = (device, callback) => {
    device.addListener('midimessage', e => {
      callback(e)
    })
  }

  let oneTimeListener = (device, callback) => {
    device.addOneTimeListener('midimessage', e => {
      callback(e)
    })
  }

  let onEnabled = () => {
      WebMidi.inputs.forEach((device, index) => {
        if(devices.find( e => e.name === device.name ))
          return 

        setDevices([...devices, {
          name: device.name,
          input: WebMidi.getInputByName(device.name),
          output: WebMidi.getOutputByName(device.name),
          listener: callback => getMidiMessage(device, message => {
            return callback(message)
          }),
          oneTimeListener: callback => oneTimeListener(device, message => {
            return callback(message)
          })
        }])
      });
  }

  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(`Error: ${err}`));

  return (
    <div className="h-screen w-full bg-stone-100 flex-col p-4 overflow-hidden">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Midi Mod Matrix by Tom Turner</h1>
        <button className="border border-black px-2 py-1 rounded" onClick={ () => { document.location.reload() } } > v0.1 Refresh </button>
      </div>
      <div className="py-2 flex flex-col">
        <p>
          Ever wanted to linearly control the slop of your Dave Smith Prophet 6 using its mod wheel? Or control an instrument's cutoff filter from another? Well, now you can. Welcome to the Midi Mod Matrix. This simple app lets you route midi control messages between instruments or even between parameters on the same instrument, giving midi instruments some new possibilities.
        </p>
        <br/>
        <p>
          The Midi Mod Matrix is currently limited to CC messages and messages must be learnt from an incoming message, but I plan to expand this to include everything in the midi table with a select option. I also hope to add LFOs and envelope utilities to use as sources or as modifiers for midi messages, plus provide additional routing and manipulation of control messages to gain access to new modulation capabilities for your instruments.
        </p>
        <br/>
        <p>  
          Please let me know if this is something you would like to see more development into, even just a thumbs up helps! If you like this idea, would like to support it or to give me feedback, you can email me at <a className="underline cursor-pointer" onClick={ () => window.location.href = 'mailto:tom.turner@live.co.uk'}> tom.turner@live.co.uk. </a>
        </p>
      </div>
      <div className="flex flex-col lg:flex-row py-4 lg:space-x-4 space-y-4 lg:space-y-0">
        <Matrix devices={devices} className="flex w-full border border-black rounded" />
      </div>
      <Viewer devices={devices} />
    </div>
  );
}

export default App;
