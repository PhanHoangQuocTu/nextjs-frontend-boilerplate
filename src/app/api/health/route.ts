import { env } from '@/constants/env';
import type { IHealthResponse } from '@/api/health/type';

// Never cache: this endpoint reports live state (also used as Docker / k8s probe).
export const dynamic = 'force-dynamic';

/** GET /api/health -> liveness probe (cheap, no upstream call). */
export async function GET() {
  const body: IHealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    version: env.APP_VERSION,
    environment: env.APP_ENV,
  };

  return Response.json(body, { headers: { 'Cache-Control': 'no-store' } });
}
