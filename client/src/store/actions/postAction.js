import axios from "axios";
function fetchTypeGetPost() {
  return {
    type: "GET_POST",
  };
}
function apiGetAllPost(page) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/post/${page}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
function getDataSuccess(data) {
  return {
    type: "GET_DATA_SUCCESS",
    data: data,
  };
}
function getDataError(data) {
  return {
    type: "GET_DATA_ERROR",
    data: data,
  };
}
function changeDataGetPage(data) {
  return {
    type: "CHANGE_DATA_GET_PAGE",
    data: data,
  };
}
function passDataToStore(data) {
  return (dispatch) => {
    dispatch(changeDataGetPage(data));
  };
}
export {
  fetchTypeGetPost,
  apiGetAllPost,
  getDataSuccess,
  getDataError,
  changeDataGetPage,
  passDataToStore
};
