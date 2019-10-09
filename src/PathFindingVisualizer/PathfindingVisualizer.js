import React, { Component } from 'react';
import Node from './Node/Node';
// import { createNode, createBoard, getNewGridWithWallToggled } from './createBoardHelper'

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
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
        const grid = this.createBoard();
        this.setState({ grid });
    }

    handleMouseDown = (row, col) => {
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter = (row, col) => {
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp = () => {
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
        const { grid } = this.state;
        const { handleMouseDown, handleMouseEnter, handleMouseUp } = this;
        // console.log(this.state)
        return (
            <div className="grid">
                {
                    grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {
                                    row.map((node, nodeIdx) => {
                                        const { row, col, start, end, isWall } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                row={row}
                                                col={col}
                                                start={start}
                                                end={end}
                                                isWall={isWall}
                                                onMouseDown={(row, col) => handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                                onMouseUp={() => handleMouseUp()}
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
