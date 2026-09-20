export interface IAuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
}
