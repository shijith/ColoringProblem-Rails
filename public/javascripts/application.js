// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var nodes = [];
var kPixelWidth = 500;
var kPixelHeight= 375;
var i = 0;
var gCanvasElement = 0;
var gDrawingContext;
var selection = [-1, 0];
var colors = [ '#4682b4', '#006400', '#ffff00', '#9400d3', '#8b8682', '#ff0000', '#0000ff', '#ff69b4', '#ffa500', '#e6e6fa' ]


function clr() {

    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
	gDrawingContext.strokeRect(0, 0,  kPixelWidth, kPixelHeight);
	for(var j=0; j < nodes.length; j++)  {
		delete nodes[j];
	}
	nodes = [];
	
	i = 0;
	selection = [-1, 0];
}


function Coord(x, y) {
    this.x = x;
    this.y = y;
}

function node(id, x, y, adj, color) {
	 	this.id = id;
		this.x = x;
		this.y = y;
		this.adj = adj;
		this.color = color;
}

function getCursorPosition(e) {

//	documnent.writeln("OnClick");
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX || e.pageY) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    var coord = new Coord(x, y);
    return coord;
}

function select(cord) {

	var xcord = cord[0];
	var ycord = cord[1];
	var rad;
	if(nodes)
		for(var j = 0; j < nodes.length; j++) {
			rad = Math.floor(Math.sqrt( Math.pow((nodes[j].x - xcord),2) + Math.pow((nodes[j].y - ycord),2) ));
			if(rad <= 10)
				return nodes[j].id;
		}
	
	return -1;
}

function submit()
{
  var myForm = document.createElement("form");
  myForm.method="post" ;
  myForm.action = "/" ;
  for ( var k in nodes) {
  	var myInput = document.createElement("input");
    myInput.setAttribute("name", k) ;
    myInput.setAttribute("value", [nodes[k].adj, nodes[k].x, nodes[k].y]);
    myForm.appendChild(myInput);
  }
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;


}



function nodeOnClick(e) {
	
	var ord = getCursorPosition(e);	
	
	var a = [ord.x, ord.y];
	var check = select(a);
	if(check >= 0) {
		if (selection[0] >= 0) {
			a = nodes[selection[0]];
			b = nodes[check];
			if (a.id == b.id) {
				selection[0] = a.id;
				return;
			} else {
				selection[0] = -1;
				a.adj.push(b.id);
				b.adj.push(a.id);
				draw();
			}
		} else {
			selection[0] = nodes[check].id;
			return;
		}
	} else {
		nodes[i] = new node(i, ord.x, ord.y, [], 0);
		selection[0] = i;
		i += 1;
		draw();
	}
}

function draw() {
	var radius = 10;
    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
	for(var i=0; i < nodes.length; i++) {
		var x = nodes[i].x;
		var y = nodes[i].y;
		var adj = nodes[i].adj;
		var color = colors[nodes[i].color];
		
		gDrawingContext.beginPath();
		for(var j = 0; j < adj.length; j++) {
			gDrawingContext.moveTo(x, y);
			gDrawingContext.lineTo(nodes[adj[j]].x,nodes[adj[j]].y);
    	}
		gDrawingContext.closePath();
		gDrawingContext.strokeStyle = "#000";
	    gDrawingContext.stroke();

		gDrawingContext.beginPath();
		gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
		gDrawingContext.closePath();
		gDrawingContext.strokeStyle = "#000";
	    gDrawingContext.stroke();
		gDrawingContext.fillStyle = color;
		gDrawingContext.fill();

	}

}

function init() {
	selection = [-1, 0];
	
    gCanvasElement = document.getElementById("node");
   	gCanvasElement.width = kPixelWidth;
   	gCanvasElement.height = kPixelHeight;
   	gDrawingContext = gCanvasElement.getContext("2d");

}

