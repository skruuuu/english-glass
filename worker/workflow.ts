import { WorkflowEntrypoint, type WorkflowEvent, type WorkflowStep } from 'cloudflare:workers';
export class FeedbackWorkflow extends WorkflowEntrypoint<{DB:D1Database;MEDIA:R2Bucket},{attemptId:string;feedback:string}> {
 async run(event:WorkflowEvent<{attemptId:string;feedback:string}>,step:WorkflowStep){
  await step.do('archive feedback',async()=>{await this.env.MEDIA.put(`feedback/${event.payload.attemptId}.json`,JSON.stringify({feedback:event.payload.feedback}),{httpMetadata:{contentType:'application/json'}})});
 }
}
