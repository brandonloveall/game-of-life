import React from "react"
import "./Canvas.css"
import { useRef, useEffect } from "react"

function Canvas(props){
    
    const coords = useRef(new Array())

    useEffect(() => {
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, props.width*40, props.height*40)

        for(let i = 0; i <= props.width * 40; i+= 40){
            ctx.moveTo(i, 0)
            ctx.lineTo(i, props.height*40)
            ctx.stroke()
        }

        for(let i = 0; i <= props.height * 40; i += 40){
            ctx.moveTo(0, i)
            ctx.lineTo(props.width*40, i)
            ctx.stroke()
        }

        coords.current.map((e) => {
            addSquare(e[0], e[1])
        })

    }, [props.width, props.height])

    function addSquare(x, y){
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        ctx.fillStyle = "white"
        ctx.fillRect(x*40 - 39, y*40 - 39, 38, 38)
        console.log(coords)
    }

    function removeSquare(x, y){
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        ctx.fillStyle = "gray"
        ctx.fillRect(x*40 - 39, y*40 - 39, 38, 38)
        console.log(coords)
    }

    function editSquares(e){
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        const rect = c.getBoundingClientRect()
        const canvasX = e.clientX - rect.left
        const canvasY = e.clientY - rect.top
        const squareX = Math.ceil(canvasX / 40)
        const squareY = Math.ceil(canvasY / 40)

        console.log(squareX + " " + squareY)
        let color = ctx.getImageData(squareX*40 - 3, squareY*40 - 3, 1, 1).data
        console.log(color)
        
        if(color[0] === 128){
            addSquare(squareX, squareY)
        coords.current.push([squareX, squareY])
        }
        else if(color[0] === 255){
            removeSquare(squareX, squareY)
            coords.current.splice(coords.current.findIndex(e => {
                return e[0] === squareX && e[1] === squareY
            }), 1)
        }
    }

    return(
        <div className="Canvas">
            <canvas id="canvas" height={props.height * 40} width={props.width * 40} onClick={(e) => {editSquares(e)}}></canvas>
        </div>
    )
}

export default Canvas