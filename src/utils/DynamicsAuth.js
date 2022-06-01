
async function GetDynamicsToken() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://poblgroup-dynamicsapi.azurewebsites.net/api/auth/dynamics", requestOptions)
        // const response = await fetch("http://localhost:5000/api/auth/dynamics", requestOptions) 
        const result = await response.json()
        return result.access_token
    } catch (error) {
        console.error(error)
        return error
    }
    // let tokenData = null;
    // var data = qs.stringify({
    //     client_id: "d30e66e5-5d45-4beb-b6b2-7b37887e332b",
    //     client_secret: "xY17Q~_gvpfxXjluvoCKaaqauW0DCpCppV6lk",
    //     grant_type: "client_credentials",
    //     resource: "https://stephen.crm11.dynamics.com",
    // });
    // var config = {
    //     method: "get",
    //     url: "https://login.microsoftonline.com/5f0d9160-6b93-41c6-8db2-153e0d7f7960/oauth2/token",
    //     headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     // Cookie:
    //     //     "fpc=Ao6FWL31ryRKh_UqGTpFn-uxuI2VAQAAAJr5NtkOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd",
    //     },
    //     data: data,
    // };

    // await axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         tokenData = response.data;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // return tokenData;
 } 

export { GetDynamicsToken };

