import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { Navbar } from "react-bootstrap";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
const SignOutButton = () => {
    const { instance, accounts } = useMsal();
    const name = accounts[0] && accounts[0].name

    return (
        <>
            <Navbar.Text className="me-4">Signed in as: <a href="#login">{name}</a></Navbar.Text>
            <Button variant="danger" className="ml-auto" onClick={() => handleLogout(instance)}>
                Sign out
            </Button>
        </>
        
    );
}

export default SignOutButton