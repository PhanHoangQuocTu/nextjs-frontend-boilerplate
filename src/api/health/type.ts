export interface IHealthResponse {
  status: 'ok';
  /** ISO timestamp. */
  timestamp: string;
  /** Process uptime in seconds. */
  uptime: number;
  version: string;
  environment: string;
}

/** Response plus the browser -> BFF round-trip time, measured by `getHealthRequest`. */
export interface IHealthResult extends IHealthResponse {
  latencyMs: number;
}
