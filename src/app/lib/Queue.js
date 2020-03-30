import Bull from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

class Queue {
  constructor() {
    this.jobs = jobs;
    this.init();
  }

  init() {
    this.queues = Object.values(this.jobs).map(({ key, handle, options }) => ({
      bull: new Bull(key, redisConfig),
      name: key,
      handle,
      options,
    }));
  }

  add(name, data) {
    const queue = this.queues.find(q => q.name === name);

    return queue.bull.add(data, queue.options);
  }

  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data);
        console.log(err);
      });
    });
  }
}

export default new Queue();
