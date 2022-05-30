import { GetDynamicsToken } from "../utils/DynamicsAuth";

export const GetCases = async (id) => {
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
            const response = await fetch(`http://localhost:5000/api/hs/events?employeeId=${id}`, requestOptions)
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export const GetCaseSingle = async (id) => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };     

    try {
        const response = await fetch(`http://localhost:5000/api/hs/events/${id}`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('error', error)
    }
}

export const CreateNewCase = async (formData, form) => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var data = {
        title: formData.title,
        eventDate: formData.eventDate,
        locationId: formData.locationId,
        exactLocation: formData.exactLocation,
        description: formData.description,
        caseType: formData.caseType,
        jobRoleId: formData.jobRole,
        employeeId: formData.employeeId,
        
    };

    if(form === "Accident") {
        data.affectedPerson = formData.affectedPerson
        data.affectedPersonNotes = formData.affectedPersonNotes
        data.category = formData.category
        data.injury = formData.injury
        data.injuryPart = formData.injuryPart
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://localhost:5000/api/hs/events", requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error', error)
    }
}

export const GetLookupValues = async () => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`http://localhost:5000/api/hs/events/lookups`, requestOptions)
        const result = await response.json()

        const categories = []
        categories.push({ key: 'Please select an option', value: ''})
        result.categories.value.map(c => categories.push({ key: c.pobl_accidentcategoryname, value: c.pobl_accidentcategoryid}))

        const injuries = []
        injuries.push({ key: 'Please select an option', value: ''})
        result.injuries.value.map(c => injuries.push({ key: c.pobl_injurysustainedname, value: c.pobl_injurysustainedid}))

        const injuryParts = []
        injuryParts.push({ key: '', value: ''})
        result.injuryParts.value.map(c => injuryParts.push({ key: c.pobl_injuredpartname, value: c.pobl_injuredpartid}))

        const employees = []
        employees.push({ key: '', value: ''})
        result.employees.value.map(e => employees.push({ key: e.pobl_employeename, value: e.pobl_employeehsid}))

        const witnessTypes = []
        witnessTypes.push({ key: '', value: ''})
        result.witnessTypes.map(e => witnessTypes.push({ key: e.witnessTypeName, value: e.witnessTypeId.toString()}))

        const emergencyServices = []
        emergencyServices.push({ key: '', value: ''})
        result.emergencyServices.map(e => emergencyServices.push({ key: e.emergencyServiceName, value: e.emergencyServiceId.toString()}))

        return {
            categories,
            injuries,
            injuryParts,
            employees,
            witnessTypes,
            emergencyServices
        }
    } catch (error) {
        console.log('Error', error)
    }
}

export const GetTeamCases = async (id) => {
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
            const response = await fetch(`http://localhost:5000/api/hs/events/myteam?managerId=33580c82-b4c2-ec11-983e-000d3a875909`, requestOptions) 
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Error', error)
        }
    }
}

export const UpdateCase = async (newCase) => {
    const { outcome } = newCase;
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({
        "eventFindings": newCase.eventFindings,
        "investigationDate": newCase.investigationDate,
        "outcome": (outcome != null) ? outcome : null
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

    try {
        const response = await fetch(`http://localhost:5000/api/hs/events/${newCase.id}`, requestOptions)
        const result = await response.json()
        return result
    } catch (error) {
        console.log('Error', error)
    }
}