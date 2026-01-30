"use client";

import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function GoogleAnalyticsClient({ gaMeasurementId }: { gaMeasurementId?: string }) {
    if (!gaMeasurementId) return null;
    return <GoogleAnalytics gaMeasurementId={gaMeasurementId} />;
}
