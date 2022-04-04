import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import SignOutButton from './SignOutButton'
import SignInButton from './SignInButton'
import { Navbar, Container, Nav } from 'react-bootstrap'

const PageLayout = (props) => {
    const isAunthenticated = useIsAuthenticated()
    // console.log(isAunthenticated)
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            id="logo"
                            alt=""
                            src="/logo_white.png"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="cases">Cases</Nav.Link>
                        <Nav.Link href="documents">Documents</Nav.Link>
                        <Nav.Link href="myteam">My Team</Nav.Link>
                        {/* <Navbar.Text>Signed in as: <a href="#login">Mark Otto</a></Navbar.Text> */}
                    </Nav>
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

