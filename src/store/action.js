/**
 * @param  {} data is array includes
 * Promise
 * Type for success
 * Type for error
 */
export const fetchData = (data) => async (dispatch) => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  const response = await data[0];

  try {
    dispatch({
      type: data[1],
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: data[2],
      payload: error,
    });
  }

  dispatch({
    type: 'LOADING',
    payload: false,
  });
};

/**
 * @param  {} data is array includes
 * Type of success
 * response data
 */
export const changeData = (data) => ({ type: data[0], payload: data[1] });
