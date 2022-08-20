const fss = `#version 300 es
  precision highp float;
  uniform sampler2D tex0;
  in vec2 texCoord;
  out vec4 col;
  void main() {
      col = texture(tex0, texCoord);
  }
`;

export default fss;