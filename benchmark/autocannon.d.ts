
declare module "autocannon" {
    export interface CannonHistogram {
        average:number,
        mean:number,
        stddev:number,
        min:number,
        max:number,
        total:number,
        p0_001:number,
        p0_01:number,
        p0_1:number,
        p1:number,
        p2_5:number,
        p10:number,
        p25:number,
        p50:number,
        p75:number,
        p90:number,
        p97_5:number,
        p99:number,
        p99_9:number,
        p99_99:number,
        p99_999:number,
        sent:number
    }
    export interface CannonResult {
        title: string,
        url: string,
        socketPath: string,
        requests:CannonHistogram,
        latency:CannonHistogram,
        throughput:CannonHistogram,
        errors: number,
        timeouts: number,
        duration: number,
        start: Date,
        finish: Date,
        connections: number,
        pipelining: number,
        non2xx: number,
    }
    export interface CannonOption {
        url: string,
        socketPath?: string,
        connections?: number,
        duration?: number,
        amount?: number,
        timeout?: number,
        pipelining?: number,
        bailout?: number,
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        title?: string,
        body?: string,
        headers?: object,
        setupClient?: Function,
        maxConnectionRequests?: number,
        maxOverallRequests?: number,
        connectionRate?: number,
        overallRate?: number,
        reconnectRate?: number,
        requests?: any[],
        idReplacement?: boolean,
        forever?: boolean,
        servername?: string,
        excludeErrorStats?: boolean,
    }
    export default function (opts: CannonOption, callback: (err: any, result: CannonResult) => void): NodeJS.EventEmitter
}