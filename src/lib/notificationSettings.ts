import type { NotificationAlertSetting, NotificationSettingsSnapshot } from "@/types";

export const emptyNotificationSettingsSnapshot: NotificationSettingsSnapshot = {
  settings: { alerts: [] },
  groups: [],
  health: { deliveryRate: 0, deliveredLast24h: 0 },
  auditItems: [],
};

export function notificationSettingsAlerts(
  snapshot: NotificationSettingsSnapshot | null
): NotificationAlertSetting[] {
  return snapshot?.settings.alerts ?? [];
}

export function cloneNotificationAlerts(
  alerts: NotificationAlertSetting[]
): NotificationAlertSetting[] {
  return alerts.map((alert) => ({ ...alert }));
}
