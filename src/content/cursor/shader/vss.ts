const vss = `#version 300 es
uniform mat4 view;
uniform mat4 proj;
uniform mat4 camera;
uniform vec4 color;

layout(location=0) in vec3 pos;

out lowp vec4 vcol;

void main() {
    vcol = color;
    gl_Position = proj * camera * view * vec4(pos, 1.0);
}
`;

export default vss;