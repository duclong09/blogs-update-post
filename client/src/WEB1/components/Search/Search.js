import React, { Component } from "react";
import "./Search.css";
import axios from "axios";
import { connect } from "react-redux";
import {passDataToStore} from '../../../store/actions/postAction';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: "",
    };
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }
  onChangeSearchTitle(event) {
    this.setState({
      valueSearch: event.target.value,
    });
  }
  onSubmitSearch(event){
    event.preventDefault();
    //req.query.title = value
    axios.get(`/search?title=${this.state.valueSearch}`)
      .then(res => {
        this.props.passDataToStore(res.data);
      }).catch(e => {
        console.log(e);
      })
  }
  render() {
    return (
      <React.Fragment>
        <form  className="Search" onSubmit={this.onSubmitSearch}>
          <input
            onChange={this.onChangeSearchTitle}
            placeholder="Search"
          ></input>
        </form>
      </React.Fragment>
      
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataPost: state.dataPostServer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeDataStore: (value) => dispatch({ type: "CHANGE_DATA", data: value }),
    passDataToStore: (data) => dispatch(passDataToStore(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
