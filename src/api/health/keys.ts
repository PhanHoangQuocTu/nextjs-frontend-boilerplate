/** Endpoint path served by the BFF at `/api/health` (also used as Docker / k8s probe). */
export const HEALTH_KEYS = {
  GET_HEALTH: '/health',
} as const;

export const healthQueryKeys = {
  all: ['health'] as const,
};
