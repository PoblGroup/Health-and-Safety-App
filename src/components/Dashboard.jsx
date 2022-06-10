import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import React, { useEffect } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEmployee, useEmployeeFetch } from '../context/EmployeeContext';
import { motion } from 'framer-motion'

import hsImg from "../assets/hs.svg"


const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0].name
    const employee = useEmployee()
    const fetchEmployee = useEmployeeFetch()

    const svgVariants = {
        hidden: {
            opacity: 0,
            y: -100
        },
        visible: { opacity: 1, y: 0, transitio: { duration: 2 }}
    }

    useEffect(() => {
        fetchEmployee(accounts[0].username)
    }, [])
    

    return (
        <>
            {console.log(process.env.REACT_APP_TEST)}
            <header>
                <h4>Hey! {name}</h4>
                <p className='mt-3'>Welcome to the new Health & Safety Reporting App! <br/> Where you can submit new cases and sign any policy documents.</p>
                <div className='cta'>
                    <LinkContainer to={`/cases-new`}>
                        <Button variant="primary">Create New Case</Button>
                    </LinkContainer>
                    <LinkContainer to={`/documents`}>
                        <Button variant="link">View Documents</Button>
                    </LinkContainer>
                </div>
                <motion.svg viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg"
                    variants={svgVariants}
                    initial="hidden"
                    animate="visible"
                ><path fill="transparent" d="M0 0h900v600H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M564.327 458.004H306.468c-15.293 0-27.691-13.757-27.691-30.729 0-16.971 12.398-30.728 27.691-30.728h97.219c10.915 0 19.765-9.816 19.769-21.927l.001-1.037c.005-11.559-8.438-20.935-18.855-20.935h-.846c-27.47 0-49.624-24.834-49.256-55.312.049-4.107.05-8.212.003-12.321-.354-30.466 21.794-55.282 49.165-55.282h119.679c12.242 0 22.165-11.012 22.165-24.596 0-21.052 15.377-38.116 34.347-38.116h26.246c18.968 0 34.346 17.064 34.346 38.116v69.4c0 19.588 14.31 35.467 31.961 35.467h15.509c24.344 0 44.079 21.9 44.079 48.915 0 27.016-19.735 48.916-44.079 48.916h-80.227c-11.186 0-19.915 10.147-19.598 22.555.005.224.011.447.015.671.328 14.788-10.453 26.943-23.784 26.943z" fill="url(#a)"/><path fill-rule="evenodd" clip-rule="evenodd" d="M324.249 141.094h269.058c15.957 0 28.893 14.396 28.893 32.155s-12.936 32.155-28.893 32.155H491.865c-11.388 0-20.622 10.271-20.627 22.944l-.001 1.086c-.005 12.095 8.804 21.906 19.674 21.906h.882c28.664 0 51.78 25.987 51.396 57.879a543.334 543.334 0 0 0-.003 12.894c.369 31.879-22.741 57.847-51.301 57.847H367.009c-12.774 0-23.128 11.524-23.128 25.738 0 22.029-16.045 39.885-35.838 39.885h-27.386c-19.793 0-35.839-17.856-35.839-39.885v-72.621c0-20.498-14.931-37.114-33.349-37.114h-16.182c-25.401 0-45.994-22.916-45.994-51.185 0-28.269 20.593-51.186 45.994-51.186h83.711c11.672 0 20.78-10.618 20.45-23.602l-.017-.702c-.342-15.475 10.908-28.194 24.818-28.194z" fill="url(#b)"/><path d="M580.417 324.542c12.447 23.178 5.492 57.719 5.492 57.719s-36.835-11.02-49.282-34.216c-12.448-23.196-12.737-47.241-.633-53.726 12.086-6.486 31.976 7.045 44.423 30.223zm-356.27 123.544c6.173-5.399 7.935-16.239 7.935-16.239s-11.963-.819-18.135 4.58c-6.173 5.398-8.897 12.386-6.079 15.607 2.819 3.221 10.104 1.455 16.279-3.948zm410.781-327.354c-6.581 4.891-9.198 15.557-9.198 15.557s11.86 1.766 18.441-3.125c6.582-4.892 9.852-11.642 7.298-15.077-2.554-3.434-9.956-2.252-16.541 2.645z" fill="#E1E4E5"/><ellipse rx="10.372" ry="9.973" transform="scale(1 -1) rotate(43.879 764.118 161.684)" fill="#0d6efd"/><ellipse rx="14.1" ry="13.557" transform="scale(-1 1) rotate(-1.121 10421.938 36000.832)" fill="#0d6efd"/><circle cx="214.081" cy="390.172" r="7.05" transform="rotate(136.121 214.081 390.172)" fill="#E1E4E5"/><circle cx="619.114" cy="171.365" r="7.05" transform="rotate(-28.879 619.114 171.365)" fill="#E1E4E5"/><circle cx="701.849" cy="332.134" r="7.05" transform="rotate(1.121 701.849 332.134)" fill="#E1E4E5"/><circle r="16.842" transform="scale(1 -1) rotate(28.879 579.758 260.332)" fill="#0d6efd"/><circle r="7.98" transform="scale(1 -1) rotate(28.879 412.852 435.417)" fill="#E1E4E5"/><circle r="16.448" transform="scale(-1 1) rotate(-16.121 1274.988 2454.792)" fill="#0d6efd"/><path fill-rule="evenodd" clip-rule="evenodd" d="M271.981 345.569v-94.423c0-31.765 16.894-61.131 44.337-77.113l89.227-51.93a89.256 89.256 0 0 1 89.763 0l89.228 51.93c27.462 15.982 44.356 45.348 44.356 77.113v94.423c0 31.765-16.894 61.13-44.336 77.112l-89.228 51.931a89.256 89.256 0 0 1-89.763 0l-89.227-51.931c-27.463-15.982-44.357-45.347-44.357-77.112z" fill="#0d6efd"/><path d="M450.437 298.357V209.13m-.02 158.627c-2.736 0-4.957 2.22-4.937 4.957a4.959 4.959 0 0 0 4.957 4.957 4.96 4.96 0 0 0 4.957-4.957 4.963 4.963 0 0 0-4.977-4.957" stroke="#fff" stroke-width="29.743" stroke-linecap="round" stroke-linejoin="round"/><path clip-rule="evenodd" d="m706.499 280.692-10.686-10.686 10.686-10.686 10.686 10.686-10.686 10.686zM542.541 124.543l-10.686-10.685 10.686-10.686 10.686 10.686-10.686 10.685zm-335.418 213.48-10.686-10.685 10.686-10.686 10.685 10.686-10.685 10.685z" stroke="#E1E4E5" stroke-width="5.673" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="a" x1="495.725" y1="3.879" x2="501.486" y2="774.606" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient><linearGradient id="b" x1="395.83" y1="616.297" x2="389.784" y2="-190.203" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#EEE"/></linearGradient></defs>
                </motion.svg>
            </header>      
            

            {/* <div className="mt-5">
            <Tabs defaultActiveKey="cases" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="cases" title="My Cases">
                    {employee && <Cases employee={employee}/>}
                </Tab>
                <Tab eventKey="documents" title="My Open Documents">
                    {employee && <PolicyResponses employee={employee}/>}
                </Tab>
                <Tab eventKey="myTeam" title="My Team">
                    <p>If current employee is a manager they can see their teams cases here</p>
                </Tab>
            </Tabs>
            </div> */}
        </>
    )
}

export default ProfileContent