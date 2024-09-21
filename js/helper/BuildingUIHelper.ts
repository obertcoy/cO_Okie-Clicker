import { Game } from "../game_manager.js";
import { Building } from "../model/Building.js";
import { BuildingType } from "../model/Enum.js";
import { Grandma } from "../model/Grandma.js";
import { buildings, getBuildingTypeName } from "./BuildingHelper.js";

export const lastCursorPosition = {
    bottom: 0,
    left: 0
}

export function buildingUI(building: Building){

    building.type === BuildingType.Cursor ? addCursor(Game.getCurrentUser().getBuildingCount(BuildingType.Cursor) - 1) : addBuilding(building.type, Game.getCurrentUser().getBuilding(building.type)?.quantity! - 1)   
  
}



export function addCursor(cursorCount: number){

    const cursorContainer = document.getElementById("cursor-container")!
    const cursorImg = document.createElement("img")
    cursorImg.classList.add("cursor")
    cursorImg.src = "../assets/building/cursor.png"; 
    cursorContainer?.appendChild(cursorImg)
    
    const totalCursors = 50
    const cursorWidth = 16.5
    const cursorSpacing = 0

    const position = calculateCursorPosition(cursorWidth, cursorSpacing, totalCursors, cursorCount, cursorContainer)

    cursorImg.style.left = `${position.x}px`;
    cursorImg.style.top = `${position.y}px`;
    cursorImg.style.transform = `translate(-50%, -50%) rotate(${position.angle - 90}deg)`;

    cursorContainer!.appendChild(cursorImg);

    if(cursorCount == 1){

        setInterval(() => {
            for (let i = 0; i < totalCursors; i++) {
                setTimeout(() => {
                    const cursor = cursorContainer!.children[i] as HTMLElement;
                    if (cursor) {
                        cursorClick(cursor, cursorWidth, cursorSpacing, totalCursors, i, cursorContainer);
                    }
                }, i * 500) // delay per cursor
            }
        }, 10000)
    }

}


function cursorClick(cursor, cursorWidth, cursorSpacing, totalCursors, cursorCount, cursorContainer) {
    
    const shrink = 0.75
    cursorWidth -= shrink
    const position = calculateCursorPosition(cursorWidth, cursorSpacing, totalCursors, cursorCount, cursorContainer)

    cursor.style.left = `${position.x}px`;
    cursor.style.top = `${position.y}px`;

    setTimeout(() => {

        cursorWidth += shrink
        const position = calculateCursorPosition(cursorWidth, cursorSpacing, totalCursors, cursorCount, cursorContainer)
        cursor.style.left = `${position.x}px`
        cursor.style.top = `${position.y}px`
    }, 250)
}

function calculateCursorPosition(cursorWidth: number, cursorSpacing: number, totalCursors: number, cursorCount: number, cursorContainer: HTMLElement){
    const circumference = totalCursors * (cursorWidth + cursorSpacing);
    const radius = circumference / (2 * Math.PI);

    const angleStep = 360 / totalCursors;
    const angle = 90 - (angleStep * cursorCount);

    const x = radius * Math.cos(angle * Math.PI / 180) + (cursorContainer.offsetWidth / 2) - window.scrollX / 2
    const y = radius * Math.sin(angle * Math.PI / 180) + (cursorContainer.offsetHeight / 2) - window.scrollY / 2
    
    const position = {
        x: x,
        y: y,
        angle: angle
    }
    
    return position
}

export function addBuilding(type: BuildingType, buildingCount: number){

    let subcontainer = document.getElementById(`${getBuildingTypeName(type).toLowerCase()}-container`) as HTMLElement

    if(subcontainer.style.display == "none") {
        subcontainer.style.display = "flex"
        let border = document.getElementById(`${getBuildingTypeName(type).toLowerCase()}-border`) as HTMLElement
        border.style.display = "flex"
    }

    const element = createBuildingElement(type, buildingCount!)
    subcontainer.appendChild(element)
}



function createBuildingElement(type: BuildingType, buildingCount: number){

    const position = {
        x: 5,
        y: 20
    }

    const offset = {
        grandmaX: 50,
        grandmaY: 20,
        x: 100,
        y: 20
    }

    const rowIdx = Math.floor(buildingCount / 3) 
    const colIdx = buildingCount % 3
    const element = document.createElement("img")
    
    element.classList.add("building-element")

    element.src = `../assets/building/${getBuildingTypeName(type).toLowerCase()}.png`
    
    if(type === BuildingType.Grandma) {

        const newPos = {
            x: position.x + (offset.grandmaY * colIdx) + (offset.grandmaX * rowIdx),
            y: position.y + (offset.grandmaY * colIdx)
        }
        element.style.top = newPos.y + "px"
        element.style.left = newPos.x + "px"

        element.dataset.id = "grandma-" + buildingCount
        const grandma: Grandma = Game.getCurrentUser().getGrandma(buildingCount)        
        element.src = `../assets/building/${grandma.src}`

        element.classList.add("grandma")
        const grandmaInfo = document.getElementById("grandma-info")!
        
        element.addEventListener("mouseover", () => {
            grandmaInfo.style.display = "flex"
            grandmaInfo.style.top = 5 + "px"
            grandmaInfo.style.left = newPos.x + "px"

            const id = parseInt(element.dataset.id?.split("-")[1]!)
            const selectedGrandma : Grandma = Game.getCurrentUser().getGrandma(id)

            grandmaInfo.textContent = `${selectedGrandma.name}, age ${selectedGrandma.age}`

        })

        element.addEventListener("mouseleave", () => {
            
            grandmaInfo.style.display = "none"
        })

        const zIdx = 1000 - buildingCount
        element.style.zIndex = zIdx.toString()

    } else {

        const newPos = {
            x: position.x + (offset.y * colIdx) + (offset.x * rowIdx),
            y: position.y + (offset.y * colIdx)
        }
        element.style.top = newPos.y + "px"
        element.style.left = newPos.x + "px"

        const zIdx = 5 + buildingCount
        element.style.zIndex = zIdx.toString()

    }

    return element
}


