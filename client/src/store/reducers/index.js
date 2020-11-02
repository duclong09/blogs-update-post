const initialState = {
  loading: false,
  isShowModal: false,
  status: null,
  message: null,
  // data de hien thi cac cai post
  dataPostServer: null,
  idPostDetail: null,
  isSearch: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_POST":
      return {
        ...state,
        loading: true,
        isShowModal: true,
        status: null,
        message: null,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        isShowModal: true,
        status: action.data.status,
        message: action.data.message,
      };
    case "DELETE_ERROR":
      return {
        ...state,
        loading: false,
        isShowModal: true,
        status: action.data.status,
        message: action.data.message,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isShowModal: false,
        status: null,
        message: null,
      };
    // get all post
    case "GET_POST":
      // reducer khong cho phep goi api o day
      return {
        ...state,
        dataPostServer: null,
      };
    case "GET_DATA_SUCCESS":
      // reducer khong cho phep goi api o day
      return {
        ...state,
        dataPostServer: action.data,
      };
    case "GET_DATA_ERROR":
      // reducer khong cho phep goi api o day
      return {
        ...state,
        dataPostServer: action.data,
      };
    case "CHANGE_DATA":
      // reducer khong cho phep goi api o day
      return {
        ...state,
        dataPostServer: action.value,
      };
    case "CHANGE_DATA_GET_PAGE":
      return {
        ...state,
        dataPostServer: action.data,
        isSearch: true,
      };
    case "SEARCH_FALSE":
      return {
        ...state,
        isSearch: false,
      };
    case 'SAVE_ID_POST_DETAIL':
      return{
        ...state,
        idPostDetail: action.data
      }
    default:
      return state;
  }
};
export default reducer;
