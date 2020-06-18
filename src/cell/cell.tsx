import './cell.sass';

import React from 'react';
import { connect } from 'react-redux';
import { Action, State } from '../store';

interface propsSettings {
    userFigure: string;
    indexRow: number;
    indexColumn: number;
    dispatch?: React.Dispatch<Action>;
    isShow: boolean;
    whome: string;
}


function mapStateToProps(state: State, ownProps: propsSettings): any {
    if(state.whome === 'none') return {};

    if(state.whome === 'user click' && (state.currentUserCell[0] === ownProps.indexRow && state.currentUserCell[1] === ownProps.indexColumn)) {
        ownProps.whome = 'user';
        return {
            ...ownProps       
        };
    } else if(state.whome === 'computer click' && (state.currentComputerCell[0] === ownProps.indexRow && state.currentComputerCell[1] === ownProps.indexColumn)) {
        ownProps.isShow = true;
        ownProps.whome = 'computer';
        return {
            ...ownProps
        };
    }

    
    return {...ownProps};
}

class Cell extends React.Component<propsSettings> {

    clickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
        if(!this.props.isShow) this.props.dispatch({type: 'User Click', payload: [this.props.indexRow, this.props.indexColumn]});
    }

    componentDidUpdate(): void {
        if(this.props.whome !== 'computer' && this.props.whome !== 'none') {
            this.props.dispatch({type: 'Computer Que', payload: [this.props.indexRow, this.props.indexColumn]})
        }
    }

    render() {
        return(
            <div className="figure" onClick={this.clickHandler}>
                {
                    (this.props.whome === 'user')? <img className="figure__image" src={(this.props.userFigure === 'circle')? './imgs/circle.svg' : './imgs/cross.svg'} alt="image"/> : (this.props.isShow && this.props.whome === 'computer')? <img className="figure__image" src={(this.props.userFigure === 'circle')? './imgs/cross.svg' : './imgs/circle.svg'} alt="image"/> : null
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Cell);