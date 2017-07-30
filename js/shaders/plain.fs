
shaderSource[document.currentScript.src.split('js/shaders/')[1]] = `
	precision highp float;
	varying vec2 texCoord;
	varying vec3 color;
	uniform vec4 lightPowerDensity[1];
	uniform vec3 lightPos[1];
	uniform sampler2D colorTexture;
	varying vec3 worldNormal;
	varying vec4 worldPos;
	varying vec4 eyepos;
	varying vec4 rayDir;



	void main(void) {
		vec4 texture   = texture2D(colorTexture, texCoord);

		//Ambient
		vec4 lAmbient = texture;
		lAmbient.w = 1.0;

	
		//Diffuse Directional

		
		vec3 N = normalize(worldNormal);
		vec3 L = normalize(lightPos[0] );
		float lambertTerm  = clamp(dot(N, L), 0.0, 1.0);
		vec4 lDiffuse =  lightPowerDensity[0]* texture * lambertTerm;
		lDiffuse.w = 1.0;

		//Diffuse Point Light
		// vec3 surfacetoCamera = normalize(eyepos - worldPos).xyz;
		// vec3 surfacetoLight = normalize(lightPos[0] - worldPos.xyz);
		// vec3 h = normalize(surfacetoLight + surfacetoCamera); // halfway vector
		// float light = dot(worldNormal, h); 
		// light = clamp(light,0.0, 1.0 );
		// float specular = pow(light, 15.0);
		// vec3 specColor = vec3(1,1,1);
		// vec4 lSpecular = vec4(specColor  * specular, 1.0);

		vec3 eyeVec = vec3(eyepos - worldPos );
		vec3 E = normalize(eyeVec );
		vec3 R = reflect(L, N);
		float specular = pow(max(dot(R, E), 0.0), 15.0);
		vec4 lSpecular =  lightPowerDensity[0]  * vec4(1,1,1,1)* specular;
		vec4 final =  lAmbient ;



		final.a = 1.0;
		gl_FragColor = final;
	}
`;