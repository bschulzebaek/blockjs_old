const fss = `#version 300 es
precision highp float;
in vec3 texCoord;
uniform samplerCube sky;
out vec4 col;
void main() {
  vec4 tx = texture(sky, texCoord);
  float rat = 1.0 - ((texCoord.y + 150.0) / 250.0);
  float m = max(0.0, rat - 0.2);
  vec4 sky = vec4(-0.1, 0.0, 0.7, 1.0);
  col = mix(tx, vec4(sin((texCoord.y * texCoord.x) *  300.0), cos((texCoord.z) / 50.0), 0.0, 1.0) * 0.5, m);
  col = mix(col, sky, 0.3);
}
`;

export default fss;