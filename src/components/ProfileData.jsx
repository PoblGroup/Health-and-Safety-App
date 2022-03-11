import React from 'react'
import { ListGroup } from 'react-bootstrap'

const ProfileData = ({ graphData, teamsData}) => {
    return (
        <>

        <div id="profile-div" className='pt-4'>
            <p><strong>Job Title: </strong> {graphData.jobTitle}</p>
            <p><strong>Email: </strong> {graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {graphData.id}</p>
        </div>
        <br/><br/>

        <h4>My Teams</h4>

        {console.log(teamsData)}

        <hr/>

        <ListGroup>
            {teamsData ? 
                teamsData.map((team, index) => (
                    <ListGroup.Item>{team.displayName}</ListGroup.Item>
                ))
                : <p>No Data</p>
            }
        </ListGroup>

        </>
    )
}

export default ProfileData