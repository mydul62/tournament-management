export class AuditService {
  static async getAuditLogs() {
    return [
      {
        id: "audit-1",
        userId: "u-admin",
        action: "CREATE_TOURNAMENT",
        entity: "Tournament",
        entityId: "tour-1",
        timestamp: new Date().toISOString(),
      },
    ];
  }
}
