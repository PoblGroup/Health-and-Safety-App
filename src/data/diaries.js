import { GetDynamicsToken } from "../utils/DynamicsAuth";

export const GetDiaryEntries = async (id) => {
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hs/diary/entries?employeeId=${id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export const GetDiaryEntry = async (id) => {
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hs/diary/entries/${id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export const UpdateEntry = async (entry, completion) => {
    var data = null
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    if(completion) {
        data = JSON.stringify({
            "completionNotes": entry.completionNotes,
            "completion": "true"
        });
    } else {
        data = JSON.stringify({
            "areasCovered": entry.areasCovered,
            "areasRemaining": entry.areasRemaining,
            "completion": "false"
        });
    }

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/hs/diary/entries/${entry.id}`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error', error)
    }
}