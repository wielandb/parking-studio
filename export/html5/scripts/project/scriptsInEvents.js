


const scriptsInEvents = {

	async ["Event-Blatt1_Event141_Act1"](runtime, localVars)
	{
		    var strings = localVars.inpText.split(localVars.backConnect);
			var a = localVars.a;
			var b = localVars.b;
			var c = localVars.c;
			
			
			// go through all the strings
		    for (var i = 0; i < strings.length; i++) {
		        var string = strings[i];
		        // if the string contains a, check if there is a string that contains b and is the same if a and b are removed
		        if (string.indexOf(a) != -1) {
		            var found = false;
		            for (var j = 0; j < strings.length; j++) {
		                if (j != i) {
		                    var string2 = strings[j];
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
		                // if there is, replace a with c
		                string = string.replace(a, c);
		                // and delete the string that contains b
		                strings.splice(j, 1);
		                // put the string back in the list (replace the string that contained b)
		                strings[j] = string;
		            }
		        }
		        
		    }
		    // put strings back into one string, connected with newlines
		    var result = "";
		    for (var i = 0; i < strings.length; i++) {
		        result += strings[i] + localVars.backConnect;
		    }
		    
		
		    runtime.setReturnValue(result);
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

