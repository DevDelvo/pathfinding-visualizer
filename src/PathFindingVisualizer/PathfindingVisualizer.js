import React, { Component } from 'react';
import Node from './Node/Node';
// import { createNode, createBoard, getNewGridWithWallToggled } from './createBoardHelper'

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            startNode: {
                row: 10, col: 15
            },
            endNode: {
                row: 10, col: 35
            },
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const nodes = this.createBoard();
        this.setState({ nodes });
    }

    handleMouseDown(row, col) {
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false })
    }

    createNode = (col, row) => {
        const { startNode, endNode } = this.state;
        return {
            col,
            row,
            start: row === startNode.row && col === startNode.col,
            end: row === endNode.row && col === endNode.col,
            distance: Infinity,
            isVisited: false,
            previousNode: null,
        };
    }

    createBoard = () => {
        const nodes = [];
        for (let row = 0; row < 20; row++) {
            const currRow = [];
            for (let col = 0; col < 40; col++) {
                const newNode = this.createNode(col, row);
                currRow.push(newNode);
            }
            nodes.push(currRow);
        }
        return nodes;
    }

    getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    render() {
        const { nodes } = this.state;
        console.log(nodes)
        return (
            <div className="grid">
                {
                    nodes.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {
                                    row.map((node, nodeIdx) => {
                                        const { start, end } = node;
                                        return (
                                            <Node key={nodeIdx}
                                                start={start}
                                                end={end}
                                            >
                                            </Node>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
