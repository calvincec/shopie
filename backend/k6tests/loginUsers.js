import http from 'k6/http'
import {sleep, check} from 'k6'

export const options = {
    vus: 1,
    duration: '1s'
}

export default function () {
    const url = 'http://localhost:4503/users/login';
    const body = JSON.stringify({
        Email: "calyndemo16@gmail.com",
        Password: "12345678"

    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = http.post(url, body, params);

    check(response, {
        'returns a status 200': (res) => res.status === 200
    } )

    check(response, {
        'is succesfully logged in': (res) => res.body.includes('Login successful')
        })

        check(response, {
            'generates token on login' : (res) => res.body.includes("tokenn")
        })
}