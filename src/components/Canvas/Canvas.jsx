import React from "react"
import "./Canvas.css"
import { useRef, useEffect, useState } from "react"

function Canvas(props){
    
    const currentSquareCoords = useRef([])
    const [r, rerender] = useState(0)
    const [c, crender] = useState(0)

    useEffect(() => {
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, props.width*40, props.height*40)

        currentSquareCoords.current.forEach((e) => {
            addSquare(e[0], e[1])
        })
    }, [r])

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

        currentSquareCoords.current = []

    }, [props.width, props.height, c])



    function addSquare(x, y){
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        ctx.fillStyle = "white"
        ctx.fillRect(x*40 - 39, y*40 - 39, 38, 38)
    }

    function removeSquare(x, y){
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        ctx.fillStyle = "gray"
        ctx.fillRect(x*40 - 39, y*40 - 39, 38, 38)
    }

    function editSquares(e){
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        const rect = c.getBoundingClientRect()
        const canvasX = e.clientX - rect.left
        const canvasY = e.clientY - rect.top
        const squareX = Math.ceil(canvasX / 40)
        const squareY = Math.ceil(canvasY / 40)

        let color = ctx.getImageData(squareX*40 - 3, squareY*40 - 3, 1, 1).data
        
        if(color[0] === 128){
            addSquare(squareX, squareY)
            currentSquareCoords.current.push([squareX, squareY])
        }
        else if(color[0] === 255){
            removeSquare(squareX, squareY)
            currentSquareCoords.current.splice(currentSquareCoords.current.findIndex(e => {
                return e[0] === squareX && e[1] === squareY
            }), 1)
        }
    }

    function step(){
        let createArr = []
        let destroyArr = []
        let c = document.getElementById("canvas")
        let ctx = c.getContext("2d")
        let createTally = {}
        let destroyTally = {}

        //CREATE 
        for(let i = 0; i < currentSquareCoords.current.length; i++){
            //TOP LEFT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 43, currentSquareCoords.current[i][1]*40 - 43, 1, 1).data[0] === 128){
                               createArr.push([currentSquareCoords.current[i][0] - 1, currentSquareCoords.current[i][1] - 1])
            }

            //TOP MIDDLE
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 3, currentSquareCoords.current[i][1]*40 - 43, 1, 1).data[0] === 128){
                
                createArr.push([currentSquareCoords.current[i][0], currentSquareCoords.current[i][1] - 1])
            }

            //TOP RIGHT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 + 37, currentSquareCoords.current[i][1]*40 - 43, 1, 1).data[0] === 128){
                createArr.push([currentSquareCoords.current[i][0] + 1, currentSquareCoords.current[i][1] - 1])
            }

            //MIDDLE LEFT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 43, currentSquareCoords.current[i][1]*40 - 3, 1, 1).data[0] === 128){
                createArr.push([currentSquareCoords.current[i][0] - 1, currentSquareCoords.current[i][1]])
            }

            //MIDDLE RIGHT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 + 37, currentSquareCoords.current[i][1]*40 - 3, 1, 1).data[0] === 128){
                createArr.push([currentSquareCoords.current[i][0] + 1, currentSquareCoords.current[i][1]])
            }

            //BOTTOM LEFT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 43, currentSquareCoords.current[i][1]*40 + 37, 1, 1).data[0] === 128){
                createArr.push([currentSquareCoords.current[i][0] - 1, currentSquareCoords.current[i][1] + 1])
            }

            //BOTTOM MIDDLE
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 3, currentSquareCoords.current[i][1]*40 + 37, 1, 1).data[0] === 128){
                createArr.push([currentSquareCoords.current[i][0], currentSquareCoords.current[i][1] + 1])
            }

            //BOTTOM RIGHT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 + 37, currentSquareCoords.current[i][1]*40 + 37, 1, 1).data[0] === 128){
                createArr.push([currentSquareCoords.current[i][0] + 1, currentSquareCoords.current[i][1] + 1])
            }
        }

        //DESTROY
        for(let i = 0; i < currentSquareCoords.current.length; i++){
            //TOP LEFT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 43, currentSquareCoords.current[i][1]*40 - 43, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //TOP MIDDLE
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 3, currentSquareCoords.current[i][1]*40 - 43, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //TOP RIGHT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 + 37, currentSquareCoords.current[i][1]*40 - 43, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //MIDDLE LEFT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 43, currentSquareCoords.current[i][1]*40 - 3, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //MIDDLE RIGHT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 + 37, currentSquareCoords.current[i][1]*40 - 3, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //BOTTOM LEFT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 43, currentSquareCoords.current[i][1]*40 + 37, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //BOTTOM MIDDLE
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 - 3, currentSquareCoords.current[i][1]*40 + 37, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }

            //BOTTOM RIGHT
            if(ctx.getImageData(currentSquareCoords.current[i][0]*40 + 37, currentSquareCoords.current[i][1]*40 + 37, 1, 1).data[0] === 255){
                destroyArr.push(currentSquareCoords.current[i])
            }
        }

        //PUSH TO CREATE TALLY
        for(let i = 0; i < createArr.length; i++){
            createTally[`${createArr[i][0]}, ${createArr[i][1]}`] = createTally[`${createArr[i][0]}, ${createArr[i][1]}`] ? [createArr[i], createTally[`${createArr[i][0]}, ${createArr[i][1]}`][1] + 1] : [createArr[i], 1]
        }
        
        for(let i = 0; i < destroyArr.length; i++){
            destroyTally[`${destroyArr[i][0]}, ${destroyArr[i][1]}`] = destroyTally[`${destroyArr[i][0]}, ${destroyArr[i][1]}`] ? [destroyArr[i], destroyTally[`${destroyArr[i][0]}, ${destroyArr[i][1]}`][1] + 1] : [destroyArr[i], 1]
        }

        for(const count in createTally){
            if(createTally[count][1] === 3){
                currentSquareCoords.current.push(createTally[count][0])
            }
        }

        for(const count in destroyTally){
            if(destroyTally[count][1] < 2 || destroyTally[count][1] > 3){
                currentSquareCoords.current.forEach((e, i) => {
                    if(e === destroyTally[count][0]){
                        currentSquareCoords.current.splice(i, 1)
                    }
                })
            }
        }
        rerender(r === 0 ? 1 : 0)
    }

    return(
        <div className="Canvas">
            <canvas id="canvas" height={props.height * 40} width={props.width * 40} onClick={(e) => {editSquares(e);}}></canvas>
            <div className="buttonholder">
                <button onClick={() => step()}>step</button>
                <button onClick={() => {crender(c === 1 ? 0 : 1)}}>Clear grid</button>
            </div>
        </div>
    )
}

export default Canvas