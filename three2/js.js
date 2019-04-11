// console.log(datas);  //数据源
//  渲染器
let renderer;

function initThree() {
    width = document.getElementById('canvas').clientWidth;
    height = document.getElementById('canvas').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas').appendChild(renderer.domElement);

    renderer.setClearColor(0xf0f0f0, 1.0);
}


// 场景设置
let scene;

function initScene() {
    scene = new THREE.Scene();
}

// 光源以及材质设置
let light;

function initLight() {
    // light = new THREE.AmbientLight(0x3f2806);
    // light.position.set(100, 100, 200);
    // scene.add(light);
}

// 相机设置
let camera;

function initCamera(fov) {

    if (fov == undefined){
        fov = 20;
    };
    console.log(fov);
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 20, 1000);
    camera.position.set(50,100,100);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });

    // scene.add(camera)
}

// 物品写入
let cube,
    mesh;

function initObject() {
    // 几何体
    let material;
    // 遍历参数
    datas.forEach(function (elem, index) {
        let x,
            y,
            z;
        elem.forEach(function (item, idx) {
            // console.log(item)
            if (item.length != 1) {
                x = item[0];
                y = item[1];
            }else if (item.length == 1) {
                x = 0;
                y = 0;
                z = item[0];
            };
            // console.log(x / 90000,y / 90000,z);
            geometry = new THREE.BoxGeometry(1, 1, 1);
            for ( let i = 0; i < geometry.faces.length; i += 2 ) {
                let hex = Math.random() * 0xffffff;
                geometry.faces[ i ].color.setHex( hex );
                geometry.faces[ i + 1 ].color.setHex( hex );
            };
            material = new THREE.MeshBasicMaterial( {  vertexColors: THREE.FaceColors} );
            mesh = new THREE.Mesh( geometry,material);
            // 定位
            mesh.position.set(x  ,y ,z );
            // mesh.position = new THREE.Vector3(0,0,0);
            mesh.rotateX(Math.PI/80);
            scene.add(mesh);
        });
    });
}
// 坐标系创建
function initXyz() {
    let geometry = new THREE.CubeGeometry(0,0,0);
    let materail = new THREE.MeshBasicMaterial({color:0xeeeeee});
    cube = new THREE.Mesh(geometry,materail);
    let axisHe = new THREE.AxisHelper(50);
    let object = new THREE.Object3D();
    object.add(axisHe);
    object.add(cube);
    scene.add(object)
}
function addEvent(obj,xEvent,fn) {
    if (obj.attachEvent) {
        obj.attachEvent('on' + xEvent, fn);
    } else {
        obj.addEventListener(xEvent, fn, false);
    }
}
let fov = 20;
window.onload = function () {
    //接着利用我们自己封装的函数给div绑定事件，
    var oDiv = document.getElementById('canvas');
    addEvent(oDiv, 'mousewheel', onMouseWheel);
    addEvent(oDiv, 'DOMMouseScroll', onMouseWheel);

    // 当滚轮事件发生时，执行onMouseWheel这个函数
    function onMouseWheel() {
        let mous = event.wheelDelta;
        if (event.wheelDelta > 0){
            fov -= 1;
            camera.fov = fov;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        } else {
            fov += 1;
            camera.fov = fov;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }
    }
};
// 执行代码
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initXyz()
    renderer.clear();
    renderer.render(scene, camera);

    animation();
}
function animation() {
    mesh.scale.x =  mesh.scale.x+1;
    scene.add(mesh);
    requestAnimationFrame(animation);

}
threeStart();