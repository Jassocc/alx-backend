// job creation
import kue from 'kue';

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData)
      .on('enqueue', () => {
        console.log(`Notification job created: ${job.id}`);
      })
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on('failed', (errorMsg) => {
        console.log(`Notification job ${job.id} failed: ${errorMsg}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });
      job.save((err) => {
        if (err) {
          console.error(`Error creating job: ${err}`);
	}
      });
  });
}
export default createPushNotificationsJobs;
