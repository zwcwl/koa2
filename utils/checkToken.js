const jwt=require("jsonwebtoken");

const checkToken=async (ctx,next)=>{
    let url = ctx.url.split('?')[0]
    console.log(url);

    if(url === "/login" || url === "/"){
        await next()
    }else{
        let Token=ctx.request.header.authorization

        console.log(Token);
        try {
            let aa=jwt.verify(Token,"test")
            console.log(aa);
            await next()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=checkToken