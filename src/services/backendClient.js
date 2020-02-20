import { backendBaseUrl } from "../utils/config"
import { promiseReject } from "../utils/misc"

class BackendClient {

    checkStatusAndGetJSON = fetchResponse => fetchResponse.ok ? fetchResponse.json() : fetchResponse.json().then(promiseReject)
    
    checkForTokenExpiry = error => promiseReject(error)      

    get = path => {
        let options = {}
        options = {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        }    
        return fetch(backendBaseUrl + path, options).then(this.checkStatusAndGetJSON).catch(this.checkForTokenExpiry)
    }

}

export default new BackendClient()