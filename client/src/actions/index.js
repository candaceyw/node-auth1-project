import axios from 'axios';

export const USER_START = 'USER_START';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAIL = 'USER_FAIL';
export const SET_LOADING = 'SET_LOADING';

export const getUsers = () => (dispatch) => {
	dispatch({ type: USER_START });

	// GET posts
	return axios
		.get(`http://localhost:5000/api/users`)
		.then((res) => {
			console.log('get all posts action', res.data);
			dispatch({ type: USER_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			console.log('err', err);

			dispatch({
				type: USER_FAIL,
				payload: err,
			});
		});
};

// POST Login
// export const login = (login) => (dispatch) => {
// 	dispatch({ type: POST_START });
// 	axios
// 		.post(`http://localhost:5000/api/auth/login`, login)
// 		.then((res) => {
// 			console.log('add POST', res);
// 			dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
// 		})
// 		.catch((err) => {
// 			dispatch({ type: ADD_POST_FAIL, payload: err });
// 		});
// };

// Set Loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};
