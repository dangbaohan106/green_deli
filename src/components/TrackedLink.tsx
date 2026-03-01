'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';

interface TrackedLinkProps extends LinkProps {
    eventName: string;
    eventPayload?: Record<string, any>;
    children: React.ReactNode;
    className?: string;
}

/**
 * TrackedLink Component
 * A wrapper around Next.js Link that triggers a telemetry event before navigating.
 * This serves as a foundation for ML Data Lineage.
 */
export function TrackedLink({ eventName, eventPayload, children, ...props }: TrackedLinkProps) {
    const handleClick = () => {
        // Tích hợp hệ thống telemetry client-side tại đây
        console.log(`[Telemetry Client] ${eventName}:`, JSON.stringify(eventPayload || {}));
    };

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
}
