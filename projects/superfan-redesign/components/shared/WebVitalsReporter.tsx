'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

const REPORT_URL = '/api/web-vitals';

function sendToAnalytics(metric: Metric) {
  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon(REPORT_URL, JSON.stringify(body));
  } else {
    fetch(REPORT_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    });
  }
}

export const WebVitalsReporter: React.FC = () => {
  useEffect(() => {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, []);

  return null;
};
