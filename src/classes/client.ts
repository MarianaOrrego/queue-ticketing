export enum ClientType {
  PRIORITY = 1,
  BUSINESS = 2,
  COMMON = 3,
}

export class Client {
  static consecutivePriority: number = 1;
  static consecutiveBusiness: number = 1;
  static consecutiveCommon: number = 1;
  clientID: string;
  init_time: number = Date.now(); // Date().getTime()
  end_time: number = Date.now();
  duration: string = "xx:xx:xx";

  constructor(public clientType: ClientType) {
    if (clientType === ClientType.PRIORITY) {
      this.clientID = `P${Client.consecutivePriority
        .toString()
        .padStart(2, "0")}`;
      Client.consecutivePriority++;
    } else if (clientType === ClientType.BUSINESS) {
      this.clientID = `B${Client.consecutiveBusiness
        .toString()
        .padStart(2, "0")}`;
      Client.consecutiveBusiness++;
    } else if (clientType === ClientType.COMMON) {
      this.clientID = `C${Client.consecutiveCommon
        .toString()
        .padStart(2, "0")}`;
      Client.consecutiveCommon++;
    } else {
      throw new Error("Invalid client type");
    }
  }

  getDuration(): number {
    let init_time = new Date(this.init_time);
    let end_time = new Date(this.end_time);
    let duration = new Date();
    duration.setHours(end_time.getHours() - init_time.getHours());
    duration.setMinutes(end_time.getMinutes() - init_time.getMinutes());
    duration.setSeconds(end_time.getSeconds() - init_time.getSeconds());
    this.duration = duration.toLocaleTimeString(undefined, { hour12: false });
    return duration.getTime();
  }
}

export class ClientManager {
  queuePriority: Array<Client> = [];
  queueBusiness: Array<Client> = [];
  queueCommon: Array<Client> = [];
  queueGlobal: Array<Client> = [];

  nextToAttendIndex: number = 0;

  addClient(client: Client): void {
    switch (client.clientType) {
      case ClientType.PRIORITY:
        this.queuePriority.push(client);
        break;
      case ClientType.BUSINESS:
        this.queueBusiness.push(client);
        break;
      case ClientType.COMMON:
        this.queueCommon.push(client);
        break;
      default:
        throw new Error("Invalid client type");
    }
    this.update();
  }

  update(): void {
    const cp: Client[] = this.queuePriority.slice();

    const cb: Client[][] = [];
    for (let i = 0; i < this.queueBusiness.length; i += 3) {
      cb.push(this.queueBusiness.slice(i, i + 3));
    }

    const cc: Client[][] = [];
    for (let i = 0; i < this.queueCommon.length; i += 2) {
      cc.push(this.queueCommon.slice(i, i + 2));
    }

    for (let i = 0; i < Math.max(cb.length, cc.length); i++) {
      if (i < cb.length) {
        cp.push(...cb[i]);
      }
      if (i < cc.length) {
        cp.push(...cc[i]);
      }
    }
    this.queueGlobal = cp;
  }

  getNextClient(): Client | null {
    if (this.queueGlobal.length > 0 && this.nextToAttendIndex < this.queueGlobal.length) {
      return this.queueGlobal[this.nextToAttendIndex++];
    }
    return null;
  }

}
