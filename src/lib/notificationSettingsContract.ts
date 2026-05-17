import { z } from "zod";

export const NOTIFICATION_ALERT_TYPES = ["delay", "order", "offline", "fuel"] as const;

export const NotificationSettingsSchema = z.object({
  alerts: z.array(z.object({
    type: z.enum(NOTIFICATION_ALERT_TYPES),
    label: z.string().trim().min(1).max(80),
    sub: z.string().trim().min(1).max(160),
    sms: z.boolean(),
    push: z.boolean(),
    email: z.boolean(),
  }).strict()).max(20),
}).strict();
