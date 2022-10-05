#version 300 es
precision lowp float;

in vec4 vcol;

out vec4 col;

void main() {
    col = vcol;
}