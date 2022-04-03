export async function handleRequest(request: Request): Promise<Response> {
  return new Response(`request method: 现在几点： ${new Date()} ${request.method}`)
}
