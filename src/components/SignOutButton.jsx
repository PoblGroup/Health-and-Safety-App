import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <Button variant="danger" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out using Popup</Button>
    );
}

export default SignOutButton