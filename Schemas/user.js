const
	mongoose  =  require('mongoose'),
  bcrypt    =  require('bcrypt'),
  Schema    =  mongoose.Schema

const SALT_SAFE = 10

let userSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/static/images/default.jpg'
  },
  username: String,
  name: String,
  job: String,
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area'
  },
  gender: {
    type: Number,
    default: 2
  },
  email: String,
  phone: Number,
  summary: {
    type: String,
    default: '该用户很懒, 没有留下简介...'
  },
  lastmodified: String,
  shopcar: [{
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  }],
  ownedvedios: [{
    type: Schema.Types.ObjectId,
    ref: 'Vedio'
  }],
  role: {
    type: Number,
    default: 0
  },
  meta: {
		createdAt: {
			type: Date,
			default: new Date()
		},
		updateAt: {
			type: Date,
			default: new Date()
		}
	}
})

userSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.updateAt = this.meta.createdAt = new Date()
	} else {
		this.meta.updateAt = new Date()
	}

  bcrypt.genSalt(SALT_SAFE, (err, salt) => {
    if (err) 
      return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) 
        return next(err)

      this.password = hash
      
      next()
    })
  })

	
})

userSchema.methods = {}
userSchema.statics = {}

module.exports = userSchema
