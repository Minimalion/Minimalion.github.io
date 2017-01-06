var vertexShaderText = [
"precision mediump float;",
"attribute vec2 vertPosition;",
"attribute vec3 vertColor;",
"varying vec3 fragColor;",
"void main()",
"{",
"fragColor = vertColor;",
"gl_Position = vec4(vertPosition, 0.0, 1.0);",
"}"
].join("\n");
var fragmentShaderText = [
"precision mediump float;",
"varying vec3 fragColor;",
"void main() {",
"gl_FragColor = vec4(fragColor, 1.0);}"
].join("\n");

var setup = function() {
  var canvas = document.getElementById("project");
  var gl = canvas.getContext("webgl");
  if (!gl) { gl = canvas.getContext("experimental-webgl");console.log("Using experimental WebGL")}
  if (!gl) { alert("Your browser does not support WebGL");}
  gl.clearColor(1,1,1,1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Error compling vertex shader.", gl.getShaderInfoLog(vertexShader));
    return;}
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Error compling fragment shader.", gl.getShaderInfoLog(fragmentShader));
    return;}

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error linking program", gl.getProgramInfoLog(program));
    return;
  }

  console.log("Project Initialized");

  // REMOVE FROM FINAL PROJECTS    ////////
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("Error validating program", gl.getProgramInfoLog(program));
    return;
  }
  /////////////////////////////////////////

  var triangleVerts = [
    0.0, 0.5,       1.0,1.0,0.0,
    -0.5, -0.5,     0.7,0.0,1.0,
    0.5, -0.5,      0.1,1.0,0.6
  ];

  var triangleVertBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerts), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
  var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
  gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    2, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE, // ???
    5 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
    0 // Offset from beginning of a single vertext to this attribute
  );
  gl.vertexAttribPointer(
    colorAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE, // ???
    5 * Float32Array.BYTES_PER_ELEMENT, // Size of individual vertex
    2 * Float32Array.BYTES_PER_ELEMENT // Offset from beginning of a single vertext to this attribute
  );
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3); // Type of drawing, how many verts to skip, count of verts

};
