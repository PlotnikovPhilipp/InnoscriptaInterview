import './brain.sass';

import React from 'react';
import { connect } from 'react-redux';

import Cell from '../cell/cell';
import { Action, State } from '../store';
import { textSpanIntersectsWithTextSpan, idText } from 'typescript';

interface propsSettings {
    userFigure: string;
    dispatch?: React.Dispatch<Action>;
    column?: number;
    row?: number;
    isComplete?: boolean;
}

/* 

    Win Combinations for row
    00 01 02
    10 11 12
    20 21 22

    Win Combination for column
    00 10 20
    01 11 21
    02 12 22

    Rest win cimbination
    00 11 22
    20 11 02

*/

/* 

    gameMap - is list of user and computer steps
    userSteps - is list of user steps

*/
function mapStateToProps(state: State, ownProps: propsSettings): any {
    if(state.isComplete && state.whome === 'computer que') {
        ownProps.userFigure = prompt('For what figure do you want play circle or cross?', '');
        ownProps.row = null;
        ownProps.column = null;
        return {...ownProps, isComplete: true};
    }
    if(state.whome !== 'computer que') return {...ownProps};

    let gameMap: Array<Array<number>> = state.allSteps;

    // Try to select the cell that isn't in win combination that has already had two equivalent number(1, 2)
    if(state.userSteps.length > 0) {
        let flag: boolean = true;
        let rowIndex: number = null;
        let columnIndex: number = null;
        let counter: number = 0;
        let whome: number = 0; 
    
        
        Metka: for(let i: number = 0; i < gameMap.length; i++) {
            for(let j: number = 0; j < gameMap[i].length; j++) {
                if(gameMap[i][j] === 0) {
                    rowIndex = i;
                    columnIndex = j;
                    let winCombinations: Array<Array<{row: number, column: number}>> = [];

                    // Find the selected cell in win combinations
                    for(let i: number = 0; i < state.winCombinations.length; i++) {
                        for(let j: number = 0; j < state.winCombinations[i].length; j++) {
                            if(state.winCombinations[i][j].row === rowIndex && state.winCombinations[i][j].column === columnIndex) {
                                winCombinations.push(state.winCombinations[i]);
                            }
                        }
                    }

                    // Find the combination from two equivalent elements(2 or 1)
                    for(let i: number = 0; i < winCombinations.length; i++) {
                        for(let j: number = 0; j < winCombinations[i].length; j++) {
                            if(whome === 0) {
                                whome = gameMap[winCombinations[i][j].row][winCombinations[i][j].column];
                                if(whome === 0) continue;   
                            }

                            if(gameMap[winCombinations[i][j].row][winCombinations[i][j].column] === whome) {
                                counter++;
                            }

                            // If we understand that the selected cell is in the win cobination where there is two equivalent elements(2 or 1) we select other cell
                            if(counter === 2) {
                                continue Metka;
                            }
                        }
                        

                        // If we understand that the selected cell is in the win cobination where there isn't two equivalent elements(2 or 1) we select this cell
                        if(counter !== 2) break Metka;

                        counter = 0;
                    }                    
                }
            } 
        }

        ownProps.row = rowIndex;
        ownProps.column = columnIndex;
        return {...ownProps}
        
    } 
}

class Brain extends React.Component<propsSettings> {

    componentDidUpdate(): void {
        if(this.props.row !== null && !this.props.isComplete) {
            this.props.dispatch({type: 'Computer Click', payload: [this.props.row, this.props.column]});
        } else {
            this.props.dispatch({type: 'Reset', payload: [this.props.row, this.props.column]});
        }
    }

     render() {
        return(
            <main role="main" className="brain">
           
                {/* First row */}
                <div className="brain__arrow brain__first-arrow">
                    <Cell isShow={false} whome="none" indexRow={0} indexColumn={0} userFigure={this.props.userFigure}></Cell>
                    <Cell isShow={false} whome="none" indexRow={0} indexColumn={1} userFigure={this.props.userFigure}></Cell>
                    <Cell isShow={false} whome="none" indexRow={0} indexColumn={2} userFigure={this.props.userFigure}></Cell>
                </div>

                {/* Second row */}
                <div className="brain__arrow brain__second-arrow">
                    <Cell isShow={false} whome="none" indexRow={1} indexColumn={0} userFigure={this.props.userFigure}></Cell>
                    <Cell isShow={false} whome="none" indexRow={1} indexColumn={1} userFigure={this.props.userFigure}></Cell>
                    <Cell isShow={false} whome="none" indexRow={1} indexColumn={2} userFigure={this.props.userFigure}></Cell>
                </div>

                {/* Third row */}
                <div className="brain__arrow brain__third-arrow">
                    <Cell isShow={false} whome="none" indexRow={2} indexColumn={0} userFigure={this.props.userFigure}></Cell>
                    <Cell isShow={false} whome="none" indexRow={2} indexColumn={1} userFigure={this.props.userFigure}></Cell>
                    <Cell isShow={false} whome="none" indexRow={2} indexColumn={2} userFigure={this.props.userFigure}></Cell>
                </div>
                
            </main>
        )
    }
}

export default connect(mapStateToProps)(Brain)
