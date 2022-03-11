import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'
import { Navbar, Container } from 'react-bootstrap'

const PageLayout = (props) => {
    const isAunthenticated = useIsAuthenticated()
    console.log(isAunthenticated)
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">H&S Incident Reporting</Navbar.Brand>
                    {isAunthenticated ? <SignOutButton /> : <SignInButton/>}
                </Container>                
            </Navbar>
            <Container>
                <h5 className="pt-4">Welcome to our new Health & Safety Incident Reporting App!</h5>
                <br/><br/>
                {props.children}
            </Container>
        </>
    )
}

export default PageLayout