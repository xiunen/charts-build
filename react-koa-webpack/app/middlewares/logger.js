const middleware = () => async (ctx, next) => {
  const req = ctx.request;
  console.log(req.url)
  return await next();
}


export default middleware;
