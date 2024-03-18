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
  init_time: Date = new Date();
  end_time: Date = new Date();
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
    let duration = new Date()
    duration.setHours(this.end_time.getHours() - this.init_time.getHours())
    duration.setMinutes(this.end_time.getMinutes() - this.init_time.getMinutes())
    duration.setSeconds(this.end_time.getSeconds() - this.init_time.getSeconds())
    this.duration = duration.toLocaleTimeString(undefined, { hour12: false })
    return duration.getTime()
  }
}

export class QueueManager {
  queuePriority: Array<Client> = [];
  queueBusiness: Array<Client> = [];
  queueCommon: Array<Client> = [];
  queueGlobal: Array<Client> = [];

  addClient(client: Client): void {
    switch (client.clientType) {
      case ClientType.PRIORITY:
        this.queuePriority.push(client);
        console.log("PRIORITY", this.queuePriority);
        break;
      case ClientType.BUSINESS:
        this.queueBusiness.push(client);
        console.log("BUSINESS", this.queueBusiness);
        break;
      case ClientType.COMMON:
        this.queueCommon.push(client);
        console.log("COMMON", this.queueCommon);
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

  private _deleteClient(client: Client): void {
    const queue = this.getQueueByType(client.clientType);
    const index = queue.findIndex((c) => c === client);
    if (index !== -1) {
      queue.splice(index, 1);
    }
    this.update();
  }

  getNextClient(): Client | null {
    const nextClient = this.queueGlobal.shift() || null;
    if (nextClient) {
      this._deleteClient(nextClient);
    }
    return nextClient;
  }

  private getQueueByType(clientType: ClientType): Client[] {
    switch (clientType) {
      case ClientType.PRIORITY:
        return this.queuePriority;
      case ClientType.BUSINESS:
        return this.queueBusiness;
      case ClientType.COMMON:
        return this.queueCommon;
      default:
        throw new Error("Invalid client type");
    }
  }
}
