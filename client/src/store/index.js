import {proxy} from 'valtio'

const state = proxy({
    intro:true,
    color: 'coral',
    isLogoTexture: true,
    isPatternTexture: false,
    logoDecal:'./threejs.png',
    patternDecal:'./threejs.png'

})

export default state