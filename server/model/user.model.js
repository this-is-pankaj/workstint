'use strict';

const mongoose = require('mongoose');
const	Schema = mongoose.Schema;

const NameSchema = require('./components/name.model');

let UserSchema = new Schema({
	"name": NameSchema,
	"email": {
		type: String,
		required: true,
		unique: true,
	},
	"phone": {
		type: String,
		required: true,
		validate: {
			validator: (v) => {
				return /\d{10}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		unique: true,
	},
	"password": {
		type: String,
		required: true,
	},
	"profilePic": {
		type: String,
	},
	"createdAt": {
		type: Date,
		default: Date.now,
	},
	"updatedAt": {
		type: Date,
	},
	"gstin": {
		type: String,
	},
	"tradeName": {
		type: String,
	},
	"addresses": [
		{
			"nick": {
				type: String,
			},
			"line1": {
				type: String,
			},
			"line2": {
				type: String,
			},
			"line3": {
				type: String,
			},
			"city": {
				type: String,
			},
			"state": {
				type: String,
			},
			"pinCode": {
				type: String,
			},
			"country": {
				type: String,
				default: 'India',
			}
		}
	],	
  "credentials": {
    "ewb": {},
  },
	"subscription": {
		"type": {
			type: String,
			enum: ["free", "subscribed"],
			default: "free",
		},
		"startDate": {
			type: Date,
			default: Date.now,
		},
		"endDate": {
			type: Date,
		}
	},
	"isActive": {
		type: Boolean,
		default: true,
	},
});

UserSchema.methods.authenticate = function (pwd) {
	let user = this;
	return new Promise(function (resolve, reject) {
		if (pwd === user.password) {
			resolve(true);
		}
		reject(false);
	});
}

let UsersModel = mongoose.model('users', UserSchema);

// Add the superAdmin By default
// let superAdminUser = new UsersModel({
//     name: {
//         firstName: 'Pankaj',
//         middleName: '',
//         lastName: 'Gupta'
//     },
//     password: 'mybestfrndpynk',
//     email: 'pankajkoolguy@gmail.com',
//     phone: '8013545945',
//     role: 'superAdmin',
//     createdBy: 'lotogleam'
// });

// superAdminUser.save()
//     .then((doc) => {
//         console.log('Super Admin user created successfully');
//     })
//     .catch((err) => {
//         console.log('Unable to create superAdmin ');
//     })

module.exports = UsersModel;