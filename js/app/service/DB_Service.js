window.app.factory("DB_Service", ['$rootScope', '$resource', '$timeout', function($rootScope, $resource, $timeout) {
	"use strict";
	var server = $resource('/db/:db/:id', {}, {
		get: {method: 'GET'},
		get_all: {method: 'GET', params: {id: ''}}
	});

	var DBs = {cbs: {}};

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
			for (var cb in DBs.cbs[db]) {
				DBs.cbs[db][cb]();
			}
		});
	};

	var update = function() {
		for(var db in DBs) {
			if(db === "cbs") {
				continue;
			}
			update_db(db, server.get_all({db: db}));
		}
	};

	var update_later = function() {
		update();
		$timeout(update_later, 30000);
	};

	$timeout(update_later, 30000);

	return {
		get: function(db_name) {
			if (!DBs[db_name]) {
				// set up a new db structure
				DBs[db_name] = {};
				// setup an array for callbacks
				DBs.cbs[db_name] = [];
				// This function cannot be named then. I don't know why.
				DBs[db_name].next = function(cb) {
					// adding a callback
					DBs.cbs[db_name].push(cb);
					return DBs[db_name];
				};
			}
			update();
			return DBs[db_name];
		}
	};
}]);
