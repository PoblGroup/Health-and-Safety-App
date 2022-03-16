import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'
import { Navbar, Container } from 'react-bootstrap'

const PageLayout = (props) => {
    const isAunthenticated = useIsAuthenticated()
    // console.log(isAunthenticated)
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Health & Safety Reporting</Navbar.Brand>
                    {isAunthenticated ? <SignOutButton /> : <SignInButton/>}
                </Container>                
            </Navbar>
            <Container className="py-5">
                {props.children}
            </Container>
        </>
    )
}

export default PageLayout