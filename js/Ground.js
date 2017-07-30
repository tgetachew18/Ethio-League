var Ground = function(gl, program, programb, skybox){

	// A big ground plane
	this.gl = gl;
	this.program = program;
	this.bigQuadgeo = new QuadGeometry(gl);
	this.bigQuadgeo.setVertexBuffer( new Float32Array([
        -0.2, -1, 0, //bottom left
        -0.2,  1, 0, //top left
         0.2, -1, 0, //bottom right
         0.2,  1, 0, //#top right
    ]));
	this.bigQuadMaterial = new Material(gl, program);
	this.bigQuadTexture = new Texture2D(gl, "js/res/metaltile.jpg");
	this.bigQuadMaterial.colorTexture.set(this.bigQuadTexture);  
	this.bigQuadMaterial.envmapTexture.set( skybox);
	this.Mesh = new Mesh(this.bigQuadgeo, this.bigQuadMaterial);
	GameObject2D.call(this, this.Mesh);
	this.orientation = Math.PI/2;
	this.scale.mul(0.5);


	this.position.y -= .51;

	this.sideGeo = new QuadGeometry(gl);
	this.sideGeo2 = new QuadGeometry(gl);
	this.sideGeo.setVertexBuffer( new Float32Array([
        -0.25, -1, 0, //bottom left
        -0.25,  1, 0, //top left
         0.25, -1, 0, //bottom right
         0.25,  1, 0, //#top right
    ]));

	this.sideGeo2.setVertexBuffer( new Float32Array([
        -0.05,  0, -1, //bottom left
        -0.05,  0, 1, //top left
         0.05, 0,  -1, //bottom right
         0.05,  0, 1, //#top right
    ]));
	this.sideMaterial = new Material(gl, programb);
	this.sideTexture = new Texture2D(gl, "js/res/cube/chckers.png")
	this.sideMaterial.colorTexture.set(this.sideTexture);  
	this.sideMesh = new Mesh(this.sideGeo, this.sideMaterial);
	this.sideObj = new GameObject2D(this.sideMesh);
	this.sideObj.axis = this.sideObj.zAxis;
	this.sideObj.orientation = Math.PI/2;
	this.sideObj.position.z -= 460;
	this.sideObj.scale.mul(100);
	this.sideObj.updateModelTransformation();

	this.sideObj2 = new GameObject2D(this.sideMesh);
	this.sideObj2.axis = this.sideObj2.zAxis;
	this.sideObj2.orientation = Math.PI/2;
	this.sideObj2.position.z += 460;
	this.sideObj2.scale.mul(100);
	this.sideObj2.updateModelTransformation();

	this.sideMaterial2 = new Material(gl, programb);
	this.sideMaterial2.colorTexture.set(this.sideTexture);  
	this.sideMesh2 = new Mesh(this.sideGeo2, this.sideMaterial2);
	this.sideObj3 = new GameObject2D(this.sideMesh2);
	this.sideObj3.axis = this.sideObj3.zAxis;
	this.sideObj3.orientation = Math.PI/2;
	this.sideObj3.position.x -= 100;
	this.sideObj3.scale.mul(520);
	this.sideObj3.updateModelTransformation();

	this.sideObj4 = new GameObject2D(this.sideMesh2);
	this.sideObj4.axis = this.sideObj3.zAxis;
	this.sideObj4.orientation = Math.PI/2;
	this.sideObj4.position.x += 100;
	this.sideObj4.scale.mul(520);
	this.sideObj4.updateModelTransformation();
}

Ground.prototype = new GameObject2D();

Ground.prototype.hasHit = function(gameObjects){
	for (var i = 0; i < gameObjects.length; i++){
		if (gameObjects[i].position.x < -90 || gameObjects[i].position.x > 90){
			gameObjects[i].velocity.x *= -1.5;

		}
		else if (gameObjects[i].position.z <= -450 || gameObjects[i].position.z > 450){
			gameObjects[i].velocity.z *= -1.5;
		}

	}
		
	

}

Ground.prototype.Draw = function(camera){
	this.updateModelTransformation();
	this.draw(camera, [], []);
	this.sideObj.draw(camera, [], []);
	this.sideObj2.draw(camera, [], []);
	this.sideObj3.draw(camera, [], []);
	this.sideObj4.draw(camera, [], []);
}
