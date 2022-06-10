import { GetDynamicsToken } from "../utils/DynamicsAuth";

export const GetPolicyResponses = async (id) => {
    if (id) {
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hs/policyresponses?employeeId=${id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export const GetPolicyResponse = async (id) => {
    if (id) {
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hs/policyresponses/${id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export const ConfirmResponse = async (id) => {
    if (id) {
        const token = await GetDynamicsToken()

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hs/policyresponses/${id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}