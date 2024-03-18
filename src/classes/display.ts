export class DisplayManager {
  queue: any[] = [];

  append(data: any): void {
    this.queue.push(data);
  }

  remove(data: any): void {
    const index = this.queue.findIndex(
      (d) => d[0] === data[0] && d[1] === data[1],
    );
    if (index !== -1) {
      this.queue.splice(index, 1);
    }
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.queue.length) {
          const value = this.queue[index];
          index++;
          return { value, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}
