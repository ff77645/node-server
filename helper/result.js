
class Result {
  constructor(success,code,msg){
    this.success = success
    this.code = code
    this.msg = msg
  }
}

export class Ok extends Result {
  constructor(data){
    super(true,200,'Ok')
    Object.assign(this,data)
  }
  static msg(msg,code=200){
    return new Ok({msg,code})
  }
}

export class Err extends Result {
  constructor(data){
    super(false,400,'Error')
    Object.assign(this,data)
  }
  static msg(msg,code=400){
    return new Err({msg,code})
  }
}