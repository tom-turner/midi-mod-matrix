import { useState } from 'react'

export function Viewer({ devices }) {
	let [ lastMessage, setLastMessage ] = useState({})

    devices.map(( device ) => {
      device.listener(( e) => {
        setLastMessage({...device, ...e })
      })
    })

	return (
		<div className="absolute bottom-0 right-0 m-4 py-4 px-8 bg-stone-100 border border-black rounded">
			<p>{`Device: ${lastMessage.name || ''} - Status Byte: ${lastMessage.statusByte || ''} - Data Bytes: ${lastMessage.dataBytes || ''}`}</p>
		</div>
	)
}