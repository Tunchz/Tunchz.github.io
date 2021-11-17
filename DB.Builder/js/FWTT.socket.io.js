// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ freeboard.io-node.js                                               │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2014 Hugo Sequeira (https://github.com/hugocore)       │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Freeboard datasource plugin for node.js and socket.io.             │ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function() {
	
	var socketIODatasource = function(settings, updateCallback) {

		var self = this,
			currentSettings = settings,
			url,
			socket,
			newMessageCallback;

		function onNewMessageHandler(message) {
			// var objdata = JSON.parse(message);
			// if (typeof objdata == "object") {
			// 	updateCallback(objdata);
			// } else {
			// 	updateCallback(message);
			// }

			updateCallback(message);
		}

		function joinRoom(roomName, roomEvent) {
			// Sends request to join the new room
			// (handle event on server-side)
			self.socket.emit(roomEvent, roomName);
			console.info("Joining room '%s' with event '%s'", roomName, roomEvent);
		}

		function discardSocket() {
			// Disconnect datasource websocket
			if (self.socket) {
				self.socket.disconnect();
			}
		}
		
		function connectToServer(url, rooms) {
			// Establish connection with server
			self.url = url;
			// io('http://10.10.10.18:4567',{query:{url:'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'}});
			self.socket = io.connect(self.url,{'forceNew':true});

			// Join the rooms
			self.socket.on('connect', function() {
				console.info("Connecting to Node.js at: %s", self.url);
				// console.info("+++++++++++++++++++++++ connected");
			});
			
			// Join the rooms
			_.each(rooms, function(roomConfig) {
				var roomName = roomConfig.roomName;
				var roomEvent = roomConfig.roomEvent;

				if (!_.isUndefined(roomName) && !_.isUndefined(roomEvent)) {
					joinRoom(roomName, roomEvent);
				}

			});
			
			self.socket.on('connect_error', function(object) {
				console.error("It was not possible to connect to Node.js at: %s", self.url);
			});
			
			self.socket.on('reconnect_error', function(object) {
				console.error("Still was not possible to re-connect to Node.js at: %s", self.url);
			});
			
			self.socket.on('reconnect_failed', function(object) {
				console.error("Re-connection to Node.js failed at: %s", self.url);
				discardSocket();
			});
		}

		function initializeScript() {
		    // Convert script string to function(response) { ...js script string...}
            if (!_.isUndefined(currentSettings.initial_script)) {
                _.isArray(currentSettings.initial_script) && (currentSettings.initial_script = "[" + currentSettings.initial_script.join(",") + "]"), (currentSettings.initial_script.match(/;/g) || []).length <= 1 && -1 == currentSettings.initial_script.indexOf("return") && (currentSettings.initial_script = "return " + currentSettings.initial_script);
                var f;
                try {
                    f = new Function([/*"response","option"*/], currentSettings.initial_script)
                } catch (g) {
                    var h = currentSettings.initial_script.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
                    f = new Function([/*"response","option"*/], 'return "' + h + '";')
                }

                // console.log(">>>> return result : ", f(response));
            }
           	// execute function of initialize script
            (f)&&(f());
		}

		function initializeDataSource() {
			// Reset connection to server
			discardSocket();
			if (!currentSettings.disabled) {

				initializeScript();
				connectToServer(currentSettings.url, currentSettings.rooms);

				// Subscribe to the events
				var newEventName = currentSettings.eventName;
				self.newMessageCallback = onNewMessageHandler;
				_.each(currentSettings.events, function(eventConfig) {
					var event = eventConfig.eventName;
					console.info("Subscribing to event: %s", event);
					self.socket.on(event, function(message) {
						// console.info("------message : ",message);
						self.newMessageCallback(message);
					});
				});
			}
		}

		this.updateNow = function() {
			// Just seat back, relax and wait for incoming events
			return;
		};

		this.onDispose = function() {
			// Stop responding to messages
			self.newMessageCallback = function(message) {
				return;
			};
			discardSocket();
		};

		this.onSettingsChanged = function(newSettings) {
			currentSettings = newSettings;
			initializeDataSource();
		};
		
		initializeDataSource();
	};

	freeboard
			.loadDatasourcePlugin({
				type_name : "socket.io",
				display_name : "Socket.IO",
				description : "A real-time stream datasource from node.js servers using socket.io.",
				// external_scripts : ["https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js"], 
				external_scripts : [ "plugins/thirdparty/socket.io.v420.js" ],
				// external_scripts : [ "plugins/thirdparty/socket.io-1.0.6.js" ],//[ "https://cdn.socket.io/socket.io-1.0.6.js" ],
				settings : [
						{
							name : "disabled",
							display_name : "Disabled Connection",
							description : "diable socket.io connection",
							type : "boolean",
							default_value: !1,
						},
			         	{
				            name: "initial_script",
				            display_name: "(Optional) Initial Script",
				            type: "jsscript",
				            description: "initial script to execute before actual socket connection to <<Server URL>>."
			            },
						{
							name : "url",
							display_name : "Server URL",
							description : "(Optional) In case you are using custom namespaces, add the name of the namespace (e.g. chat) at the end of your URL.<br>For example: http://localhost/chat",
							type : "text"
						},
						{
							name : "events",
							display_name : "Events",
							description : "The name of the events you want this datasource to subscribe to.",
							type : "array",
							settings : [{
								name : "eventName",
								display_name : "Event",
								type : "text"
							}]
						},
						{
							name : "rooms",
							display_name : "(Optional) Rooms",
							description : "In case you are using rooms, specify the name of the rooms you want to join. Otherwise, leave this empty.",
							type : "array",
							settings : [ {
								name : "roomName",
								display_name : "Room name",
								type : "text"
							}, {
								name : "roomEvent",
								display_name : "Name of the event to join the room",
								type : "text"
							} ]
						}],
				newInstance : function(settings, newInstanceCallback,
						updateCallback) {
					newInstanceCallback(new socketIODatasource(settings,
							updateCallback));
				}
			});
}());