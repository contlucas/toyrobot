import { Constants } from "../screens/home/actions/homeActions";

const initialState = {
    errorMessage: "",
    reportMessage: "",
    commands: "",
    robot: {
        position: {
            x: 0,
            y: 0
        },
        facing: 270
    },
    tableboard: {
        size: {
            x: 5,
            y: 5
        }
    }
}

export default function appStore(state = initialState, action) {
    switch (action.type) {
        case Constants.ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.error
            }
        }
        case Constants.CHANGE_FACING_ROBOT: {
            return {
                ...state,
                isReset: false,
                robot: {
                    ...state.robot,
                    facing: action.value
                }
            };
        }
        case Constants.ROBOT_MOVEMENT: {
            const hasValue = (action.robot.facing != undefined);

            return {
                ...state,
                isReset: false,
                robot: {
                    position: action.robot.position,
                    facing: hasValue ? action.robot.facing : state.robot.facing
                }
            }
        }
        case Constants.SHOW_REPORT: {
            const { position } = action.robot;
            const { facingCode } = action;
            const reportMessage = `Output: ${position.x}, ${position.y}, ${facingCode}`

            return {
                ...state,
                reportMessage
            }
        }
        case Constants.RESET_ROBOT_STATE: {
            return initialState;
        }
        case Constants.CHANGE_COMMANDS: {
            return {
                ...state,
                commands: action.value.toUpperCase()
            }
        }
        default: {
            return state;
        }
    }
}