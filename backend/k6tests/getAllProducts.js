import { check } from 'k6'
import http from 'k6/http'
export const options = {
    executor:'per-vu-iterations',
    iterations: 1000,
    vus: 300,
    duration: '45s'
}

export default function () {
    const url = 'http://localhost:4503/product/all';
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = http.get(url, params);

    check(response, {
        'returns a status 200': (res) => res.status === 200
    } )

 
}