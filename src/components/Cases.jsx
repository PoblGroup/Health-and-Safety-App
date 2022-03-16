import React, { useEffect, useState } from 'react'
import { GetCases } from '../data/cases'

const Cases = ({ employee }) => {
    const [cases, setCases] = useState([])
    
    useEffect(() => {
        // async function FetchCases() {
        //     const myCases = await GetCases(employee.pobl_employeehsid)
        //     console.log('Cases', myCases)
        //     setCases(myCases)
        // }
        // FetchCases()
    }, [])
    

    return (
        <div>Cases</div>
    )
}

export default Cases