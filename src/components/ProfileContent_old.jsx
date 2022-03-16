import { useMsal } from '@azure/msal-react';
import React, { useState, useEffect } from 'react'
import { loginRequest } from '../authConfig';
import { callMsGraph, listMyTeams } from "../graph";
import ProfileData from './ProfileData';
import { CgProfile } from 'react-icons/cg'
import { GetDynamicsEvents } from '../data/cases'
import { GetEmployee } from '../data/employee';

const ProfileContent = () => {
    // const { instance, accounts } = useMsal();
    // const [ graphData, setGraphData ] = useState(null)
    // const [ myEvents, setMyEvents ] = useState([])
    // const [ employeeData, setEmployeeData ] = useState({})

    // const name = accounts[0] && accounts[0].name

    // const RequestAccessToken = async () => {
    //     const request = {
    //         ...loginRequest,
    //         account: accounts[0]
    //     }

    //     // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    //     try {
    //         const res = await instance.acquireTokenSilent(request)
    //         const token = res.accessToken
    //         return token
    //     } catch (error) {
    //         const res = await instance.acquireTokenPopup(request)
    //         const token = res.accessToken
    //         return token
    //     }

    //     // instance.acquireTokenSilent(request).then((response) => {
    //     //     callMsGraph(response.accessToken).then(response => setGraphData(response));
    //     // }).catch((e) => {
    //     //     instance.acquireTokenPopup(request).then((response) => {
    //     //         callMsGraph(response.accessToken).then(response => setGraphData(response));
    //     //     });
    //     // });
    // }

    // useEffect(() => {      
    //     async function GetGraphData() {
    //         const token = await RequestAccessToken()
    //         if(token) {
    //             const userData = await callMsGraph(token)
    //             setGraphData(userData)
    //         }
    //     }
    //     GetGraphData()
    //     async function GetEvents() {
    //        const events = await GetDynamicsEvents()
    //        setMyEvents(events)
    //     }
    //     GetEvents()
    //     async function GetEmployeeInfo() {
    //         const employee = await GetEmployee(graphData.mail)
    //         setEmployeeData(employee.value[0])
    //         console.log(employee.value[0])
    //     }
    //     GetEmployeeInfo()
    // }, [])
    
    return (
        <>
        old page
            {/* <h4 className="card-title"><CgProfile size={26} /> &nbsp; <span style={{ color:'#E91E63' }}>{name}</span></h4>
            {employeeData ? <div className='mt-3'><p>Email: {employeeData.pobl_employeeemail}</p></div> : null }
            { graphData ? <ProfileData graphData={graphData} eventsData={myEvents} /> : null } */}
        </>
    )
}

export default ProfileContent