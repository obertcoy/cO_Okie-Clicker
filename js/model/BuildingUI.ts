import { buildingsImages, getBuildingTypeName } from "../helper/BuildingHelper.js"
import { createUnavailableOverlay, displayStoreInfo, removeStoreInfo } from "../helper/UIHelper.js"
import { Building, BuildingImage } from "./Building.js"

export class BuildingButtonUI{

    building: Building
    image: BuildingImage
    subcontainer: HTMLElement
    name: HTMLElement
    icon: HTMLImageElement
    price: HTMLElement
    quantity: HTMLElement
    posY: number

    unavailableOverlay: HTMLElement
    redColor: string
    greenColor: string

    constructor(building, image, subcontainer, name, icon, price, quantity){
        this.building = building
        this.image = image
        this.subcontainer = subcontainer
        this.name = name
        this.icon = icon
        this.price = price
        this.quantity = quantity
        this.posY = 0


        this.unavailableOverlay = createUnavailableOverlay()
        this.unavailableOverlay.className = "unavailable"

        this.redColor = "#E6676B"
        this.greenColor = "#66ff66"

        this.subcontainer.addEventListener("mouseenter", (e) => {
            this.posY = e.clientY
            displayStoreInfo(this.building, this.posY)
        })

        this.subcontainer.addEventListener("mouseleave", (e) => {
            removeStoreInfo()
        })

    }

    show(flag: boolean){
        
        if(flag) {
            this.subcontainer.style.display = "flex"

        } else {

            this.subcontainer.style.display = "none"
        }
    }

    locked(){
        this.subcontainer.appendChild(this.unavailableOverlay)
        this.price.style.color = this.redColor
        this.name.textContent = "???"
        this.icon.src = buildingsImages[this.building.type].inactive
    }

    unavailable(){
        this.subcontainer.appendChild(this.unavailableOverlay)
        this.price.style.color = this.redColor
        this.name.textContent = getBuildingTypeName(this.building.type)
        this.icon.src = buildingsImages[this.building.type].active
        
    }

    available(){
        
        if(this.subcontainer.contains(this.unavailableOverlay)) this.subcontainer.removeChild(this.unavailableOverlay)
        this.price.style.color = this.greenColor
    }

    update(){
        this.price.textContent = this.building.getCurrentPrice().toString()
        this.quantity.textContent = this.building.quantity.toString()
    }
}