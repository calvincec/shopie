import http from 'k6/http'
import { check } from 'k6'

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_failed: ['rate<0.01'],  // the error rate must be lower than 1%
        http_req_duration: ['p(95)<500'] // 90% of requests should be below 500ms
    }
}

export default function () {
    const url = 'http://localhost:4503/users/login';
    const body = JSON.stringify({
        Email: "kevoooo@icloud.com",
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
    })

    check(response, {
        'is succesfully logged in': (res) => res.body.includes('Login successful')
    })

    check(response, {
        'generates token on login': (res) => res.body.includes("token")
    })
}