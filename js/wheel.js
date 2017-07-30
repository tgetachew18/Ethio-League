var Wheel = function(gl, program){
  var materials =  [];
  this.speed = 10;
  this.position = new Vec3(0.0,0.0, 0.0); 
  this.ahead = new Vec3(0.0, 0.0, -1.0); 
  this.right = new Vec3(1.0, 0.0, 0.0); 
  this.up = new Vec3(0.0, 1.0, 0.0);  
  this.omega = 0;
  this.alpha = 0;
  

  this.wheelTexture  = new Texture2D(gl, "js/res/json/chevy/chevy.png"); //YadonDh.png
  this.wheelMaterial  = new Material(gl, program);
  this.wheelMaterial.colorTexture.set(this.wheelTexture);
  materials.push(this.wheelMaterial);
  this.Mesh = new MultiMesh(gl, "js/res/json/chevy/wheel.json", materials);
  materials.push(this.wheelMaterial);

  GameObject2D.call(this, this.Mesh);
 
  this.axis = this.xAxis;
  this.orientation = Math.PI - .1;
  this.position.y -= .05;

  this.updateModelTransformation();
}

Wheel.prototype = new GameObject2D();



Wheel.prototype.Draw = function(camera){

  this.lightsr  = [new Vec3(0,-1,0)];
  this.lightPDs  = [new Vec3(3, 3, 3, 1)];
  this.updateModelTransformation();
  this.draw(camera, this.lightsr, this.lightPDs);
}

