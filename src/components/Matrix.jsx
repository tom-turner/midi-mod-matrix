import { useState, useEffect } from 'react'

let learn = (devices) => {
    return new Promise( resolve => {
      devices.map( device => {
        device.oneTimeListener(message => {
          resolve({...device, ...message})
        })
      })
    })
  }

let routeMidi = (inputDevice, outputDevice) => {
    inputDevice.listener( e => {
    	if(e.statusByte !== inputDevice.statusByte)
      		return

    	// this is a generic control message
    	if(inputDevice.statusByte === 176) {
    		if(e.dataBytes[0] !== inputDevice.dataBytes[0])
    			return

    		let value = e.dataBytes[ e.dataBytes.length-1]
    		
    		outputDevice.output.send([ outputDevice.statusByte ,outputDevice.dataBytes[0], value ])

    	}

    	// this is a key press
    	if(inputDevice.statusByte === 144){

    	}

    	// this is a pitch wheel
    	if(inputDevice.statusByte === 224){

    	}
    	
    })
  }

export function Routing(props:any) {
	let { devices } = props
	let [ inputModal, setInputModal ] = useState(false)
	let [ outputModal, setOutputModal ] = useState(false)
	let [ input, setInput ] = useState(null)
	let [ output, setOutput ] = useState(null)

	useEffect( () => {
		( async () => {
			if(inputModal){
				let message = await learn(devices)
				setInput(message)
				setInputModal(false)
			}
		})()
	}, [inputModal])

	useEffect( () => {
		( async () => {
			if(outputModal){
				let message = await learn(devices)
				setOutput(message)
				setOutputModal(false)
			}
		})()
	}, [outputModal])


	if(input && output){
		routeMidi(input, output)
	}

	return (
		<div className="flex w-full space-x-2">
			{ input
				? <p className="truncate w-1/2 text-center my-auto">{`Device: ${input.name} Status: ${input.statusByte} `}</p>
				: inputModal
					? <p className="truncate w-1/2 text-center my-auto">{`Learning...`}</p>
					: <button onClick={ () => {setInputModal(true)} } className="w-1/2 hover:bg-stone-200 p-1 rounded bg-stone-300">Learn Input</button>
			} 
			{ output 
				? <p className="truncate w-1/2 text-center my-auto">{`Device: ${output.name} Status: ${output.statusByte} `}</p>
				: outputModal
					? <p className="truncate w-1/2 text-center my-auto">{`Learning...`}</p>
					: <button onClick={ () => {setOutputModal(true)} } className="w-1/2 hover:bg-stone-200 p-1 rounded bg-stone-300">Learn Output</button>
			}
		</div>
	)
}

export function Matrix(props:any) {
	const { className, devices } = props
	let [ num, setNum ] = useState(1)

	return (
		<div className={`${className} flex-col space-y-1 p-1`}>

			{ Array(num).fill( <Routing devices={devices} /> )}
			<div className="w-full text-center cursor-pointer rounded" onClick={ () => setNum(num+1) }>
				+ 
			</div>
		</div>
	)
}