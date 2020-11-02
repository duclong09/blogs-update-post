import React from "react";
import axios from "axios";
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("name", this.state.name);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/upload", formData, config)
      .then((response) => {
        alert("The file is successfully uploaded");
      })
      .catch((error) => {
        alert("The file is" + error);
      });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} encType='application/x-www-form-urlencoded'>
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange={this.onChange} />
        <input type="text" name="name" onChange={this.onChangeName} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}
export default CreatePost;