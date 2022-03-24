import React, { useState, useEffect, useContext } from 'react'
import { GetEmployee } from '../data/employee'

const EmployeeContext = React.createContext()
const EmployeeFetchContext = React.createContext()

export function useEmployee() {
    return useContext(EmployeeContext)
}

export function useEmployeeFetch() {
    return useContext(EmployeeFetchContext)
}

export function EmployeeProvider({ children }) {
    const [employee, setEmployee] = useState(() => {
        // Get Stored Value
        const e = localStorage.getItem("HS Employee")
        const intialValue = JSON.parse(e)
        return intialValue || null
    })

    async function fetchEmployee(email) {
        const hsEmployee = await GetEmployee(email)
        setEmployee(hsEmployee)
        localStorage.setItem("HS Employee", JSON.stringify(hsEmployee));
    }

    return (
        <EmployeeContext.Provider value={employee}>
            <EmployeeFetchContext.Provider value={fetchEmployee}>
                {children}
            </EmployeeFetchContext.Provider>
        </EmployeeContext.Provider>
    )
}

