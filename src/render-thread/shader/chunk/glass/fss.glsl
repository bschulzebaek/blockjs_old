#version 300 es
precision highp float;

uniform sampler2D tex0;

in vec2 texCoord;

out vec4 col;

void main() {
    vec4 texel = texture(tex0, texCoord);
    if (texel.a < 0.5)
        discard;
    col = texel;
}