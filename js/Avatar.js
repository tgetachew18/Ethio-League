var Avatar = function(gl, program, program2){
  var materials =  [];

  this.speed = 10;
  this.position = new Vec3(0. ,0, 0.0); 
  this.orientation = 0;
  this.engineAcc = 50;
  this.drag = -0.01;
  
  this.radius = 5;
  this.mass = 1000;
  this.skyCubeTexture = new  TextureCube(gl, ["js/res/cube/chckers.png", //x
                                               "js/res/cube/chckers.png", //-x
                                               "js/res/cube/chckers.png",  //y
                                               "js/res/cube/chckers.png", //-y
                                               "js/res/cube/chckers.png",  //z
                                               "js/res/cube/chckers.png",]); //-z

  this.slowPokeTextureA  = new Texture2D(gl, "js/res/json/chevy/chevy.png"); //YadonDh.png
  this.slowpkMaterialA  = new Material(gl, program);
  this.slowpkMaterialA.colorTexture.set(this.slowPokeTextureA);
 this.slowpkMaterialA.envmapTexture.set( this.skyCubeTexture);
  materials.push(this.slowpkMaterialA);

  this.slowPokeTextureEye = new Texture2D(gl, "js/res/json/chevy/chevy.png"); //YadonEyeDh
  this.slowpkMaterialB = new Material(gl, program);
  this.slowpkMaterialB.envmapTexture.set( this.skyCubeTexture);
  this.slowpkMaterialB.colorTexture.set(this.slowPokeTextureEye);

  materials.push(this.slowpkMaterialB);
  this.Mesh = new MultiMesh(gl, "js/res/json/chevy/chassis.json", materials);

  this.wheelAngular = 5;
  this.omega = 1;



  GameObject2D.call(this, this.Mesh);
  this.position.y += 3.5;
  this.forward = new Vec3(0,0,-1);
  this.orientation = Math.PI;
  this.scale.mul(0.5);
  this.wheels = new Array();
  this.axis = new Vec3(0,1,0);



  this.wheelFrontLeft = new Wheel(gl, program2);
  this.wheelFrontLeft.updateModelTransformation(); 
  this.wheelFrontLeft.position.x -= 8;
  this.wheelFrontLeft.position.z += 14;
  this.wheelFrontLeft.position.y -= 4; 
  this.wheelFrontLeft.scale.mul(1.5);
  this.wheels.push(this.wheelFrontLeft);


  this.wheelFrontRight = new Wheel(gl, program2);
  this.wheelFrontRight.updateModelTransformation();  
  this.wheelFrontRight.position.x += 8;
  this.wheelFrontRight.position.z += 14;
  this.wheelFrontRight.position.y -= 4; 
  this.wheelFrontRight.scale.mul(1.5);
  this.wheels.push(this.wheelFrontRight);

  this.wheelBackRight = new Wheel(gl, program2);
  this.wheelBackRight.updateModelTransformation();  
  this.wheelBackRight.position.x += 8;
  this.wheelBackRight.position.z -= 12;
  this.wheelBackRight.position.y -= 4; 
  this.wheelBackRight.scale.mul(1.5);
  this.wheels.push(this.wheelBackRight);

  this.wheelBackLeft = new Wheel(gl, program2);
  this.wheelBackLeft.updateModelTransformation();  
  this.wheelBackLeft.position.x -= 8;
  this.wheelBackLeft.position.z -= 12;
  this.wheelBackLeft.position.y -= 4; 
  this.wheelBackLeft.scale.mul(1.5);
  this.wheels.push(this.wheelBackLeft);


  this.updateModelTransformation();
}

Avatar.prototype = new GameObject2D();

Avatar.prototype.Draw = function(camera){
  this.lightsr  = [new Vec3(1, 2, 0)];
  this.lightPDs  = [new Vec3( 10, 0, 0)];
  for (var i = 0; i < this.wheels.length; i++){
      this.wheels[i].updateModelTransformation();
      this.updateModelTransformation();   
      this.wheels[i].modelMatrix.mul(this.modelMatrix); 
      this.wheels[i].draw(camera, [], []);   
      this.draw(camera, this.lightsr, this.lightPDs);
  }
                                                                                                                                                                                                                                                                                                                                   

  

}

Avatar.prototype.hasHit = function(gameObject){
  var distance = Math.sqrt(this.position.minus(gameObject.position).length2());
  if (distance < this.radius + gameObject.radius){
    var vf = (this.mass - gameObject.mass)/(this.mass + gameObject.mass)
    vf = this.velocity.times(vf);
    vf.add(gameObject.velocity.times((2*gameObject.mass)/(gameObject.mass + this.mass)));

    var vb = (  gameObject.mass - this.mass)/(this.mass + gameObject.mass)
    vb = gameObject.velocity.times(vb);
    vb.add(this.velocity.times((2*this.mass)/(gameObject.mass + this.mass)));
    this.velocity = vf;
    gameObject.velocity = vb;
    gameObject.axis.setVectorProduct(
      this.forward,
      PerspectiveCamera.worldUp ); 
    //console.log(distance);
  }
  

}

Avatar.prototype.move = function(dt, keysPressed, mousePressed) { 
  var steer = .02;

 
  var engineAcc = 0;
  var drag = this.velocity.times(this.drag * this.velocity.length()/80);
  
  

  if(keysPressed.W) { 
    engineAcc = this.engineAcc ;
  } 
  if(keysPressed.S) { 
    drag.mul(100);
  } 
  if(keysPressed.D) { 
      this.orientation -= steer;
  } 
  if(keysPressed.A) { 
      this.orientation += steer;
  } 

  for (var i = 0; i < this.wheels.length; i++){
    this.wheels[i].orientation += this.omega * this.velocity.length() * .002;
  }
  
  this.forward = new Vec3(Math.sin(this.orientation), 0 ,Math.cos(this.orientation));
  var slip = this.forward.dot(this.velocity.direction());
 //  console.log(drag.x+" "+drag.y+" "+drag.z);
  drag.add( drag.times(this.velocity.length()*50*(1 - Math.abs(slip))) );


  
  this.forward.normalize();
  this.acceleration =  this.forward.times(engineAcc).plus(drag);
  this.velocity.addScaled(dt, this.acceleration);
  this.position.addScaled(dt, this.velocity);




  
  this.updateModelTransformation(); 
}; 