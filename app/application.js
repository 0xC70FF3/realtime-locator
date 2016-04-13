var	queue = []
var	pqueue = []
var current

module.exports = {
	bind: function(io) {
		io.on('connection', function(socket){
			socket.on('features', function(features, callback){
				if (queue.length <= 1000) {
					queue.push(features)
					callback("OK")
				} else {
					callback("NOK")
				}
			})
		})
	},
	routes: function(app) {
		app.get('/features/next', function(req, res) {
			features = queue.shift()
			if (typeof features != 'undefined') {
				if (typeof current != 'undefined') {
					pqueue.push(current)
					if (pqueue.length > 1000) { // limit previous queue between 500 and 1000 steps.
						pqueue = pqueue.slice(500)
					}
				}
				current = features
				res.send(current)
			} else {
				res.send('{"features": [], "type": "FeatureCollection"}')
			}
		}),


		app.get('/features/previous', function(req, res) {
			features = pqueue.pop()
			if (typeof features != 'undefined') {
				if (typeof current != 'undefined') {
					queue.unshift(current)
				}
				current = features
				res.send(current)
			} else {
				res.send('{"features": [], "type": "FeatureCollection"}')
			}
		}),

		app.get('/features/clear', function(req, res) {
			queue = []
			pqueue = []
			delete current
			res.send('{"features": [], "type": "FeatureCollection"}')
		})
	}
}

