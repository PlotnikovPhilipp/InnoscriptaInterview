import { createStore, Store } from 'redux';

export interface State {
    allSteps: Array<Array<number>>;
    currentUserCell: Array<number>;
    currentComputerCell: Array<number>;
    whome: string;
    userSteps: Array<{row: number; column: number}>;
    winCombinations: Array<Array<{row: number; column: number}>>;
    isComplete: boolean;
}

export interface Action {
    type: string;
    payload: Array<number>;
}

function checkGameState(state: State, allSteps: Array<Array<number>>, winCombination: Array<Array<{row: number; column: number}>>, whome: number): void {
    let flag: boolean;
    let isNull: boolean = false;
    for(let i: number = 0; i < winCombination.length; i++) {
        flag = true;
        for(let j: number = 0; j < winCombination[i].length; j++) {
            if(allSteps[winCombination[i][j].row][winCombination[i][j].column] === 0) isNull = true;
            if(allSteps[winCombination[i][j].row][winCombination[i][j].column] !== whome) {
                flag = false;
                break;
            }
        }
        if(flag) break;
    }

    if(flag && whome === 1) {
        alert('You are win');
        state.isComplete = true;
    } else if(flag && whome === 2) {
        alert('You are loose');
        state.isComplete = true;
    } else if(!isNull) {
        alert('There isn\'t a winner');
        state.isComplete = true;
    }
}

// 1 - user click
// 2 - computer click
const reducer = (state: State = null, action: Action): State => {
    if(!state) return {
        allSteps: [
            [0, 0, 0], 
            [0, 0, 0],
            [0, 0, 0]
        ],
        currentUserCell: [-1, -1],
        currentComputerCell: [-1, -1],
        userSteps: [],
        isComplete: false,
        whome: null,
        winCombinations: [
            [{row: 0, column: 0}, {row: 0, column: 1}, {row: 0, column: 2}],
            [{row: 1, column: 0}, {row: 1, column: 1}, {row: 1, column: 2}],
            [{row: 2, column: 0}, {row: 2, column: 1}, {row: 2, column: 2}],

            [{row: 0, column: 0}, {row: 1, column: 0}, {row: 2, column: 0}],
            [{row: 0, column: 1}, {row: 1, column: 1}, {row: 2, column: 1}],
            [{row: 0, column: 2}, {row: 1, column: 2}, {row: 2, column: 2}],

            [{row: 0, column: 0}, {row: 1, column: 1}, {row: 2, column: 2}],
            [{row: 2, column: 0}, {row: 1, column: 1}, {row: 0, column: 2}]
        ]
    };
    switch(action.type) {
        case 'User Click':
            state.allSteps[action.payload[0]][action.payload[1]] = 1;
            state.currentUserCell = [action.payload[0], action.payload[1]];
            state.userSteps.push({row: action.payload[0], column: action.payload[1]});
            state.whome = 'user click';
            if(!state.isComplete) {
                checkGameState(state, state.allSteps, state.winCombinations, 1);
                return {...state};
            }
            return {...state};
        case 'Computer Click':
            state.allSteps[action.payload[0]][action.payload[1]] = 2;
            state.currentComputerCell = [action.payload[0], action.payload[1]];
            state.whome = 'computer click';
            if(!state.isComplete) {
                checkGameState(state, state.allSteps, state.winCombinations, 2);
                return {...state};
            }
            return {...state};
        case 'Computer Que':
            state.whome = 'computer que';
            return {...state};
        default:
            state.isComplete = false;
            state.whome = 'none';
            state.allSteps = [
                [0, 0, 0], 
                [0, 0, 0],
                [0, 0, 0]
            ];
            state.currentUserCell = [-1, -1];
            state.currentComputerCell = [-1, -1];
            state.userSteps = [];
            return {...state};
    }
};

const store: Store<Store, Action> = createStore(reducer);
export default store;