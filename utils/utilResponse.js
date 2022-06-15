let utilRequest={
	//成功
	succeed(code="",msg="",data=""){
		return {
			data,
			msg,
			code
		}
	},
	
	//失败
	fail(){

	}
}

module.exports=utilRequest