import './global.css';
import { Bebas_Neue } from 'next/font/google';
import GoogleAnalyticsClient from '../components/GoogleAnalyticsClient';
import BackToTop from '../components/BackToTop';
import { Metadata } from 'next';

const bebasNeue = Bebas_Neue({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://isaacyakl.com'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={bebasNeue.variable} style={{ '--font-family-headings': bebasNeue.style.fontFamily } as React.CSSProperties}>
            <body>
                <GoogleAnalyticsClient gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                <BackToTop />
                {children}
            </body>
        </html>
    );
}
