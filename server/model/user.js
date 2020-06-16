const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  //author: ObjectId,
  username: { 
      type:String,
      requied:true,
      max:[60,'ユーザー名は最大60文字までです'] },
  email: { 
      type:String,
      requied:true,
      lowercase: true,
      unique: true,
      max:[60,'Eメールは最大60文字までです'] },
  password: { 
    type:String, requied:true,
    min:[6,'パスワードは6文字以上で入力してください'],
    max:[30,'パスワードは最大30文字までです'] },

})

//関数を定義
UserSchema.methods.hasSamePassword = function(inputPassword) {
    const user = this
    return bcrypt.compareSync(inputPassword, user.password)
}

//saveの前に実行される
UserSchema.pre('save', function(next) {
    const user = this
    const saltRounds = 10

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash
            // nextを実行するとsave処理が実行される
            next()
        });
    });    
})

module.exports = mongoose.model('User',UserSchema)