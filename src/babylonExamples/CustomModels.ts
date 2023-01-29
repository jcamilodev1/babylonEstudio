import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, CreateSphere, CubeTexture, PBRMaterial, Texture, SceneLoader } from "@babylonjs/core"
import "@babylonjs/loaders"

export class CustomModels {

  scene: Scene;
  engine: Engine;

  constructor(private canvas:HTMLCanvasElement){
    this.engine = new Engine(this.canvas, true)
    this.scene = this.CreateScene();
      // this.createBarrel()
    this.createSurvival()
    this.engine.runRenderLoop(()=> {
      this.scene.render()
    })

  }

  CreateScene():Scene{
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0,1,-8), this.scene);
    camera.attachControl()
    camera.speed = 0.25

    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene)
    hemiLight.intensity = 0;

    const envTex = CubeTexture.CreateFromPrefilteredData("./environment/sky.env", scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)
    scene.environmentIntensity = .5

    
    // ground.material = this.CreateAsphalt()

    return scene;
  }

  CreateAsphalt(): PBRMaterial{
    const pbr = new PBRMaterial('pbr', this.scene) 
    pbr.albedoTexture = new Texture("./texture/asphalt/asphalt_diffuse.jpg", this.scene)
    pbr.bumpTexture = new Texture("./texture/asphalt/asphalt_normal.jpg", this.scene)
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;
    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true
    pbr.metallicTexture = new Texture("./texture/asphalt/asphalt_ao_rough_metal.jpg", this.scene)
    
    // pbr.roughness = 1

    return pbr
  }
  async createBarrel():Promise<void>{
    // SceneLoader.ImportMesh("", "./models/", "barrel.glb" ,this.scene, ( meshes: any )=> {
    //   console.log(`output-> meshes`,meshes)
    // })
    const {meshes} = await SceneLoader.ImportMeshAsync("", "./models/", "barrel.glb" ,this.scene)
    console.log(`output->meshes`,meshes)
  }
  async createSurvival():Promise<void>{
    const models = await SceneLoader.ImportMeshAsync("", "./models/", "campfire.glb" ,this.scene)
    models.meshes[0].position = new Vector3(-3,0,0) // movemos las meshes
    console.log(`output->models`,models)
  }
}