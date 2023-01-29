import { Color3, PBRMaterial, Material } from '@babylonjs/core'
import '@babylonjs/loaders'

export function changeColor(color:string) {
  const mat = new PBRMaterial('mat')
  mat.metallic = 1
  mat.roughness = 0.5
  // mat.transparencyMode = Material.MATERIAL_ALPHABLEND
  mat.useAlphaFromAlbedoTexture = true
  mat.albedoColor = Color3.FromHexString(color);  
  // mat.albedoColor = Color3.FromHexString("#2ecc71");
  return mat
}
