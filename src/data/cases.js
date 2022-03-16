import { GetDynamicsToken } from "../utils/DynamicsAuth";

export const GetCases = async (id) => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`http://localhost:5000/api/hs/events?employeeId=${id}`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('error', error)
    }        
}

export const GetDynamicsEvent = async (id) => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };     

    try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('error', error)
    }
}
