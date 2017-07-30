var SlowPoke = function(gl, program){
  var materials =  [];

  this.speed = 10;
  this.position = new Vec3(0. ,0, 0.0); 
  this.orientation = Math.PI - .1;
  this.axis = Vec3(1,0,0);
  this.forward = new Vec3(0,0,1);
  this.radius = 15;
  this.mass = 0.5;

  this.slowPokeTextureA  = new Texture2D(gl, "js/res/ballpattern.jpg"); //
  this.slowpkMaterialA  = new Material(gl, program);
  this.slowpkMaterialA.colorTexture.set(this.slowPokeTextureA);
  materials.push(this.slowpkMaterialA);

  this.slowPokeTextureEye = new Texture2D(gl, "js/res/ballpattern.jpg"); //
  this.slowpkMaterialB = new Material(gl, program);
  this.slowpkMaterialB.envmapTexture.set( this.skyCubeTexture);
  this.slowpkMaterialB.colorTexture.set(this.slowPokeTextureEye);

  materials.push(this.slowpkMaterialB);
  this.Mesh = new MultiMesh(gl, "js/res/ball.json", materials);

  GameObject2D.call(this, this.Mesh);
  this.position.y += 7.5;
  this.drag = 0.5;
  this.scale.mul(0.1);



  this.updateModelTransformation();
}

SlowPoke.prototype = new GameObject2D();

SlowPoke.prototype.Draw = function(camera){
  this.lightsr  = [new Vec3(1, 2, 0)];
  this.lightPDs  = [new Vec3( 10, 0, 0)];;
  this.updateModelTransformation();   


  this.draw(camera,[], []);
  }
                                                                                                                                                                                                                                                                                                                                   

  


SlowPoke.prototype.move = function(dt, keysPressed, mousePressed) { 
   var drag = this.velocity.times(this.drag );
   this.velocity.addScaled(dt, this.acceleration.minus(drag));
  this.position.addScaled(dt, this.velocity);
  this.orientation += this.velocity.length() * -0.1 * dt;




  
  this.updateModelTransformation(); 
}; 