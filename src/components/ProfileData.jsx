import React from 'react'

const ProfileData = (props) => {
    return (
        <div id="profile-div" className='pt-4'>
            <p><strong>Job Title: </strong> {props.graphData.jobTitle}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
        </div>
    )
}

export default ProfileData