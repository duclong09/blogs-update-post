import React from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ContentMain from "../ContentMain/ContentMain";
import { connect } from "react-redux";
import {
  fetchDelete,
  fetchDeleteSerivce,
  fetchDeleteSuccess,
  fetchDeleteFailed,
} from "../../../store/actions/deletePost";
import {
  fetchTypeGetPost,
  apiGetAllPost,
  getDataSuccess,
  getDataError,
  changeDataGetPage,
  passDataToStore
} from "../../../store/actions/postAction";
class ListPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageGoto: 1,
    };
    // this.saveIdPost = this.saveIdPost.bind(this);
  }
 

  //   goi truoc khi render nen chua co dom
  // componentWillMount(){
  //   this.props.fetchGetAllPost(this.state.currentPage);
  // }
  //được gọi sau khi render component nhung van chua lay duoc store o day
  componentDidMount() {
    if(!this.props.isSearch){
      this.props.fetchGetAllPost(this.state.currentPage);
    }
  }
  componentDidUpdate() {
    if (this.state.currentPage !== this.state.pageGoto) {
      axios.get(`/post/${this.state.currentPage}`).then((response) => {
        this.props.passDataToStore(response.data);
        this.setState({
          pageGoto: this.state.currentPage,
        });
      });
    }
  }
  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  render() {
    // show data tu kho luu tru toan cuc store
    let posts;
    if (this.props.dataPostStore !== null) {
      if (this.props.dataPostStore.products.length > 0) {
        posts = this.props.dataPostStore.products.map((post) => {
          return (
            <ContentMain
              key={post._id}
              product_name={post.product_name}
              product_summary={post.product_summary}
              photoCover={post.photoCover}
              product_slug={post.product_slug}
              clickedDeletePost={() => this.props.fetchDeletePost(post._id)}
              // khi click thi luu idPost Store de xu ly comment
              clickIsSearchGetPostDetail={() => this.props.saveIdPost(post._id)}
              postId = {post._id}
            />
          );
        });
      }
    }
    return (
      <React.Fragment>
        {posts}
        <Pagination
          totalPages={
            this.props.dataPostStore ? this.props.dataPostStore.pages : 1
          }
          currentPage={this.state.currentPage}
          setCurrentPage={this.setCurrentPage}
        />
      </React.Fragment>
    );
  }
}
function fetchDeletePost(id) {
  return (dispatch) => {
    dispatch(fetchDelete());
    fetchDeleteSerivce(id)
      .then((data) => dispatch(fetchDeleteSuccess(data)))
      .catch((error) => dispatch(fetchDeleteFailed(error)));
  };
}
// function goi api get all post
function fetchGetAllPost(page) {
  return (dispatch) => {
    apiGetAllPost(page)
      .then((data) => dispatch(getDataSuccess(data)))
      .catch((error) => dispatch(getDataError(error)));
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeletePost: (id) => dispatch(fetchDeletePost(id)),
    fetchGetAllPost: (page) => dispatch(fetchGetAllPost(page)),
    passDataToStore: (data) => dispatch(passDataToStore(data)),
    saveIdPost: (id) => dispatch(dispatch({type: 'SAVE_ID_POST_DETAIL',data:id}))
  };
};
const mapStateToProps = (state) => {
  return {
    dataPostStore: state.dataPostServer,
    isSearch: state.isSearch
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
