import { GetDynamicsToken } from "../utils/DynamicsAuth";

export const GetTeams = async () => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`http://localhost:5000/api/hs/events/teams`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error', error)
    }
}

