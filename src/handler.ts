function createResponse(data:string){
  return new Response(data, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods' :'GET, POST, OPTIONS',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Headers':'X-Requested-With,content-type,Authorization',
    },
  });
}
export async function handleRequest(request:Request):Promise<Response>{
  const {pathname,search} = new URL(request.url)
  if (pathname.startsWith('/api/KV-set-data')){
    try {
      const data = search.replace('?','').split('&');
      const promiseList = data.map(async (pair)=>{
        const [key,value] = pair.split('=')
        return await REDIS.put(key,value)
      })
      await Promise.all(promiseList)
      return createResponse('设置成功')
    }catch (e){
      return createResponse('设置失败')
    }
  }
  if (pathname.startsWith('/api/KV-get-data')){
    return createResponse(JSON.stringify(await REDIS.get('name')))
  }
  if (pathname.startsWith('/api')){
    return createResponse(JSON.stringify({pathname}))
  }
  return new Response(`request method: ${request.method}`)
}
