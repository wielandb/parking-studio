


const scriptsInEvents = {

	async ["Event-Blatt1_Event141_Act1"](runtime, localVars)
	{
		    var strings = localVars.inpText.split(localVars.backConnect);
			console.log(localVars.inpText);
			var a = localVars.a;
			var b = localVars.b;
			var c = localVars.c;
			var newResult = [];
			var doNotAdd = [];
			
			
			// go through all the strings
		    for (var i = 0; i < strings.length; i++) {
		        var string = strings[i];
				var addLater = true;
		        // if the string contains a, check if there is a string that contains b and is the same if a and b are removed
		        if (string.indexOf(a) != -1) {
		            var found = false;
		            for (var j = 0; j < strings.length; j++) {
		                if (j != i) {
		                    var string2 = strings[j];
							console.log("Checking " + string + " and " + string2);
		                    if (string2.indexOf(b) != -1) {
		                        var string3 = string.replace(a, "");
		                        var string4 = string2.replace(b, "");
		                        if (string3 == string4) {
		                            found = true;
		                            break;
		                        }
		                    }
		                }
		            }
		            if (found) {
					console.log(string);
					console.log(strings);
					console.log(i);
					console.log(j);
		                // if there is, replace a with c
		                string = string.replace(a, c);
		                // and delete the string that contains b
		                // strings.splice(j, 1);
		                // put the string back in the list (replace the string that contained b)
		                //strings[j] = string;
						console.log("Adding (changed) str " + string);
						newResult.push(string);
						doNotAdd.push(strings[j]);
						doNotAdd.push(string);
						
		            } else {
						console.log("Adding str " + string);
						newResult.push(string);
						addLater = false;
					}
		        }
				
				if (addLater) {
					if (!doNotAdd.includes(string)) {
						newResult.push(string);
						}
				}
		        
		    }
		    // put strings back into one string, connected with newlines
		    var result = "";
		    for (var i = 0; i < newResult.length; i++) {
		        result += newResult[i] + localVars.backConnect;
		    }
			
		    console.log(newResult);
			console.log(result);
		
		    runtime.setReturnValue(result);
	},

	async ["Event-Blatt1_Event143_Act1"](runtime, localVars)
	{
		// Replace this with the URL of the OpenStreetMap way you want to fetch
		var wayUrl = 'https://www.openstreetmap.org/api/0.6/way/1032606042';
		
		// Make an HTTP request to fetch the XML data for the way
		fetch(wayUrl)
		  .then(function(response) {
		    if (response.ok) {
		      // Success!
		      return response.text();
		    } else {
		      // Something went wrong (404, etc.)
		    }
		  })
		  .then(function(xml) {
		    // Parse the XML response into a DOM document
		    const parser = new DOMParser();
		    const doc = parser.parseFromString(xml, 'application/xml');
		
		    // Find all the <tag> elements in the document
		    const tags = doc.querySelectorAll('tag');
		
		    // Convert the tags to a JSON object of key-value pairs
		    const json = Array.from(tags).reduce(function(obj, tag) {
		      obj[tag.getAttribute('k')] = tag.getAttribute('v');
		      return obj;
		    }, {});
		
		    // Do something with the JSON object...
		
		      runtime.setReturnValue(str(json));
		  });
	},

	async ["Event-Blatt2_Event19_Act1"](runtime, localVars)
	{
		runtime.globalVars.MAXSTAY_inp = prompt("Diese Zeichen enthalten eine (maximale) Zeitangabe.\nWelche Maximalzeit steht auf diesem Schild?\nGib es bitte in folgender Form an: 30 minutes, 1 hour, 2 hours... ", "2 hours");
	},

	async ["Event-Blatt2_Event20_Act1"](runtime, localVars)
	{
		runtime.globalVars.PERMIT_inp = prompt("Hier braucht man einen bestimmten Parkausweis. Welchen?", "");
	},

	async ["Event-Blatt2_Event21_Act1"](runtime, localVars)
	{
		runtime.globalVars.OH_inp = prompt("Bitte gib den auf dem Zeichen angegebenen Zeitraum im OSM opening_hours-Syntax an.", "Mo-Fr 08:00-16:00");
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

