export interface ApiOptions {
  simulatedLatencyMin?: number;
  simulatedLatencyMax?: number;
  failureRate?: number; // 0 to 1
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: 'NETWORK_ERROR' | 'UNAUTHORIZED' | 'RATE_LIMITED' | 'SERVER_ERROR' = 'SERVER_ERROR'
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Development simulation control switches
export const simConfig = {
  forceFailPlatform: null as string | null, // e.g. 'instagram' or 'x'
  forceRateLimit: false,
};

export async function simulatedFetch<T>(
  dataFetcher: () => T,
  options: ApiOptions = {}
): Promise<T> {
  const minLatency = options.simulatedLatencyMin ?? 400;
  const maxLatency = options.simulatedLatencyMax ?? 1200;

  // Simulate network latency (400 - 1200ms)
  await delay(randomBetween(minLatency, maxLatency));

  // Check controlled rate-limit simulation
  if (simConfig.forceRateLimit) {
    throw new ApiError(
      'Analytics temporarily unavailable. The provider has asked us to slow down.',
      429,
      'RATE_LIMITED'
    );
  }

  // Simulate random occasional network drop if requested
  if (options.failureRate && Math.random() < options.failureRate) {
    throw new ApiError(
      'We couldn\'t connect to the server. Please check your network.',
      503,
      'NETWORK_ERROR'
    );
  }

  return dataFetcher();
}
