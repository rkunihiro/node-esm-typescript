import { check } from "k6";
import { get } from "k6/http";

/** @type {import("k6/options").Options} */
export const options = {
    scenarios: {
        default: {
            executor: "constant-arrival-rate",
            duration: "30s",
            rate: 100,
            timeUnit: "1s",
            preAllocatedVUs: 100,
            maxVUs: 1000,
        },
    },
};

export default function test() {
    const res = get("http://prod:3000/");
    check(res, {
        status200(r) {
            return r.status === 200;
        },
    });
}
