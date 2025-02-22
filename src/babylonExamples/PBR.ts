import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, CreateSphere, CubeTexture, PBRMaterial, Texture } from "@babylonjs/core"


export class PBR {

  scene: Scene;
  engine: Engine;

  constructor(private canvas:HTMLCanvasElement){
    this.engine = new Engine(this.canvas, true)
    this.scene = this.CreateScene();


    this.engine.runRenderLoop(()=> {
      this.scene.render()
    })

  }

  CreateScene():Scene{
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0,1,-5), this.scene);
    camera.attachControl()
    camera.speed = 0.25

    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene)
    hemiLight.intensity = 0;

    const envTex = CubeTexture.CreateFromPrefilteredData("./environment/sky.env", scene)
    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)

    const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene)
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1},this.scene)
    ball.position = new Vector3(0,1,0);
    
    ground.material = this.CreateAsphalt()
    ball.material = this.CreateMagic()

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

  CreateMagic(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    return pbr
  }
}