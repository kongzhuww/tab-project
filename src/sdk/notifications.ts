// Reuse the existing bounded notification queue and per-notification close handle.
export { notificationController as notifications } from "../notifications/store";
export type { NotificationOptions, NotificationHandle } from "../notifications/store";
