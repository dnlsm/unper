const mongoose 	= require('mongoose')
const Schema 	= mongoose.Schema

var scheduleSchema = Schema({

	target	:	{	type: Schema.ObjectId,
					ref: 'Peripheral',
					required: true },

	schType	:	{	type : String,
					enum : ["PERIODIC_TOGGLE", "PERIODIC_PULSE", "DATADE_TASK"],
					required : true },

	PERIODIC_TOGGLE : {
				interval : { type     : Number,
							 required : true }
	},

	PERIODIC_PULSE  : {
				upTime   : { type     : Number,
							 required : true },
				downTime : { type     : Number,
							 required : true }
	},

	DATADE_TASK  : {
				date	 : { type     : Date},
				time	 : { type     : Date},
				change	 : { type     : String,
							 enum     : ["SET","CLEAR","TOGGLE"]}
	}
})

module.exports = mongoose.model('Schedule', scheduleSchema)
