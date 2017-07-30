var Goal = function(gl, program){
  var materials =  [];

  this.speed = 10;
  this.position = new Vec3(0. ,0, 0.0); 
  this.orientation =0;
  this.axis = Vec3(1,0,0);
  this.forward = new Vec3(0,0,1);
  this.radius = 15;
  this.mass = 0.5;
  this.skyCubeTexture = new  TextureCube(gl, ["js/res/red/right.png", //x //right
                                               "js/res/red/left.png", //-x //left
                                               "js/res/red/top.png",  //y //top
                                               "js/res/red/bottom.png", //-y //bottom
                                               "js/res/red/front.png",  //z //front
                                               "js/res/red/back.png",]); //-z //back
  this.GoalTextureA  = new Texture2D(gl, "js/res/goal_post_texture.png"); //
  this.slowpkMaterialA  = new Material(gl, program);
  this.slowpkMaterialA.colorTexture.set(this.GoalTextureA);
  this.slowpkMaterialA.envmapTexture.set(this.skyCubeTexture);
  materials.push(this.slowpkMaterialA);

  this.GoalTextureEye = new Texture2D(gl, "js/res/goal_post_texture.png"); //
  this.slowpkMaterialB = new Material(gl, program);
  this.slowpkMaterialB.envmapTexture.set( this.skyCubeTexture);
  this.slowpkMaterialB.colorTexture.set(this.GoalTextureEye);

  materials.push(this.slowpkMaterialB);
  this.Mesh = new MultiMesh(gl, "js/res/goal_final.json", materials);

  GameObject2D.call(this, this.Mesh);
  this.drag = 0.5;
  this.scale.mul(0.5);



  this.updateModelTransformation();
}

Goal.prototype = new GameObject2D();

Goal.prototype.Draw = function(camera){
  this.lightsr  = [new Vec3(0, 2, 0)];
  this.lightPDs  = [new Vec3(1, 1, 1, 1)];
  this.updateModelTransformation();   


  this.draw(camera, this.lightsr, this.lightPDs);
  }
                                                                                                                                                                                                                                                                                                                                   

  


Goal.prototype.move = function(dt, keysPressed, mousePressed) { 
   var drag = this.velocity.times(this.drag * this.velocity.length()/80);
   this.velocity.addScaled(dt, this.acceleration.minus(drag));
  this.position.addScaled(dt, this.velocity);
  this.orientation += this.velocity.length() * -0.1 * dt;




  
  this.updateModelTransformation(); 
}; 