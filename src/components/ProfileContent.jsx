import { useMsal } from '@azure/msal-react';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import { loginRequest } from '../authConfig';
import { callMsGraph } from "../graph";
import ProfileData from './ProfileData';

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [ graphData, setGraphData ] = useState(null)

    const name = accounts[0] && accounts[0].name

    const RequestAccessToken = () => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        }

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    useEffect(() => {
      RequestAccessToken()
    }, [])
    

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ?
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestAccessToken}>Request Access Token</Button>
            }
        </>
    )
}

export default ProfileContent