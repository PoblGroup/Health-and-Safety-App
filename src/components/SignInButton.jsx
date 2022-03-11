import React from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { Button } from 'react-bootstrap'

const handleLogin = (instance) => {
    instance.loginPopup(loginRequest).catch(e => {
        console.error(e)
    })
}

const SignInButton = () => {
    const { instance } = useMsal()

    return (
        <Button variant="light" className="ml-auto" onClick={() => handleLogin(instance)}>
            Sign In
        </Button>
    )
}

export default SignInButton