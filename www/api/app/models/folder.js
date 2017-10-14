const mongoose 	= require('mongoose')
const Schema 	= mongoose.Schema

var folderSchema = Schema({

	folderName 	: {	type: String,
					required: true,
					unique: true},

	peripherals : 	[
						{	type: Schema.Types.ObjectId, 
							ref: 'Peripheral' }
					],

	folderIcon : {	type: String }
})


module.exports = mongoose.model('folder', folderSchema)
