
var GameObject2D = function(mesh) { 
  this.mesh = mesh;

  this.position = new Vec3(0, 0, 0);   
  this.velocity = new Vec3(0, 0, 0);
  this.acceleration = new Vec3(0, 0, 0);
  this.orientation = 0; 
  this.scale = new Vec3(1, 1, 1); 
  this.xAxis = new Vec3(1, 0, 0);
  this.yAxis = new Vec3(0, 1, 0);
  this.zAxis = new Vec3(0, 0, 1);
  this.axis = this.xAxis;
  this.ahead = new Vec3(0.0, 0.0, 1.0); 
  this.right = new Vec3(1.0, 0.0, 0.0); 
  this.up = new Vec3(0.0, 1.0, 0.0);  
  
  this.modelMatrix = new Mat4(); 				
  this.type = null;

  this.updateModelTransformation();

  
};

GameObject2D.prototype.updateModelTransformation = function(){
	this.modelMatrix.set().scale(this.scale).rotate(this.orientation, this.axis).translate(this.position);

};		


GameObject2D.prototype.draw = function(camera, lightSource, lightIs){ 
  var E = new Mat4();
  E.set().translate(camera.position);
  Material.shared.modelViewProjMatrix.set().mul(this.modelMatrix).mul(camera.viewProjMatrix);
  Material.shared.rayDirMatrix.set().mul(E).mul(camera.viewProjMatrix).invert();
  for (var i = 0; i < lightSource.length; i++){
  	Material.shared.lightPos[i].set(lightSource[i]);
  	Material.shared.lightPowerDensity[i].set(lightIs[i]);
  	Material.shared.eyePos.set(camera.position);

  	

 
 
  }
  //Material.shared.lightPos[0].set(...);

  this.mesh.draw(); 
};


GameObject2D.prototype.move = function(dt){
	this.findForcesTorques();
	netAcceleration = new Vec3(0,0,0);
	netAngularAcceleration = 0;

	for (var key in this.forces){
		if (this.forces.hasOwnProperty(key)){
				netAcceleration.add( this.forces[key].times(1/this.mass) );}
	}

	this.velocity.addScaled(dt, netAcceleration );
	this.position.addScaled(dt, this.velocity);



	for (var key in this.torques){
		if (this.torques.hasOwnProperty(key)){
				netAngularAcceleration += this.torques[key]/this.mass;

		}
	}

	this.angular_velocity += dt * netAngularAcceleration;
	this.orientation += dt* this.angular_velocity;


}



