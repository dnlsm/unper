const header = [
	"console.log('isRising = ', isRising)",
	"var rise = $rise",
	"console.log('rise = ', rise)",
	"if (rise !== undefined)",
		"if (isRising !== rise)",
			"return",
	"console.log('TRIGGER')",
	"var interface = require('$interfaceLib')",
	"var Target = interface.search('$targetName')",
]
const setFunc = [	"function trigger () {Target.write(1)}"]
const clrFunc = [	"function trigger () {Target.write(0)}"]
const tggFunc = [	"function trigger () {",
			"console.log('Target Value',Target.value)",
			"console.log('Target Current Value %i',Target.value)",
			"Target.write((Target.value===1)?(0):(1))}"
			]

const footer = [
	"setTimeout(trigger, $delay)"
]

function interpolate (interfacelib, targetName, behavior, delay, rising){
	var func = ""
	switch (behavior){
		case "SET":
			func = header.concat(setFunc).concat(footer)
			break

		case "CLEAR":
			func = header.concat(clrFunc).concat(footer)
			break

		case "TOGGLE":
			func = header.concat(tggFunc).concat(footer)
			break
		default:
	}

	func = 
	func.join('\n')
	.replace('$interfaceLib', '../interfaces/' + interfacelib)
	.replace('$targetName', targetName)
	.replace('$delay', delay)
	.replace('$rise', rising)
	return func
}

module.exports = interpolate
