import { graphConfig, joinedTeams } from "../authConfig"

export async function callMsGraph(accessToken) {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`

    headers.append("Authorization", bearer)

    const options = {
        method: "GET",
        headers
    }

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export async function listMyTeams(accessToken) {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`

    headers.append("Authorization", bearer)

    const options = {
        method: "GET",
        headers
    }

    return fetch(joinedTeams.myTeamsEndpoint, options)
        .then(res => res.json())
        .catch(error => console.log(error))
}