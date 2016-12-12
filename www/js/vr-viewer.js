var viewerLeft;
var viewerRight;
var prevPoint;

var geometry = new THREE.BoxGeometry(.1, .1, .1);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

function goFull() {

    if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled) {

        var i = document.getElementById("container");

        if (i.requestFullscreen) {
            i.requestFullscreen();
        } else if (i.webkitRequestFullscreen) {
            i.webkitRequestFullscreen();
        } else if (i.mozRequestFullScreen) {
            i.mozRequestFullScreen();
        } else if (i.msRequestFullscreen) {
            i.msRequestFullscreen();
        }
    }
};

function loaded() {

    (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js'; document.head.appendChild(script); })();

    var configs = { extensions: ['navigationLock'] };

    var divLeft = document.getElementById('viewer-left');
    viewerLeft = new Autodesk.Viewing.Viewer3D(divLeft);


    var divRight = document.getElementById('viewer-right');
    viewerRight = new Autodesk.Viewing.Viewer3D(divRight);


    var options = {
        'env': 'Production',
        'document': './cube/3dBox.svf'
    };

    Autodesk.Viewing.Initializer(options, function () {

        viewerLeft.start();
        viewerRight.start();

        //viewerRight.navigation.setIsLocked(true);

        viewerLeft.loadModel(options.document, options, successModelLoaded, failedModelLoaded);
        viewerRight.loadModel(options.document, options, successModelLoaded, failedModelLoaded);

    });

    function successModelLoaded(model) {
        setCameraAndRendering(viewerLeft);
        setCameraAndRendering(viewerRight);

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', deviceOrientationListener, false);
            console.log('listening Orientation');
        } else {
            alert('Sorry, your browser doesnt support Device Orientation');
        };

        viewerLeft.navigation.setPosition(new THREE.Vector3(0, 0, 0));
        viewerRight.navigation.setPosition(new THREE.Vector3(0, 0, 0));

        // viewerLeft.navigation.setTarget(new THREE.Vector3(1, 0, 0));
        // viewerRight.navigation.setTarget(new THREE.Vector3(1, 0, 0));
    };

    function deviceOrientationListener(event) {

        // var yawB = document.getElementById('yaw');
        // var pitchB = document.getElementById('pitch');
        // var rollB = document.getElementById('roll');
        // var xB = document.getElementById('Xaa');
        // var yB = document.getElementById('Yaa');
        // var f = document.getElementById('flip');

        // var yaw = 'Yaw = ' + Math.round(event.alpha);
        // var pitch = 'Pitch = ' + Math.round(event.beta);
        // var roll = 'Roll = ' + Math.round(event.gamma);

        // yawB.innerText = yaw;
        // pitchB.innerText = pitch;
        // rollB.innerText = roll;

        var box = new THREE.Mesh(geometry, material);

        //BACKUP START

        ab = Math.abs(event.beta);
        alpha = event.alpha;
        var flipped = (ab < 90 && event.alpha < 0) || (ab > 90 && event.alpha > 0);
        //f.innerText = flipped;
        if (flipped) { alpha += 180 };

        box.applyMatrix(new THREE.Matrix4().makeRotationY(alpha * Math.PI / 180));

        box.updateMatrixWorld();
        var vector = box.geometry.vertices[0].clone();
        var vector1 = box.geometry.vertices[1].clone();

        vector.subVectors(vector, vector1);
        vector.applyMatrix4(box.matrixWorld);
        vector.normalize();

        var box2 = new THREE.Mesh(geometry, material);
        gamma = Math.abs(event.gamma + 90);
        if (flipped) { gamma = -(-gamma + 180) }

        box2.applyMatrix(new THREE.Matrix4().makeRotationX(gamma * Math.PI / 180));

        box2.updateMatrixWorld();
        var vector2 = box2.geometry.vertices[0].clone();
        var vector3 = box2.geometry.vertices[1].clone();

        vector2.subVectors(vector2, vector3);
        vector2.applyMatrix4(box2.matrixWorld);
        vector2.normalize();

        var vectorD = new THREE.Vector3(vector.x, vector.y + vector2.y, vector.z);

        viewerLeft.navigation.setTarget(vectorD);
        viewerRight.navigation.setTarget(vectorD);

        // xB.innerText = vector.normalize().x;
        // yB.innerText = vector.normalize().y;
        // f.innerText = vector.normalize().z;


    };

    function failedModelLoaded(error) {
        console.log('error: ' + error);
    };

    function setCameraAndRendering(targetViewer) {

        targetViewer.setFOV(96);

        targetViewer.setLightPreset(1);
        targetViewer.setQualityLevel(false, false);
        targetViewer.setGhosting(false);
        targetViewer.setGroundShadow(false);
        targetViewer.setGroundReflection(false);
        targetViewer.setEnvMapBackground(false);
        targetViewer.setProgressiveRendering(true);

        // var geometry = new THREE.BoxGeometry(1, 1, 1);
        // var texture333 = THREE.ImageUtils.loadTexture('images/onbox.jpg', {}, function () { });
        // var material = new THREE.MeshBasicMaterial({ map: texture333 });
        // material.side = THREE.BackSide;
        // var cube23 = new THREE.Mesh(geometry, material);

        //targetViewer.impl.scene.add(cube23);



        // pivot1.add(_sphere);
    }
};