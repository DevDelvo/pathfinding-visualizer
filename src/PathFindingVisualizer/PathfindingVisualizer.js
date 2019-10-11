import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstrasAlgorithm'

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            size: {
                height: 20,
                width: 40
            },
            startNode: {
                row: 5, col: 10
            },
            endNode: {
                row: 15, col: 25
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
        const { size: { height, width } } = this.state;
        const nodes = [];
        for (let row = 0; row < height; row++) {
            const currRow = [];
            for (let col = 0; col < width; col++) {
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

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === 0 || i === visitedNodesInOrder.length - 1) continue; // dont change style of start or end node
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, i * 10);
                return;
            }
            setTimeout(() => {
                const currentNode = visitedNodesInOrder[i];
                console.log('currentNode => ', currentNode)
                document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className = `node node-visited`;
            }, i * 10)
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            if (i === 0 || i === nodesInShortestPathOrder.length - 1) continue
            setTimeout(() => {
                const currentNode = nodesInShortestPathOrder[i];
                document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className = 'node node-shortest-path';
            }, i * 50)
        }
    }

    visualizeDijksta() {
        console.log('visualize')
        const { grid, startNode, endNode } = this.state
        // console.log('visualize => ', grid[startNode.row][startNode.col])
        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];
        const visitedNodesInOrder = dijkstra(grid, start, end);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(end);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    reset() {
        // RESET STATE TO DEFAULT
    }

    render() {
        const { grid } = this.state;
        const { handleMouseDown, handleMouseEnter, handleMouseUp } = this;
        // console.log(this.state)
        return (
            <div className="grid">
                <button onClick={() => this.visualizeDijksta()}>Visualize Dijkstra's Algorithm</button>
                <button onClick={() => this.reset()}>Reset</button>
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
