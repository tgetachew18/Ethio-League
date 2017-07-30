var Scene = function(gl, output) {



  gl.enable(gl.BLEND);
  
  gl.blendFunc(
  gl.SRC_ALPHA,
  gl.ONE_MINUS_SRC_ALPHA);

  gl.enable(gl.DEPTH_TEST);

 
  // in constructor 
  this.vsTrafo2d = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "blue_fs.essl"); 
  this.fsRegular = new Shader(gl, gl.FRAGMENT_SHADER, "plain_fs.essl");
  this.plainvs = new Shader(gl, gl.VERTEX_SHADER, "ground_vs.essl");
  this.plainfs = new Shader(gl, gl.FRAGMENT_SHADER, "color_fs.essl");
  this.backvs = new Shader(gl, gl.VERTEX_SHADER, "back_vs.essl");
  this.backfs = new Shader(gl, gl.FRAGMENT_SHADER, "back_fs.essl")
  this.proceduralFS = new Shader(gl, gl.FRAGMENT_SHADER, "procedural_fs.essl");
  this.slowPokeFs = new Shader(gl, gl.FRAGMENT_SHADER, "slowpoke_fs.essl");
  this.asteroidProgram = new Program(gl, this.vsTrafo2d, this.fsSolid);
  this.ambientProgram = new Program(gl, this.plainvs, this.plainfs);
  this.regularProgram = new Program(gl, this.vsTrafo2d, this.fsRegular);
  this.backprogram = new Program(gl, this.backvs, this.backfs);
  this.boardProgram = new Program(gl, this.vsTrafo2d, this.proceduralFS);
  this.evilProgram = new Program(gl, this.vsTrafo2d, this.slowPokeFs);

  this.backgroundTexture = new Texture2D(gl, "js/res/pp.png"); //
  this.backMaterial  = new Material(gl, this.backprogram);
  this.skyCubeTexture = new  TextureCube(gl, ["js/res/red/right.png", //x //right
                                               "js/res/red/left.png", //-x //left
                                               "js/res/red/top.png",  //y //top
                                               "js/res/red/bottom.png", //-y //bottom
                                               "js/res/red/front.png",  //z //front
                                               "js/res/red/back.png",]); //-z //back

  this.backMaterial.envmapTexture.set(this.skyCubeTexture);
  this.backMesh = new Mesh(new QuadGeometry(gl), this.backMaterial);
  this.background = new GameObject2D(this.backMesh);



  


  var materials =  [];

 

  this.truck = new Avatar(gl, this.asteroidProgram, this.ambientProgram);
  this.ball = new SlowPoke(gl, this.asteroidProgram);
  this.goal = new Goal(gl, this.evilProgram);
  this.goal.position.z -= 450;
  this.goal.position.y -= 4;
  this.goal2 = new Goal(gl,  this.evilProgram);
  this.goal2.position.z += 450;
  this.ball.position.z -= 100; //
  this.ball.position.x -= 50;
  this.ball.updateModelTransformation();

  this.evilSlowPoke= new EvilSlowPoke(gl, this.asteroidProgram, this.skyCubeTexture);
  this.evilSlowPoke.position.z = -420;
  this.evilSlowPoke.position.x = 0;
  this.evilSlowPoke.scale.mul(5);
  this.ground = new Ground(gl, this.regularProgram, this.boardProgram);
  this.ground.scale.mul(1000);




  this.camera = new PerspectiveCamera();
  this.camera.position = new Vec3(0, 10 ,-30);
  this.camera.ahead.mul(-1);
  this.timeAtLastFrame = new Date().getTime();
  



 }

Scene.prototype.update = function(gl, keysPressed, mousePressed) {
	// // set clear color (part of the OpenGL render state)
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	// // clear the screen
	gl.clear(gl.COLOR_BUFFER_BIT);  
	this.count += 1;
	var timeAtThisFrame = new Date().getTime();
	var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
	this.timeAtLastFrame = timeAtThisFrame;
    


  // this.camera.move(dt, keysPressed);
   this.camera.follow(this.truck);
  this.truck.move(dt, keysPressed);
  this.ball.move(dt, keysPressed);
    var forward = new Vec3(0,0,1);
  this.truck.Draw(this.camera);
  this.goal.Draw(this.camera);
  this.goal2.Draw(this.camera);
  this.ball.Draw(this.camera);
 this.ground.Draw(this.camera);
  this.truck.hasHit(this.ball);
  this.evilSlowPoke.follow(this.ball, dt);
  this.evilSlowPoke.Draw(this.camera);
  this.background.draw(this.camera,[],[]);
  this.ground.hasHit([this.truck, this.ball]);


  



}