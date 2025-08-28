import type { NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NEXT_PUBLIC_ENV === 'dev') {
    // eslint-disable-next-line no-console
    console.log('[WebVitals]', metric)
  }
}


