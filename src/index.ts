/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    // @ts-ignore
    const url = env.TIMETABLE_URL;
    // @ts-ignore
    const startDate = env.DATE_FROM;
    // @ts-ignore
    const endDate = env.DATE_TO;

    const urlWithDates = `${url}&start=${startDate}&end=${endDate}`;

    const fetchResponse = await fetch(urlWithDates);

    const data = await fetchResponse.json();

    const json = JSON.stringify(data, null, 2);

    const response = new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });

    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://waves-vienna-timetable.pages.dev"
    );
  },
};
