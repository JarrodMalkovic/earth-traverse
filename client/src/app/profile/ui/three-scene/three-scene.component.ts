import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core'
import * as THREE from 'three';
import { OrbitControls, GLTFLoader } from 'three-stdlib';

@Component({
  selector: 'app-three-scene',
  template: `
  <div class="mt-6 w-[325px] h-[450px]">

  <div class="w-full h-full" #rendererContainer></div>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeSceneComponent {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  loader!: GLTFLoader;
  mixer!: THREE.AnimationMixer;
  clock = new THREE.Clock();
  modelURL = '/assets/Kimono_Female.gltf'; // Your model path here

  ngOnInit() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    //this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0); // the second param is the alpha (transparency)

    this.loader = new GLTFLoader();
  }

  ngAfterViewInit() {
    // Get the width and height of the container
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    // Set the renderer size to the container size
    this.renderer.setSize(width, height);


    // Cut off the top 100px
    const d = 1; // distance from camera to viewport
    const adjustedHeight = height - 200; // adjust the height by removing 100px from top
    const verticalFov = 2 * Math.atan((adjustedHeight / 2) / d) * (180 / Math.PI); // calculate vertical FOV
    console.log(verticalFov, height)
    // Set up the camera with the correct aspect ratio
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1);
    this.camera.position.z = 1.5;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.camera.setViewOffset(width, height, 0, 50, width, height);

    const pointLight = new THREE.PointLight(0xffffff, 1); // white light
    pointLight.position.set(0, 0, 1); // position the light relative to the camera
    this.camera.add(pointLight); // this attaches the light to the camera
    //this.camera.lookAt(1000, -100, 100); // make the camera look downward

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 2, 0); // make the camera look downward
    this.controls.minPolarAngle = Math.PI / 2; // radians
    this.controls.maxPolarAngle = Math.PI / 2; // radians
    this.controls.enableZoom = false; // disable zooming
    this.controls.enablePan = false; // disable panning (right-click dragging)

    this.scene.add(this.camera);

    this.rendererContainer.nativeElement.appendChild(this.renderer?.domElement);
    this.animate();

    this.loader.load(this.modelURL, (gltf) => {
      this.scene?.add(gltf.scene);

      // Get animations from the loaded model
      const animations = gltf.animations;
      console.log(animations);
      if (animations && animations.length) {
        // Create an AnimationMixer instance
        this.mixer = new THREE.AnimationMixer(gltf.scene);
        const idleAnimation = THREE.AnimationClip.findByName(animations, 'Idle');
        console.log(idleAnimation);
        this.mixer.clipAction(idleAnimation).play();
      }

      // // Create an ambient light which is uniform in all directions.
      // const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
      // this.scene.add(ambientLight);

      // // Also add a point light for directional shadows
      // const pointLight = new THREE.PointLight(0xffffff, 1); // white light
      // pointLight.position.set(50, 50, 50); // position the light far away
      // this.scene.add(pointLight);

    }, undefined, (error) => {
      console.error(error);
    });
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    // Get the new width and height of the container
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    // Update the renderer size
    this.renderer.setSize(width, height);

    // Update the camera aspect ratio
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate() {

    // Before rendering, update the mixer
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }

    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer?.render(this.scene!, this.camera!);
  }
}
