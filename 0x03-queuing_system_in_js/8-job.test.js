// task 10 test case
import { expect } from 'chai';
import kue from 'kue';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job';

describe('createPushNotificationsJobs', () => {
  let queue;
  beforeEach(() => {
    queue = kue.createQueue();
    kue.jobrangeByType('push_notification_code_3', 'active', 0, 100, 'asc', (err, jobs) => {
      jobs.forEach((job) => {
        job.remove(() => {});
      });
    });
    queue.testMode.enter();
  });
  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });
  it('display an error if not an array', () => {
    expect(() => createPushNotificationsJobs(null, queue)).to.throw('Jobs is not an array');
  });
  it('create two jobs', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'this is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'this is the code 4562 to verify your account' },
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs.length).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs.length).to.equal(jobs[0]);
    expect(queue.testMode.jobs.length).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs.length).to.equal(jobs[1]);
  });
  it('log job events', (done) => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'this is the code 1234 to verify your account' },
    ];
    const consoleSpy = sinon.spy(console, 'log');
    createPushNotificationsJobs(jobs, queue);
    queue.testMode.jobs[0].emit('enqueue');
    queue.testMode.jobs[0].emit('complete');
    queue.testMode.jobs[0].emit('failed', new Error('Some Error'));
    queue.testMode.jobs[0].emit('progress', 50);
    expect(consoleSpt.calledWith(`Notification job created: ${queue.testMode.jobs[0].id}`)).to.be.true;
    expect(consoleSpt.calledWith(`Notification job created: ${queue.testMode.jobs[0].id} completed`)).to.be.true;
    expect(consoleSpt.calledWith(`Notification job created: ${queue.testMode.jobs[0].id} failed: Some error`)).to.be.true;
    expect(consoleSpt.calledWith(`Notification job created: ${queue.testMode.jobs[0].id} 50% complete`)).to.be.true;
    consoleSpy.restore();
    done();
  });
});
