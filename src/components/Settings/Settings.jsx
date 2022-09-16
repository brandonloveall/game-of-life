import React from "react"
import "./Settings.css"

function Settings(props){
    return(
        <div className="Settings">
            <label htmlFor="boxheight">Canvas height</label>
            <input type="range" name="boxheight" min="3" max="20" onChange={(e) => {props.setHeight(e.target.value)}}/>
            <label htmlFor="boxwidth">Canvas width</label>
            <input type="range" name="boxwidth" min="3" max="20" onChange={(e) => {props.setWidth(e.target.value)}}/>
        </div>
    )
}

export default Settings