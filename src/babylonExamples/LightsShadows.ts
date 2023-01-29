import { changeColor } from "@/utils/utils";
import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
  AbstractMesh,
  GlowLayer,
  LightGizmo,
  GizmoManager,
  Light,
  Color3,
  DirectionalLight,
  PointLight,
  SpotLight,
  ShadowGenerator,
  PBRMaterial,
  Texture,
  Material
} from "@babylonjs/core";
import "@babylonjs/loaders";
export class LightsShadows {
  scene: Scene;
  engine: Engine;
  lightTubes!: AbstractMesh[];
  models!: AbstractMesh[];
  ball!: AbstractMesh;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();
    this.CreateEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -4), this.scene);
    camera.attachControl();
    camera.speed = 0.2;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "Coche1.gltf"
    );

    this.models = meshes;

    this.lightTubes = meshes.filter(
      (mesh) =>{
        return mesh.name.includes("wheel")
      }
      
    );
    console.log(`output->`,this.lightTubes)
    this.lightTubes.map(mesh => {
      mesh.material = changeColor('#a1335d')

    })
    this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, this.scene);

    this.ball.position = new Vector3(0, 1, -1);

    const glowLayer = new GlowLayer("glowLayer", this.scene);
    glowLayer.intensity = 0.75;

    this.CreateLights();
  }

  CreateLights(): void {
    // luz de ambienbte 
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    // hemiLight.diffuse = new Color3(1, 0, 0); // color de la luz
    // hemiLight.groundColor = new Color3(0, 0, 1); // color de la sombra
    // hemiLight.specular = new Color3(0, 1, 0); // color del punto focal

      // puede servir para el sol luz dirrecional
    // const directionalLight = new DirectionalLight(
    //   "directionalLight",
    //   new Vector3(0, -1, 0),
    //   this.scene
    // );

    const pointLight = new PointLight(
      "pointLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    pointLight.diffuse = new Color3(172 / 255, 246 / 255, 250 / 255);
    pointLight.intensity = 0.25;

    const pointClone = pointLight.clone("pointClone") as PointLight;

    pointLight.parent = this.lightTubes[0];
    pointClone.parent = this.lightTubes[1];

      // const spotLight = new SpotLight(
      //   "spotLight",
      //   new Vector3(0, 0.5, -3),
      //   new Vector3(0, 1, 3),
      //   Math.PI / 2,
      //   10,
      //   this.scene
      // );

      // spotLight.intensity = 100;

      // spotLight.shadowEnabled = true;
      // spotLight.shadowMinZ = 1;
      // spotLight.shadowMaxZ = 10;

      // const shadowGen = new ShadowGenerator(2048, spotLight);
    // shadowGen.useBlurCloseExponentialShadowMap = true;

    this.ball.receiveShadows = true;
    // shadowGen.addShadowCaster(this.ball); // cuanso se pone este filtro se habilitan shadowMinZ shadowMaxZ

    // this.models.map((mesh) => {
    //   if(mesh.id == "Barrel_Center"){
    //     mesh.material = changeColor('#a1335d')
    //   }
    //   mesh.receiveShadows = true;
    //   shadowGen.addShadowCaster(mesh);
    // });

    // this.CreateGizmos(spotLight);
  }

  CreateGizmos(customLight: Light): void {
    const lightGizmo = new LightGizmo();
    lightGizmo.scaleRatio = 2;
    lightGizmo.light = customLight;

    const gizmoManager = new GizmoManager(this.scene);
    gizmoManager.positionGizmoEnabled = true;
    gizmoManager.rotationGizmoEnabled = true;
    gizmoManager.usePointerToAttachGizmos = false;
    gizmoManager.attachToMesh(lightGizmo.attachedMesh);
  }
}