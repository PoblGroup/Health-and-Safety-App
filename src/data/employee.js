import { GetDynamicsToken } from "../utils/DynamicsAuth";

export const GetEmployee = async (email) => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`https://poblgroup-dynamicsapi.azurewebsites.net/api/hs/employees/${email}`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error', error)
    }
}