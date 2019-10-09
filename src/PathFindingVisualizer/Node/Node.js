import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const { start, end } = this.props;
        const nodeCondition = start ? 'node-start' : end ? 'node-finish' : '';

        return (
            <div className={`node ${nodeCondition}`}>
            </div>
        )
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0
}