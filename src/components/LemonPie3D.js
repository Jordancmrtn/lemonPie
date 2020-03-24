import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../style/lemonPie.scss';

export default function LemonPie(props){

  const [camPosIndex, setcamPosIndex ] = useState(0);
  const [rotationValue, setRotationValue] = useState(0.01)
  const [cameraState, setCameraState ] = useState();
  const [objPostion, setObjPosition] = useState(6.8)
  const [boleanText, setBoleanText] = useState(false)
  const [rendererState, setRendererState] = useState()
  const bolean = useRef()
  const [objetState, setObjetState] = useState();
  const [spline, setSpline] = useState();

  let WIDTH = 400
  let HEIGHT = 334
  let colors = {
    blanc : 0xFFFFFF,
    grisClair : 0x5b5b5b,
    gris : 0xb7b7b7,
    backgroundGris : 0x050505,
    rouge: 0xfc0000,
    orange: 0xFFB534
  }

  let scene = new THREE.Scene();
  let camera3D = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 10000 );

  useEffect(()=>{
    let renderer = new THREE.WebGLRenderer({ alpha : true, antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true; //Autorise les ombres dans le renderer
    renderer.shadowMap.autoUpdate = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap //PCFShadowMap    //PCFSoftShadowMap  //VSMShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.CineonToneMapping //Uncharted2ToneMapping //CineonToneMapping //ACESFilmicToneMapping
    renderer.gammaFactor = 2.2;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    document.querySelector('#obj3D').appendChild( renderer.domElement );

    initTreeJs(scene,camera3D,renderer).then((res)=>{
      setSpline(res.spline)
      setCameraState(res.camera)
      setObjetState(res.object)
      setRendererState(res.renderer)
      res.controls.update()
      bolean.current = false;
      animate(renderer, res.object)
      window.addEventListener('resize',  () => handleWindowResize(renderer, res.camera))
    });
  },[]);

  useEffect(() => {
    if (!cameraState || !spline) return

    let camPos = spline.getPoint(camPosIndex / 10000)

    cameraState.position.x = camPos.x;
    cameraState.position.z = camPos.z;
    cameraState.position.y = camPos.y;
    cameraState.lookAt(0, 0, 0);
  }, [camPosIndex]);

  async function initTreeJs(scene,camera,renderer){

    const manager = new THREE.LoadingManager();
    let gltfLoader = new GLTFLoader(manager);

    let promise = new Promise((resolve, reject) => {

      //ajoute un background de couleur à la scène
      // scene.background = new THREE.Color( colors.backgroundGris )

      //FUNCTION QUI PRENDS 4 PARAMETRES
      gltfLoader.load(
        // 1 resource URL
        process.env.PUBLIC_URL+"/lemonPie/scene.gltf",

        // 2 called when the resource is loaded
        function ( gltf ) {

          //**** FOR WRL ***//
          const object = gltf.scene;
          object.scale.set(0.039,0.039,0.039)
          object.rotation.y = 4.5
          object.position.set(0,2,0)
          object.receiveShadow = true;
          object.castShadow = true;
          scene.add(object)

          //**** FOR OBJ ***//
          // const object = gltf.scene;
          // object.scale.set(0.029,0.029,0.029)
          // object.position.set(0,2,0)
          // object.receiveShadow = true;
          // object.castShadow = true;
          // scene.add(object)

          gltf.scene.traverse( function ( child ) {

            //Autorise le GLTFObject de recevoir et d'émettre des ombres.
            //Si tu le mets sur l'objet global de gltf.scene ça ne marche pas ! tu dois enabled les childs aussi.
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
          } );

          //*** AJOUTE UN SOL ***//
          let planeGeometry = new THREE.PlaneBufferGeometry( 7, 7, 32, 32 );
          let planeMaterial = new THREE.MeshStandardMaterial( { color: colors.orange } )
          planeMaterial.color.convertSRGBToLinear();
          planeMaterial.needsUpdate = true
          let plane = new THREE.Mesh( planeGeometry, planeMaterial );
          plane.receiveShadow = true;
          plane.rotation.x = - Math.PI * 0.5
          plane.position.set(0,-0.8,0)
          scene.add( plane );

          // const box = new THREE.Box3().setFromObject(object);
          // const size = box.getSize(new THREE.Vector3()).length();

          //*** AJOUTE UNE BOX SIMPLE BLANCHE ***//
          let geometry = new THREE.BoxBufferGeometry();
          let material = new THREE.MeshPhongMaterial( { color: colors.blanc } );
          material.color.convertSRGBToLinear();
          material.needsUpdate = true
          let cube = new THREE.Mesh( geometry, material );
          cube.position.set(-1,1.5,1)
          cube.castShadow = true;
          cube.receiveShadow = true;
          //scene.add( cube );

          // **** LIGHTS *** //
          let light = new THREE.AmbientLight( colors.blanc, 2 );
          scene.add( light );

          //jaune : 0xffaa00

          let directionalLight2 = new THREE.DirectionalLight( colors.blanc, 3 );
          directionalLight2.position.set(-4, 3, 3)
          directionalLight2.castShadow = true;
          directionalLight2.shadow.camera.near = 0.5;
          directionalLight2.shadow.camera.far = 500;
          directionalLight2.shadow.mapSize.width = 1000; // default is 512
          directionalLight2.shadow.mapSize.height = 1000;
          directionalLight2.shadow.radius = 8;
          directionalLight2.shadow.bias = -0.001
          // directionalLight2.shadow.camera.left = -500;
          // directionalLight2.shadow.camera.right = 500;
          // directionalLight2.shadow.camera.top = 500;
          // directionalLight2.shadow.camera.bottom = -500;
          scene.add( directionalLight2 );
              let directionallightHelper2 = new THREE.DirectionalLightHelper( directionalLight2 );
              //scene.add(directionallightHelper2)

          let directionalLight3 = new THREE.DirectionalLight( colors.blanc, 1 );
          directionalLight3.position.set(4,3,4)
          directionalLight3.castShadow = true;
          directionalLight3.shadow.camera.near = 0.5;
          directionalLight3.shadow.camera.far = 500;
          directionalLight3.shadow.mapSize.width = 1000; // default is 512
          directionalLight3.shadow.mapSize.height = 1000;
          directionalLight3.shadow.radius = 8;
          directionalLight3.shadow.bias = -0.001
          scene.add( directionalLight3 );
              let directionallightHelper3 = new THREE.DirectionalLightHelper( directionalLight3 );
              //scene.add(directionallightHelper3)

          let directionalLight4 = new THREE.DirectionalLight( colors.blanc, 4 );
          directionalLight4.position.set(2,2,-2)
          directionalLight4.castShadow = true;
          // directionalLight4.shadow.camera.near = 0.5;
          // directionalLight4.shadow.camera.far = 500;
          // directionalLight4.shadow.mapSize.width = 1000; // default is 512
          // directionalLight4.shadow.mapSize.height = 1000;
          // directionalLight4.shadow.radius = 8;
          // directionalLight4.shadow.bias = -0.001
          scene.add( directionalLight4 );
              let directionallightHelper4 = new THREE.DirectionalLightHelper( directionalLight4 );
              //scene.add(directionallightHelper4)
          
          
          let sphere = new THREE.SphereGeometry( 0.5, 16, 8 )

          let light4 = new THREE.PointLight( colors.blanc, 0.2, 0 );
            //light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
          light4.position.set(-4, 0, 3)
          //light4.castShadow = true;
          //scene.add( light4 );

          // let spotLight1 = new THREE.SpotLight( 0xFFFFFF, 1.7, 59, 0.22, 1, 2 )
          // spotLight1.castShadow = true;
          // spotLight1.position.set( 10, 10, 10 );
          // spotLight1.shadow.mapSize.width = 1024;
          // spotLight1.shadow.mapSize.height = 1024;
          // spotLight1.shadow.camera.near = 500;
          // spotLight1.shadow.camera.far = 4000;
          // spotLight1.shadow.camera.fov = 30;
          // scene.add(spotLight1)

          // let pointlight1 = new THREE.PointLight( 0xff0000, 1, 100 );
          // pointlight1.position.set( 3, 2, 0 );
          // pointlight1.castShadow = true
          // scene.add( pointlight1 );

          // let spotLight1 = new THREE.SpotLight(0xff0000, 0.2, 200, 0.15, 1 , 2)
          // spotLight1.castShadow = true;
          // spotLight1.position.set(2,198,0)
          // scene.add ( spotLight1 )

          // let spotLight1Helper = new THREE.SpotLightHelper( spotLight1 )
          // scene.add ( spotLight1Helper)

          // let lightHelper2 = new THREE.SpotLightHelper( spotLight1 );
          // scene.add(lightHelper2)
          // var pointLightHelper1 = new THREE.PointLightHelper( pointlight1, 1 );
          // scene.add( pointLightHelper1 );

          // *** SPLINE CAMERA *** //
            const splinePoints =  [
              new THREE.Vector3( -2, 4, 5 ),
              new THREE.Vector3( 1, 1.6, 0 ),
              new THREE.Vector3( 4, 1, 0 ),
              new THREE.Vector3( 0, 0, -5 ),
              new THREE.Vector3( -3, 0, -3 ),
            ] 
            //** Create a closed wavey loop **//
            let spline = new THREE.CatmullRomCurve3(splinePoints, false, "chordal");
            // spline.closed = true;

            // let points = spline.getPoints( 5 );

            // let geometry2 = new THREE.BufferGeometry().setFromPoints( points );
            // let material2 = new THREE.LineBasicMaterial( { color : 0xff0000, opcity : 0, transparent: true } );

            // // Create the final curve mesh to add to the scene
            // let curveObject = new THREE.Line( geometry2, material2 );
            // scene.add(curveObject)

            // // visualize spaced points 
            // const sphereGeomtry = new THREE.SphereBufferGeometry( 0.1 );
            // const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

            // for ( var point of points ){
            //   const helper = new THREE.Mesh( sphereGeomtry, sphereMaterial );
            //   helper.position.copy( point );
            //   scene.add( helper );
            // }


          // **** CAMERA SETTINGS *** //
          camera.position.x = 0;
          camera.position.y = 3;
          camera.position.z = 7;

          camera3D.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
          camera.updateMatrixWorld();

          // *** HELPERS *** //
          // let sizeGrid = 20;
          // let divisions = 20;
          // let gridHelper = new THREE.GridHelper( sizeGrid, divisions );
          // scene.add( gridHelper );
          // scene.add( new THREE.AxesHelper() );

          // ** ALLOW SCROLL FOR ZOOM IN OUT **//
          let controls = new OrbitControls( camera, renderer.domElement );
          controls.update();
          controls.maxDistance = 8 //premet de controler la disatance max entre le point 0 et le z max.  Ici z max vaut 8
          controls.minDistance = 3.5 // permet de controler la distance mininal a partir de z.

          renderer.render( scene, camera );

          resolve({obj : object, camera, spline, controls, object, renderer})

        },
        // 3 called while loading is progressing
        function ( xhr ) {
          // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // 4 called when loading has errors
        function ( error ) {
          console.log(error);
          console.log( 'An error happened' );
        }
      );
    })
    let value = await promise
    return value
  }

  //*** PERMET LE RENDU ET LES ANIMATIONS ***//
  function animate(renderer, object) {
    // console.log("Function animate")
    requestAnimationFrame(() => animate(renderer, object));

    renderer.render( scene, camera3D );

    // setRotationValue(rotationValue + 0.001)

    //console.log(bolean)
    if (bolean.current === false) {
      // object.rotation.y = objPostion
    } else {
    object.rotation.y += rotationValue
    setObjPosition(object.rotation.y)
    }
    //console.log(object.rotation.y)
  };

  const handleWindowResize = (renderer, camera) =>{      
    let width = document.getElementById('obj3D').offsetWidth
    let height = document.getElementById('obj3D').offsetHeight

    renderer.setSize(width, height)
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
  }

  //*** INCREMENTE CAMPOSINDEX AVEC LE SCROLL ***//
  const handleMouseWheel = (e) =>{

    let y = camPosIndex + e.deltaY

    if (y >= 0 && y <= 10000){
      setcamPosIndex(camPosIndex + e.deltaY)
    }
  };

  return (
      <>
      <div onWheel={(e) => handleMouseWheel(e)}>
        <div id="obj3D"></div>
        <button id="buttonRotation" onClick={() => {bolean.current = !bolean.current; setBoleanText(!boleanText)}}>{boleanText ? "Stop rotation" : "Rotation"}</button>
      </div>
      </>
  )
};

//onWheel={(e) => handleMouseWheel(e)}
