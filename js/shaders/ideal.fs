// must have a uniform variable like this

varying vec3 eyePos;
varying vec2 texCoord;
uniform sampler2D colorTexture;
varying vec3 worldNormal;

// compute ideal reflected direction 
vec3 reflDir = reflect(-eyepos, worldNormal);
//find corresponding point in light probe
vec2 probeTex = normalize(-eyepos + reflDir)/2;//compute this from reflDir as in prev. slide
gl_FragColor = texture2D( colorTexture, probeTex);