import User from '../models/User';

const app = {
    index(ctx, next){
      const user = new User('Abot');
      ctx.body = user.greeting();
    },
    getData(ctx, next){
      ctx.body = "api"
    },
    postData(){

    },
}

export default app;
