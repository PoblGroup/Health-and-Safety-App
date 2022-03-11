import { useMsal } from '@azure/msal-react';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { loginRequest } from '../authConfig';
import { callMsGraph, listMyTeams } from "../graph";
import ProfileData from './ProfileData';

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [ graphData, setGraphData ] = useState(null)
    const [ myTeamsList, setMyTeamsList ] = useState([])

    const name = accounts[0] && accounts[0].name

    const RequestAccessToken = async () => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        }

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        try {
            const res = await instance.acquireTokenSilent(request)
            const token = res.accessToken
            return token
        } catch (error) {
            const res = await instance.acquireTokenPopup(request)
            const token = res.accessToken
            return token
        }

        // instance.acquireTokenSilent(request).then((response) => {
        //     callMsGraph(response.accessToken).then(response => setGraphData(response));
        // }).catch((e) => {
        //     instance.acquireTokenPopup(request).then((response) => {
        //         callMsGraph(response.accessToken).then(response => setGraphData(response));
        //     });
        // });
    }

    useEffect(async () => {
      const token = await RequestAccessToken()
      if(token) {
        const userData = await callMsGraph(token)
        setGraphData(userData)

        const userTeams = await listMyTeams(token)
        setMyTeamsList(userTeams.value)
      }
    }, [])
    

    return (
        <>
            <h5 className="card-title">Signed in as <span style={{ color:'#E91E63' }}>{name}</span></h5>
            {graphData ?
                <ProfileData graphData={graphData} teamsData={myTeamsList} />
                :
                <Button variant="secondary" onClick={RequestAccessToken}>Request Access Token</Button>
            }
        </>
    )
}

export default ProfileContent