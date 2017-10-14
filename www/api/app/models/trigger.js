const mongoose = require('mongoose')
const Schema 	= mongoose.Schema

var triggerSchema = Schema({
	trigType:	{	type: String,
					required: true,
					enum: ['SET', 'CLEAR', 'TOGGLE']},
	source	:	{	type: Schema.ObjectId,
					ref: 'Peripheral',
					required: true },
	target	:	{	type: Schema.ObjectId,
					ref: 'Peripheral',
					required: true },

	delay	:	{	type: Number },

	onRising:	{	type: Boolean }
})


module.exports = mongoose.model('Trigger', triggerSchema)
