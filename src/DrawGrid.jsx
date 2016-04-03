import React, { Component } from 'react';

import GOL from './GOL.js';


const id = 'gol';

const style = {
    border: "1px solid #000000"
};

const makeGrid = num => {
    let g = [];

    for (let i = 0; i < num; i++) {

        let a = [];
        for (let j = 0; j < num; j++) {
            a.push( Math.random() > 0.5 ? 1 : 0);
        }
        g.push(a);

    }

    return g;
};

export default  React.createClass({

    getDefaultProps() {
        return {
            width: 1500,
            height: 1500
        };
    },

    componentDidMount() {
        const canvas = document.getElementById(id);

        // if retina
        canvas.height = this.props.height;
        canvas.width = this.props.width;
        canvas.style.width = `${this.props.width / 2}px`;
        canvas.style.height = `${this.props.height / 2}px`;
        canvas.getContext('2d').scale(2,2);
        // end if retina

        this.canvas = canvas;

        const ctx = this.context = canvas.getContext("2d");


        // setup graphic context
        const baseScale = 3;
        const diagLen = Math.sqrt( this.props.height * this.props.height + this.props.width * this.props.width );
        let ytranslate = diagLen - this.props.height


        // vertical; centering needs to be fixed
        this.context.setTransform(baseScale * 2, 0, 0, baseScale, (this.props.width / 2), -ytranslate);
        this.context.rotate(45 * Math.PI / 180)


        // this.context.globalAlpha = 0.8;

        const gol = new GOL(20);

        gol.spawnLife(9,8);
        gol.spawnLife(9,7);
        gol.spawnLife(9,6);


        gol.spawnLife(8,9);
        gol.spawnLife(8,7);
        gol.spawnLife(7,8);
        gol.spawnLife(9,8);


        gol.spawnLife(6,4);
        gol.spawnLife(6,5);
        gol.spawnLife(6,3);

        gol.spawnLife(4,4);
        gol.spawnLife(4,5);
        gol.spawnLife(4,3);


        this.drawGrid(gol.getGrid());

        setInterval(() => {
            gol.step();
            this.drawGrid(gol.getGrid());
        }, 4 * 100);
    },

    drawGrid(grid) {
        const scaleFactor = 2;
        grid.map((row, i) => {
            row.map((cell, j) => {
                let width = this.props.width / row.length / scaleFactor;
                let height = this.props.height / grid. length / scaleFactor;

                this.context.fillStyle = getColor(cell);
                this.context.fillRect(j * width, i * height, width, height);
            });
        });

    },

    render () {
        return (
            <div>
              <canvas
                 id={id}
                 style={style}
                 />
            </div>
        );
    }
});


const getColor = cell => {
    switch(cell) {
    case 0:
        return "#E1E9D6";
    case 1:
        return "#EDCD6B";
    default:
        return "#EDCD6B";
    }
};

const drawDimond = (ctx, x, y, width, height) => {
    ctx.beginPath();
    ctx.moveTo(x, y + (height / 2));
    ctx.lineTo(x + (width / 2), y);
    ctx.lineTo(x + width, y + (height / 2));
    ctx.lineTo(x + (width / 2), y + height);
    ctx.fill();
};
