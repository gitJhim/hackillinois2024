const dragon = require("../assets/dragon.png")
const leafears = require("../assets/leaf-ears-helmet.png")
const firefox = require("../assets/firefox.png")

const very_sad = require("../assets/very_sad.png")
const sad = require("../assets/sad.png")
const neutral = require("../assets/neutral.png")
const happy = require("../assets/happy.png")
const very_happy = require("../assets/very_happy.png")

export const PET_IMAGES = [dragon, leafears, firefox]
export const PET_MOODS = {VERY_SAD: { text:"VERY_SAD", image: very_sad}, 
                          SAD: { text:"SAD", image: sad}, 
                          NEUTRAL: { text:"NEUTRAL", image: neutral}, 
                          HAPPY: { text:"HAPPY", image: happy}, 
                          VERY_HAPPY: { text:"VERY_HAPPY", image: very_happy}}
