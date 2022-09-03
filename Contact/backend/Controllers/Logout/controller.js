function logout(req,resp)
{
    resp.cookie("mytoken",'none',{
        expires: new Date(Date.now()+ 0*1000),
    })
    resp.status(201).send("User Logged out Successfully");
}
module.exports= logout