import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    render() {
        const {
            row,
            col,
            start,
            end,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

        const nodeCondition = start ? 'node-start' : end ? 'node-finish' : isWall ? 'node-wall' : '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${nodeCondition}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp(row, col)}
            >
            </div>
        )
    }
}