var message_counts = {};
var count_objs = [];
var messages;

window.onload = initialize;
function initialize() {
	//we will initialize stuff here later
	$.getJSON("BIOSPHEREE.json", function(json) {
		messages = json;
		for (var i = 0; i < messages.length; i++) {
			var name = messages[i]["FIELD3"];
			if (name in message_counts) {
				message_counts[name] += 1;
			} else {
				message_counts[name] = 1;
			}
		}

		for (var key in message_counts) {
		  if (message_counts.hasOwnProperty(key)) {
		  	var newObj = {"label" : key, "value" : message_counts[key]};
		    count_objs.push(newObj);
		  }
		}
		console.log(count_objs);
		drawGraph();
	});
	
}


function drawGraph() {
	for(var i = 0; i < count_objs.length; i++) {
		count_objs[i].color = getRandomColor();
	}
	var canvas = document.getElementById("myChart");
	var ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth * 0.7;
	canvas.height = window.innerHeight * 0.7;
	var myDoughnutChart = new Chart(ctx).Doughnut(count_objs);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}