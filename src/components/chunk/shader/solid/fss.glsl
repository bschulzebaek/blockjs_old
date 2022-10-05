#version 300 es
precision lowp float;

uniform sampler2D tex0;

in vec2 texCoord;
in float occ;
in vec3 norm;

out vec4 col;

void main() {
    col = texture(tex0, texCoord);
}