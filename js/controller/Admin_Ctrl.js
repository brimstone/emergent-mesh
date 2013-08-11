window.app.controller('Admin_Ctrl', ['$scope', '$resource', function ($scope, $resource) {
	"use strict";
	$scope.db = $resource('/db/:action');
	$scope.update = function () {
		var s = $scope.db.get({action: "status"}, function() {
			console.log("Got this far", s);
			$scope.nodes = {};
			$scope.nodekeys = [];
			for (var key in s) {
				if (key.substr(0,1) === '$') {
					continue;
				}
				$scope.nodekeys.push(key);
				$scope.nodes[key] = s[key];
				// start our flattened clients hash, indexed by mac address
				var clients = {};
				var mac;
				//loop through arp entries and flip them around
				for(mac in s[key].arp) {
					if (!clients[mac]) { clients[mac] = {}; }
					clients[mac].ip = s[key].arp[mac].ip;
				}
				for(mac in s[key].captive) {
					if (!clients[mac]) { clients[mac] = {}; }
					clients[mac].ip = s[key].captive[mac].ip;
					clients[mac].time = s[key].captive[mac].time;
				}
				for(mac in s[key].station) {
					if (!clients[mac]) { clients[mac] = {}; }
					clients[mac].signal = s[key].station[mac].signal;
					clients[mac].bitrate = s[key].station[mac].bitrate;
				}
				for(mac in clients) {
					clients[mac].mac = mac;
					if (!clients[mac].signal) { clients[mac].signal = 0; }
					if (!clients[mac].bitrate) { clients[mac].bitrate = 0; }
					if (!clients[mac].time) { clients[mac].time = 0; }
				}
				$scope.nodes[key].clients=clients;
				delete $scope.nodes[key].arp;
				delete $scope.nodes[key].captive;
				delete $scope.nodes[key].station;
			}
			console.log($scope.nodes);
		});
	};
	$scope.update();
	setInterval($scope.update, 5000);
}]);
