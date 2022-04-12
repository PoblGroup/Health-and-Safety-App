import React, { useEffect, useRef, useState } from 'react'
import AutoComplete from '../components/AutoComplete'
import { GetTeams } from '../data/teams'

function Test() {
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState("")

    useEffect(() => {
        async function FetchTeams() {
            let loc = []
            const hsTeams = await GetTeams()
            loc.push({ key: 'Please select an option', value: ''})
            if(hsTeams.value.length > 0) {
                hsTeams.value.map(t => loc.push({ key: t.pobl_teamname, value: t.pobl_teamid}))
                setLocations(loc)
            }
        }
        FetchTeams()
    }, [])


    return (
        <div className="auto-container">
            <AutoComplete suggestions={locations} label={"Testing Form Input"} setSelectedOption={setSelectedLocation}/>
        </div>
    )
}

export default Test