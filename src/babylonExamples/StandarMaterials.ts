import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, CreateSphere, StandardMaterial, Texture } from "@babylonjs/core"


export class StandarMaterials {

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
    camera.speed = 0.25;


    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene)
    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene)
    
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1},this.scene)
    ball.position = new Vector3(0,1,0);

    ground.material = this.CreateGroundMaterial()
    ball.material = this.CreateBallMaterial()




    return scene;
  }

  CreateGroundMaterial():StandardMaterial{

    const groundMat = new StandardMaterial("grounMat", this.scene)

    const uVScale = 4;
    const texArray: Texture[] = [];

    const defuseText = new Texture("./texture/coble/coble_dif.jpg", this.scene);
    groundMat.diffuseTexture = defuseText;
    texArray.push(defuseText);

    const normalText = new Texture("./texture/coble/coble_normal.jpg", this.scene);
    groundMat.bumpTexture = normalText;
    texArray.push(normalText);

    const aoText = new Texture("./texture/coble/coble_ao.jpg", this.scene)
    groundMat.ambientTexture = aoText
    texArray.push(aoText)

    const specText = new Texture("./texture/coble/coble_spec.jpg", this.scene)
    groundMat.specularTexture = specText
    texArray.push(specText)

    texArray.forEach((tex)=> {
      tex.uScale = uVScale 
      tex.vScale = uVScale
    })

    return groundMat
  }

CreateBallMaterial():StandardMaterial{
  const ballMat = new StandardMaterial("grounMat", this.scene);
  const uVScale = 1;

  const texArray: Texture[] = [];

    const defuseText = new Texture("./texture/metal/metal_diff.jpg", this.scene);
    ballMat.diffuseTexture = defuseText;
    texArray.push(defuseText);

    const normalText = new Texture("./texture/metal/metal_normal.jpg", this.scene);
    ballMat.bumpTexture = normalText;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    texArray.push(normalText);

    const aoText = new Texture("./texture/metal/metal_ao.jpg", this.scene);
    ballMat.ambientTexture = aoText;
    texArray.push(aoText);

    const specText = new Texture("./texture/metal/metal_spec.jpg", this.scene);
    ballMat.specularTexture = specText;
    ballMat.specularPower = 1
    ;
    texArray.push(specText)

    texArray.forEach((tex)=> {
      tex.uScale = uVScale 
      tex.vScale = uVScale
    })
  return ballMat
  }

}