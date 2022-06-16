let response={
	//成功
	succeed(code="",msg="",data={}){
		return {
			data,
			msg,
			code
		}
	},
	
	//失败
	fail(code="",msg=""){
		return {
			code,
			msg
		}
	}
}

module.exports=response