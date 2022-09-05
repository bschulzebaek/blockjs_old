const vss = `#version 300 es
  uniform mat4 view;
  uniform mat4 proj;
  uniform mat4 camera;
  layout(location=0) in vec3 pos;
  layout(location=1) in vec3 normal;
  layout(location=2) in vec2 uv;
  layout(location=3) in vec2 sprite;
  layout(location=4) in float ao;
  out vec2 texCoord;
  out float occ;
  out vec3 norm;
  const float size = 1.0 / 16.0;
  void main() {
    occ = ao;
    norm = normal;
    float u = sprite.x * size + uv.x * size;
    float v = sprite.y * size + uv.y * size;
    texCoord = vec2(u, v);
    gl_Position = proj * camera * view * vec4(pos, 1.0);
  }
`;

export default vss;