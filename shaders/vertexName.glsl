precision mediump float;

#define pi 3.14
#define operation pi/180

attribute vec3 aPos;
uniform vec3 theta;
uniform float scale;
uniform mat4 projection;
uniform mat4 modelView;

void main(){
	gl_Position=vec4(aPos,1.);

	gl_Position = projection * modelView * gl_Position;
}
