var MultiMesh = function(
    gl, jsonModelFileUrl, materials) { 
  this.meshes = []; 
  
  var request = new XMLHttpRequest(); 
  
  request.overrideMimeType("application/json");
   request.open("GET", jsonModelFileUrl); 
  this.scale  = 0.1;
  var theMultiMesh = this; 
  request.onreadystatechange = function () { 

		if (request.readyState == 4) { 
		  var meshesJson =  JSON.parse(request.responseText).meshes;
		  for (var i = 0; i < meshesJson.length; i++) { 
		  	var mesh =  new Mesh(  new IndexedTrianglesGeometry(gl, meshesJson[i]),   materials[i]  );	
		    theMultiMesh.meshes.push(mesh); 
		  } 
		}

  }; 
  request.send(); 
}; 

MultiMesh.prototype.draw = function(gl){ 
  for (var i = 0; i < this.meshes.length; i++) { 
    this.meshes[i].draw(gl); 
  } 
}; 