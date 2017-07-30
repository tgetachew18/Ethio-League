var EvilSlowPoke = function(gl, program, skybox){
  var materials =  [];

  this.speed = 50;
  this.position = new Vec3(0. ,0, 0.0); 
  this.orientation =0;
  
  this.forward = new Vec3(0,0,1);
  this.radius = 15;
  this.mass = 0.5;

  this.slowPokeTextureA  = new Texture2D(gl, "js/res/YadonDh.png"); //
  this.slowpkMaterialA  = new Material(gl, program);
  this.slowpkMaterialA.envmapTexture.set( skybox);
  this.slowpkMaterialA.colorTexture.set(this.slowPokeTextureA);
  materials.push(this.slowpkMaterialA);

  this.slowPokeTextureEye = new Texture2D(gl, "js/res/YadonEyeDh.png"); //
  this.slowpkMaterialB = new Material(gl, program);
  this.slowpkMaterialB.envmapTexture.set( skybox);
  this.slowpkMaterialB.colorTexture.set(this.slowPokeTextureEye);

  materials.push(this.slowpkMaterialB);
  this.Mesh = new MultiMesh(gl, "js/res/Slowpoke.json", materials);

  GameObject2D.call(this, this.Mesh);
   this.axis = new Vec3(0,1,0)
  this.position.y -= 4;
  this.drag = 0.5;
  this.scale.mul(0.4);



  this.updateModelTransformation();
}

EvilSlowPoke.prototype = new GameObject2D();

EvilSlowPoke.prototype.Draw = function(camera){
  this.lightsr  = [new Vec3(0, 2, 0)];
  this.lightPDs  = [new Vec3(1, 1, 1, 1)];
  this.updateModelTransformation();   


  this.draw(camera, this.lightsr, this.lightPDs);
  }

  EvilSlowPoke.prototype.follow = function(gameObject, dt){
    this.forward = gameObject.position.minus(this.position);
    var distance = this.forward.length();
    if (distance < this.radius + gameObject.radius + 4){
      gameObject.velocity.z *= -1;
      
    }

    this.forward.normalize();

    

    this.velocity.addScaled(dt, this.forward.times(this.speed));
    if (gameObject.position.x  < 45 && gameObject.position.x > -45)
        this.position.x = gameObject.position.x;
    this.position.y = -2;
    this.orientation = -Math.acos(this.forward.x/this.forward.length()) + 1.3;
    this.updateModelTransformation();
  }
                                                                                                                                                                                                                                                                                                                                   

  


EvilSlowPoke.prototype.move = function(dt, keysPressed, mousePressed) { 
   var drag = this.velocity.times(this.drag * this.velocity.length()/80);
   this.velocity.addScaled(dt, this.acceleration.minus(drag));
  this.position.addScaled(dt, this.velocity);
  this.orientation += this.velocity.length() * -0.1 * dt;



  
  this.updateModelTransformation(); 
}; 