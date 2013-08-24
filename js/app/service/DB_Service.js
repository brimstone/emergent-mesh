window.app.factory("DB_Service", ['$rootScope', '$resource', '$timeout', function($rootScope, $resource, $timeout) {
	"use strict";
	var server = $resource('/db/:db/:id', {}, {
		get: {method: 'GET'},
		get_all: {method: 'GET', params: {id: ''}}
	});

	var DBs = {};

	var update_db = function(db, database) {
		database.$promise.then(function() {
			DBs[db]._keys = [];
			// TODO need to flush out the keys
			for (var key in database) {
				if (key.substr(0,1) !== '$' && key.substr(0,1) !== '_') {
					DBs[db]._keys.push(key.replace(".json", ""));
					DBs[db][key.replace(".json", "")] = database[key];
				}
			}
		});
	};

	var update = function() {
		console.log("I'm running");
		for(var db in DBs) {
			update_db(db, server.get_all({db: db}));
		}
		$timeout(update, 10000);
	};
	// Figure out why this isn't called immedately at startup
	update();

	return {
		get: function(db_name) {
			if (!DBs[db_name]) {
				DBs[db_name] = {};
			}
			return DBs[db_name];
		}
	};
}]);
