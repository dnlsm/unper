
const lirc = require('lirc_node')
lirc.init()


var triggers = [];

lirc.addListener(function (data){
	data.repeat = parseInt(data.repeat, 16)
	triggers.forEach(function(element){
		if (element.key != data.key)
			return
		if (element.remote)
			if (element.remote != data.remote)
				return
		if (element.repeat != undefined)
			if (element.repeat != data.repeat)
				return
		element.callback(data)
	})
})

console.log("criando lirc")


function addTrigger(key, remote, repeat,func,callback){
	var element = {
					key: key,
					remote: remote,
					repeat: repeat,
					callback: func
				}
	var index = triggers.push (element)
	if (callback) callback(index, element)
}


function removeTrigger(index){
	triggers[index] = {}
}

module.exports = {
	triggers : triggers,
	add : addTrigger,
	rem : removeTrigger
}
