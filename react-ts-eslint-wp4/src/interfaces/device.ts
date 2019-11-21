//增加用于设置标题的hook
export interface Device {
  alertPushEnabled: number;
  assetId: string;
  background: string;
  batteryStatus: number;
  brand: string;
  clientTag: string;
  department: string;
  deviceType: string;
  fixedAssetNo: string;
  healthScore: number;
  id: number;
  isActive: number;
  isAttention: number;
  location: string;
  locationDescription: string;
  manager: string;
  model: string;
  monitoringTargetId: number;
  monitoringTargetType: string;
  name: string;
  photoUrl: string;
  serialNo: string;
  status: string;
  xcoordinate: number;
  ycoordinate: number;
}
