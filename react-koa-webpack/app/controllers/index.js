import User from '../models/User';

const app = {
    async index(ctx, next){
      const user = new User('Abot');
      // ctx.state.user = user
      await ctx.render('index.pug', {welcome: user.greeting()})
      // ctx.body = user.greeting();
    },
    getData(ctx, next){
      ctx.body = "api"
    },
    postData(){

    },
}

export default app;
