var url = "mongodb://<USER>:<PASSWORD>@cluster0-shard-00-00-bnobi.mongodb.net:27017,cluster0-shard-00-01-bnobi.mongodb.net:27017,cluster0-shard-00-02-bnobi.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

var stringify = function(){
	let obj = this
	let surl = obj.url
	let params = ['USER', 'PASSWORD', 'DATABASE']

	params.forEach(function(param){
		var objParam = obj[param.toLowerCase()]
		if(objParam) surl = surl.replace('<'+param+'>', objParam)
	})
	return surl
}

module.exports=	{
					url: url,
					stringify: stringify
				} 