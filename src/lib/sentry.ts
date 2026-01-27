import * as Sentry from "@sentry/nextjs";

interface SentryContext {
    service?: string;
    action?: string;
    page?: string;
    component?: string;
    userId?: string;
    extra?: Record<string, unknown>;
}

export function captureServiceError(error: unknown, context: SentryContext) {
    Sentry.captureException(error, {
        tags: {
            type: 'service_error',
            service: context.service,
            action: context.action,
            page: context.page,
            component: context.component,
        },
        extra: {
            ...context.extra,
            timestamp: new Date().toISOString(),
        },
        user: context.userId ? { id: context.userId } : undefined,
    });
}
