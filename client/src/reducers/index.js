import {
	USER_START,
	USER_SUCCESS,
	USER_FAIL,
	SET_LOADING,
} from '../actions/index';

const initialState = {
	users: [],
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case USER_SUCCESS:
			return {
				...state,
				users: action.payload,
				loading: false,
				error: null,
			};
		case USER_FAIL:
			return {
				...state,
				users: [],
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
