const vss = `#version 300 es
uniform mat4 view;
uniform mat4 proj;
uniform mat4 camera;
layout(location=0) in vec3 pos;
layout(location=2) in vec2 uv;
out vec3 texCoord;
void main() {
  texCoord = pos;
  gl_PointSize = 10.0f;
  gl_Position = proj * camera * view * vec4(pos, 1.0);
}
`;

export default vss;