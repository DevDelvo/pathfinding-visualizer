import React, { Component } from 'react';
import Node from './Node/Node';

import './PathfindingVisualizer.css'

export default class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        const nodes = this.renderNodes();
        this.setState({ nodes });
    }

    renderNodes = () => {
        const nodes = [];
        for (let row = 0; row < 20; row++) {
            const currRow = [];
            for (let col = 0; col < 50; col++) {
                const currentNode = {
                    row,
                    col,
                    start: row === 10 && col === 5,
                    end: row === 10 && col === 45,
                };
                currRow.push(currentNode);
            }
            nodes.push(currRow);
        }
        return nodes;
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