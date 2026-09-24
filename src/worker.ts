export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Forward all incoming requests to Cloudflare Static Assets (dist)
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }
    return new Response('Not Found', { status: 404 });
  },
};
