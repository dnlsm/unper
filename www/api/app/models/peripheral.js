const mongoose 	= require('mongoose')
const Schema 	= mongoose.Schema

var peripheralSchema = Schema({
	perName	: 	{	type : String,
					required : true },
	port	:	{	type : String,
					required : true },

	behavior:	{	type : String,
					enum : ["INPUT","OUTPUT"],
					required : true },

	perClass:	{	type : String,
					enum : ["LAMP", "SWITCH", "MIC", "LDR", "MOTOR", "OTHER"]},

	triggers:	[
					{	type : Schema.ObjectId,
						ref  : 'Trigger'
					}
				],

	schedules:	[
					{	type : Schema.ObjectId,
						ref  : 'Schedule'
					}
				]
})

module.exports = mongoose.model('Peripheral', peripheralSchema)
