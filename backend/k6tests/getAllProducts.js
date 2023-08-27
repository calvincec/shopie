import { sleep } from 'k6'
import http from 'k6/http'
export const options = {
    executor:'per-vu-iterations',
    iterations: 1000,
    vus: 100,
    duration: '15s'
}

export default function () {
    http.get('http://localhost:4503/product/all')
    sleep(1)
}