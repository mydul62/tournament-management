export class NotificationService {
  static async getUserNotifications(userId: string) {
    return [
      {
        id: "notif-1",
        userId,
        title: "Match Starting Soon",
        message: "Thunder Strikers FC vs Apex Predators kicks off in 30 minutes.",
        read: false,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
