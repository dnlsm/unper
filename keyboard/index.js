exports.onReadable = function(callback){
	process.stdin.on('readable', function(){
		var dataChunk = process.stdin.read();
		if(dataChunk) {
			callback(dataChunk.toString().replace(/\n/,'').replace(/\r/,''))
		}
	})
}