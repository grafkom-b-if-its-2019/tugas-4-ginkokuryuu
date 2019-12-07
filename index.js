(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);

    var vertexShaderNama = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
			fragmentShaderNama = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program2 = glUtils.createProgram(gl, vertexShaderNama, fragmentShaderNama);
    

    var cubeVBO;
    var cubeVertices = [];
    var vPosition;
    var vTexCoord;
    var vNormal;
    function InitBox(){
      cubeVertices = [
        // x, y, z            u, v         normal

        // -0.5,  0.5,  0.5,     0.5, 1,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
        // -0.5, -0.5,  0.5,     0.75, 1,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     0.75, 0.5,  0.0, 0.0, 1.0, 
        // -0.5,  0.5,  0.5,     0.5, 1,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     0.75, 0.5,  0.0, 0.0, 1.0, 
        //  0.5,  0.5,  0.5,     0.5, 0.5,  0.0, 0.0, 1.0, 

        0.5,  0.5,  0.5,     0.0, 0.5,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
        0.5, -0.5,  0.5,     0.25, 0.5,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,     0.25, 0.0,  1.0, 0.0, 0.0,
        0.5,  0.5,  0.5,     0.0, 0.5,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,     0.25, 0.0,  1.0, 0.0, 0.0,
        0.5,  0.5, -0.5,     0.0, 0.0,  1.0, 0.0, 0.0,

        0.5, -0.5,  0.5,     0.0, 1,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
        -0.5, -0.5,  0.5,     0.25, 1,  0.0, -1.0, 0.0,
        -0.5, -0.5, -0.5,     0.25, 0.5,  0.0, -1.0, 0.0,
        0.5, -0.5,  0.5,     0.0, 1,  0.0, -1.0, 0.0,
        -0.5, -0.5, -0.5,     0.25, 0.5,  0.0, -1.0, 0.0,
        0.5, -0.5, -0.5,     0.0, 0.5,  0.0, -1.0, 0.0,

        -0.5, -0.5, -0.5,     0.25, 0.5,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
        -0.5,  0.5, -0.5,     0.25, 0.0,  0.0, 0.0, -1.0,
        0.5,  0.5, -0.5,     0.5, 0.0,  0.0, 0.0, -1.0,
        -0.5, -0.5, -0.5,     0.25, 0.5,  0.0, 0.0, -1.0,
        0.5,  0.5, -0.5,     0.5, 0.0,  0.0, 0.0, -1.0,
        0.5, -0.5, -0.5,     0.5, 0.5,  0.0, 0.0, -1.0,

        -0.5,  0.5, -0.5,     0.75, 0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
        -0.5, -0.5, -0.5,     0.75, 0.5,  -1.0, 0.0, 0.0,
        -0.5, -0.5,  0.5,     0.5, 0.5,  -1.0, 0.0, 0.0,
        -0.5,  0.5, -0.5,     0.75, 0,  -1.0, 0.0, 0.0,
        -0.5, -0.5,  0.5,     0.5, 0.5,  -1.0, 0.0, 0.0,
        -0.5,  0.5,  0.5,     0.5, 0,  -1.0, 0.0, 0.0,

        0.5,  0.5, -0.5,     0.5, 1,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
        -0.5,  0.5, -0.5,     0.75, 1,  0.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,     0.75, 0.5,  0.0, 1.0, 0.0,
        0.5,  0.5, -0.5,     0.5, 1,  0.0, 1.0, 0.0,
        -0.5,  0.5,  0.5,     0.75, 0.5,  0.0, 1.0, 0.0,
        0.5,  0.5,  0.5,     0.5, 0.5,  0.0, 1.0, 0.0
      ];

      cubeVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      vPosition = gl.getAttribLocation(program, 'vPosition');
      vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
      vNormal = gl.getAttribLocation(program, 'vNormal');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);
    }

    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    gl.useProgram(program);
    // InitBox();

    // Uniform untuk definisi cahaya
    var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
    var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
    var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
    var lightColor = [0.5, 0.5, 0.5];
    // 154094 nrp
    var ambientColor = glMatrix.vec3.fromValues(0.15, 0.40, 0.94);
    gl.uniform3fv(lightColorLoc, lightColor);
    gl.uniform3fv(ambientColorLoc, ambientColor);

    var nmLoc = gl.getUniformLocation(program, 'normalMatrix');


    // ==============================================================================================================================

    var vertices;
    var hurufBuffer;
    var hurufPos
    var hurufN;
    var furthestPos = [1, 14, 32, 33];

    function InitHuruf(){
      gl.useProgram(program2);
      vertices = new Float32Array([
              0.02, 0.7, 0.0,
              0.16, 0.78, 0.0,
              -0.3, 0.19, 0.0,

              0.16, 0.78, 0.0,
              -0.3, 0.19, 0.0,
              -0.19, 0.22, 0.0,


              -0.1, 0.4, 0.0,
              0.03, 0.25, 0.0,
              0.05, 0.33, 0.0,

              -0.1, 0.4, 0.0,
              0.03, 0.25, 0.0,
              -0.13, 0.325, 0.0,


              0.08, 0.4, 0.0,
              0.19, 0.45, 0.0,
              -0.38, -0.3, 0.0,

              0.19, 0.45, 0.0,
              -0.28, -0.27, 0.0,
              -0.38, -0.3, 0.0,




              0.21, 0.46, 0.0,
              0.31, 0.5, 0.0,
              -0.26, -0.267, 0.0,

              0.31, 0.5, 0.0,
              -0.16, -0.237, 0.0,
              -0.26, -0.267, 0.0,


              -0.07, -0.02, 0.0,
              0.13, -0.13, 0.0,
              0.1, -0.2, 0.0,

              -0.07, -0.02, 0.0,
              0.1, -0.2, 0.0,
              -0.1, -0.09, 0.0,


              0.18, 0.0, 0.0,
              0.33, 0.08, 0.0,
              -0.25, -0.7, 0.0,

              0.33, 0.08, 0.0,
              -0.05, -0.55, 0.0,
              -0.25, -0.7, 0.0,
      ]);
      
      hurufN = vertices.length / 2;

      vertices = matrixScaling(vertices, 0.3);
      // vertices = matrixTranslating(vertices, 0.0, -0.025, 0.0);

      hurufBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, hurufBuffer);

      hurufPos = gl.getAttribLocation(program2, "aPos");
      var projection = gl.getUniformLocation(program2, 'projection');
      var modelView = gl.getUniformLocation(program2, 'modelView');

      gl.uniformMatrix4fv(projection, false, pm);
      gl.uniformMatrix4fv(modelView, false, vm);

      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.vertexAttribPointer(hurufPos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(hurufPos);

      gl.useProgram(program);
    }

    var moveSpeed = [0.0, 0.0, 0.0];
    var rotateSpeed = 1;
    var rotateDir = 1;
    var keyPress = {};
    var moveRate = 0.0001;
    var center = [0.0, 0.0, 0.0]

    function AnimateHuruf(){
      gl.useProgram(program2);
      gl.bindBuffer(gl.ARRAY_BUFFER, hurufBuffer);
      vertices = matrixTranslating(vertices, moveSpeed[0], moveSpeed[1], moveSpeed[2]);
      for(var i = 0; i < 3; i++){
        center[i] += moveSpeed[i];
      }
      vertices = matrixRotating(vertices, rotateSpeed * rotateDir, center[0], center[2]);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.vertexAttribPointer(hurufPos, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(hurufPos);
      gl.useProgram(program);
    }
    var lol = false;
    function OnCollisionEnter(){
      lol = false;
      var x = 0;
      for(var i = 0; i < 4; i++){
        for(var j = 0; j < 3; j++){
          x = furthestPos[i] * 3;
          if(vertices[x + j] >= 0.5 || vertices[x + j] <= -0.5){
            moveSpeed[j] *= -1;
            if(j == 0 || j == 2){
              rotateDir *= -1;
            }
            lol = true;
            break;
          }
        }
        if(lol){
          break;
        }
      }
    }

    function onKeyPress(event) {
      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      } else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      } else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
    document.addEventListener('keypress', onKeyPress);

    var lastX, lastY, dragging;
    function onMouseDown(event) {
      var x = event.clientX;
      var y = event.clientY;
      var rect = event.target.getBoundingClientRect();
      if (rect.left <= x &&
          rect.right > x &&
          rect.top <= y &&
          rect.bottom > y) {
            lastX = x;
            lastY = y;
            dragging = true;
      }
    }
    function onMouseUp(event) {
      dragging = false;
    }
    function onMouseMove(event) {
      var x = event.clientX;
      var y = event.clientY;
      if (dragging) {
        var factor = 10 / canvas.height;
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
        theta[yAxis] += (dx/2);
        theta[xAxis] += (dy/2);
      }
      lastX = x;
      lastY = y;
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    // Definisi view, model, dan projection
    var vmLoc = gl.getUniformLocation(program, 'view');
    var pmLoc = gl.getUniformLocation(program, 'projection');
    var mmLoc = gl.getUniformLocation(program, 'model');
    
    var vm = glMatrix.mat4.create();
    var pm = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 0.0),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
    );

    var fovy = glMatrix.glMatrix.toRadian(90.0);
    var aspect = canvas.width / canvas.height;
    var near = 0.5;
    var far = 10.0;
    glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
    );

    gl.useProgram(program);
    gl.uniformMatrix4fv(vmLoc, false, vm);
    gl.uniformMatrix4fv(pmLoc, false, pm);

    gl.useProgram(program2);
    InitHuruf();

    function render() {
      
      gl.useProgram(program);
      InitBox();
      // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);
      // glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);

      var mvpLoc = gl.getUniformLocation(program, 'MVPMatrix');
      var mvp = glMatrix.mat4.create();
      glMatrix.mat4.multiply(mvp,vm,mm);
      glMatrix.mat4.multiply(mvp,pm,mvp);

      glMatrix.mat4.rotateY(mvp, mvp, theta[yAxis]);
      glMatrix.mat4.rotateX(mvp, mvp, theta[xAxis]);

      // glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      // glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);

      gl.uniformMatrix4fv(mvpLoc, false, mvp);

      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, 2.0]);
      gl.uniformMatrix4fv(mmLoc, false, mm);
      var lightPosition = [vertices[24], vertices[25], vertices[26]];
      // console.log(lightPosition);
      gl.uniform3fv(lightPositionLoc, lightPosition);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);
      gl.drawArrays(gl.TRIANGLES, 0, cubeVertices.length / 8);

      gl.useProgram(program2);
      KeyboardHandler();
      OnCollisionEnter();
      AnimateHuruf();
      gl.drawArrays(gl.TRIANGLES, 0, hurufN);

      gl.useProgram(program);

      requestAnimationFrame(render); 
    }
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Uniform untuk tekstur
    // var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
    // gl.uniform1i(sampler0Loc, 0);
    // Inisialisasi tekstur
    gl.useProgram(program);
    var texture = gl.createTexture();
    if (!texture) {
      reject(new Error('Gagal membuat objek tekstur'));
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Sementara warnai tekstur dengan sebuah 1x1 piksel biru
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    initTexture(function () {
      render();
    });

    // Membuat mekanisme pembacaan gambar jadi tekstur
    function initTexture(callback, args) {
      var imageSource = 'images/fusion.bmp';
      var promise = new Promise(function(resolve, reject) {
        var image = new Image();
        if (!image) {
          reject(new Error('Gagal membuat objek gambar'));
        }
        image.onload = function() {
          gl.useProgram(program);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          resolve('Sukses');
        }
        image.src = imageSource;
      });
      promise.then(function() {
        if (callback) {
          callback(args);
        }
      }, function (error) {
        console.log('Galat pemuatan gambar', error);
      });
    }
    function GetKey(event){
      keyPress[event.keyCode] = true;
    }
  
    function GetKeyUp(event){
      keyPress[event.keyCode] = false;
    }
  
    function KeyboardHandler(){
      if(keyPress[87]){
        //w
        moveSpeed[1] += moveRate;
      }
      else if(keyPress[65]){
        //a
        moveSpeed[0] -= moveRate;
      }
      else if(keyPress[83]){
        //s
        moveSpeed[1] -= moveRate;
      }
      else if(keyPress[68]){
        //d
        moveSpeed[0] += moveRate;
      }
      else if(keyPress[81]){
        //q
        moveSpeed[2] -= moveRate;
      }
      else if(keyPress[69]){
        //e
        moveSpeed[2] += moveRate;
      }
      else if(keyPress[32]){
        //space
        moveSpeed = [0.0, 0.0, 0.0]
      }
    }
  
    function onKeyPress(event) {
      if (event.keyCode == 88 || event.keyCode == 120) {
        axis = xAxis;
      }
      else if (event.keyCode == 89 || event.keyCode == 121) {
        axis = yAxis;
      }
      else if (event.keyCode == 90 || event.keyCode == 122) {
        axis = zAxis;
      }
    }
  
    document.addEventListener("keypress", onKeyPress);
    document.onkeydown = GetKey;
    document.onkeyup = GetKeyUp;

  }

})();
