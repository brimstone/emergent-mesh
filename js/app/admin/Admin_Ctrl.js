window.app.controller('Admin_Ctrl', ['$scope', '$resource', 'DB_Service', function ($scope, $resource, DB) {
	"use strict";
	var s = DB.get('status').next(function() {
		$scope.nodes = {};
		$scope.nodekeys = [];
		for (var key in s._keys) {
			key = s._keys[key];
			$scope.nodes[key] = s[key];
			$scope.nodes[key].name = key;
			// mathy things
			$scope.nodes[key].load.percent=$scope.nodes[key].load.text / 2;
			$scope.nodes[key].memory.text=($scope.nodes[key].memory.total - $scope.nodes[key].memory.used) + "KB";
			$scope.nodes[key].flash.text=($scope.nodes[key].flash.total - $scope.nodes[key].flash.used) + "KB";
			// start our flattened clients hash, indexed by mac address
			var clients = {};
			var mac;
			//loop through arp entries and flip them around
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
			for(mac in s[key].arp) {
				if (!clients[mac]) { continue; }
				clients[mac].ip = s[key].arp[mac].ip;
			}
			$scope.nodes[key].clients=clients;
			delete $scope.nodes[key].arp;
			delete $scope.nodes[key].captive;
			delete $scope.nodes[key].station;
		}
		console.log($scope.nodes);
	});
}]);
