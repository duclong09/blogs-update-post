import React from "react";
import axios from "axios";
import ElementContent from "./ElementContent";
class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUpdate: null,
      nameUpdateCreate: null,
      nameButton: "",
      listContentPlus: [],
      numberContent: 1,
      // data post
      product_name: "",
      product_summary: "",
      photoCover: null,
      product_description_1: "",
      photoContent_1: null,

      product_description_2: "",
      photoContent_2: null,

      product_description_3: "",
      photoContent_3: null,

      product_description_4: "",
      photoContent_4: null,

      product_description_5: "",
      photoContent_5: null,

      product_description_6: "",
      photoContent_6: null,

      product_description_7: "",
      photoContent_7: null,
      product_price: "",
    };
    this.submitCreateUpdate = this.submitCreateUpdate.bind(this);
    this.plusOneContent = this.plusOneContent.bind(this);
  }
  componentDidMount() {
    const slug = window.location.pathname.split("/");
    const id = slug[2];
    // where is id post when not use url?
    // update post
    if (slug[1] === "update-post") {
      axios.get("/getPost/" + id).then((response) => {
        // neu co nhieu description thi phai xet numcontent de plus sau nay
        let num = 1;
        if (response.data.data.product_description_2) {
          num = 2;
        }
        if (response.data.data.product_description_3) {
          num = 3;
        }
        if (response.data.data.product_description_4) {
          num = 4;
        }
        if (response.data.data.product_description_5) {
          num = 5;
        }
        if (response.data.data.product_description_6) {
          num = 6;
        }
        if (response.data.data.product_description_7) {
          num = 7;
        }
        this.setState({
          idUpdate: id,
          nameUpdateCreate: "Update A Post",
          nameButton: "Update",
          numberContent: num,
          // set data
          product_name: response.data.data.product_name,
          photoCover: response.data.data.photoCover,
          product_summary: response.data.data.product_summary,
          product_price: response.data.data.product_price,

          product_description_1: response.data.data.product_description_1,
          product_description_2: response.data.data.product_description_2,
          product_description_3: response.data.data.product_description_3,
          product_description_4: response.data.data.product_description_4,
          product_description_5: response.data.data.product_description_5,
          product_description_6: response.data.data.product_description_6,
          product_description_7: response.data.data.product_description_7,

          photoContent_1: response.data.data.photoContent_1,
          photoContent_2: response.data.data.photoContent_2,
          photoContent_3: response.data.data.photoContent_3,
          photoContent_4: response.data.data.photoContent_4,
          photoContent_5: response.data.data.photoContent_5,
          photoContent_6: response.data.data.photoContent_6,
          photoContent_7: response.data.data.photoContent_7,
        });
      });
    }

    // create post
    if (slug[1] === "create-post") {
      this.setState({
        nameUpdateCreate: "Create A Post",
        nameButton: "Add",
      });
    }
  }

  submitCreateUpdate(event) {
    event.preventDefault();
    let url = "/create-post";
    let method = "POST";

    let product_name = event.target.elements.product_name.value.trim();
    let product_summary = event.target.elements.product_summary.value.trim();
    let photoCover = event.target.elements.photoCover.files[0];
    let product_description_1 = event.target.elements.product_description_1.value.trim();
    let product_price = event.target.elements.product_price.value.trim();

    let product_description_2,
      product_description_3,
      product_description_4,
      product_description_5,
      product_description_6,
      product_description_7;
    let photoContent_1,
      photoContent_2,
      photoContent_3,
      photoContent_4,
      photoContent_5,
      photoContent_6,
      photoContent_7;

    const formData = new FormData();
    if (this.state.idUpdate) {
      // url = "/update-post/" + this.state.idUpdate;
      url = "/create-post";
      method = "POST";
      formData.append("_id", this.state.idUpdate);
      // formData.append("_id", this.state.idUpdate);
    }

    formData.append("product_name", product_name);
    formData.append("product_summary", product_summary);
    // neu co upload anh thi moi thay doi hinh khong thi gui nguyen
    if (photoCover) {
      formData.append("photoCover", photoCover);
    }
    formData.append("product_description_1", product_description_1);
    formData.append("product_price", product_price);

    // contents
    if (event.target.elements.product_description_2) {
      product_description_2 = event.target.elements.product_description_2.value.trim();
      formData.append("product_description_2", product_description_2);
    }
    if (event.target.elements.product_description_3) {
      product_description_3 = event.target.elements.product_description_3.value.trim();
      formData.append("product_description_3", product_description_3);
    }
    if (event.target.elements.product_description_4) {
      product_description_4 = event.target.elements.product_description_4.value.trim();
      formData.append("product_description_4", product_description_4);
    }
    if (event.target.elements.product_description_5) {
      product_description_5 = event.target.elements.product_description_5.value.trim();
      formData.append("product_description_5", product_description_5);
    }
    if (event.target.elements.product_description_6) {
      product_description_6 = event.target.elements.product_description_6.value.trim();
      formData.append("product_description_6", product_description_6);
    }
    if (event.target.elements.product_description_7) {
      product_description_7 = event.target.elements.product_description_7.value.trim();
      formData.append("product_description_7", product_description_7);
    }
    // photo content
    if (event.target.elements.photoContent_1) {
      photoContent_1 = event.target.elements.photoContent_1.files[0];
      if (photoContent_1) {
        formData.append("photoContent_1", photoContent_1);
      }
    }
    if (event.target.elements.photoContent_2) {
      photoContent_2 = event.target.elements.photoContent_2.files[0];
      if (photoContent_2) {
        formData.append("photoContent_2", photoContent_2);
      }
    }
    if (event.target.elements.photoContent_3) {
      photoContent_3 = event.target.elements.photoContent_3.files[0];
      if (photoContent_3) {
        formData.append("photoContent_3", photoContent_3);
      }
    }
    if (event.target.elements.photoContent_4) {
      photoContent_4 = event.target.elements.photoContent_4.files[0];
      if (photoContent_4) {
        formData.append("photoContent_4", photoContent_4);
      }
    }
    if (event.target.elements.photoContent_5) {
      photoContent_5 = event.target.elements.photoContent_5.files[0];
      if (photoContent_5) {
        formData.append("photoContent_5", photoContent_5);
      }
    }
    if (event.target.elements.photoContent_6) {
      photoContent_6 = event.target.elements.photoContent_6.files[0];
      if (photoContent_6) {
        formData.append("photoContent_6", photoContent_6);
      }
    }
    if (event.target.elements.photoContent_7) {
      photoContent_7 = event.target.elements.photoContent_7.files[0];
      if (photoContent_7) {
        formData.append("photoContent_7", photoContent_7);
      }
    }

    fetch(url, {
      method: method,
      body: formData,
      // headers:{
      //   "content-type": "multipart/form-data",
      // }
    })
      .then((res) => res.json())
      .then((response) => {
        alert("Create Successfully!");
        console.log("Success:", JSON.stringify(response));
      })
      .catch((error) => console.error("Error:", error));
  }
  plusOneContent() {
    let num = ++this.state.numberContent;

    if (num <= 7) {
      this.setState({
        listContentPlus: [
          ...this.state.listContentPlus,
          <React.Fragment key={num}>
            <div className="form-group">
              <label htmlFor={`product_description_${num}`}>
                Product content {num} :
              </label>
              <textarea
                className="product_description form-control"
                id={`product_description_${num}`}
                name={`product_description_${num}`}
                cols="100"
                rows="5"
                defaultValue=""
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor={`photoContent_${num}`}>
                Choose one photo for content {num} :
              </label>
              <input
                id={`photoContent_${num}`}
                type="file"
                accept="image/*"
                name={`photoContent_${num}`}
              />
            </div>
          </React.Fragment>,
        ],
      });
    }
  }
  render() {
    return (
      <div className="container custom-container">
        <div className="row">
          <div className="box-create-post">
            <h1>{this.state.nameUpdateCreate}</h1>
            <form
              onSubmit={this.submitCreateUpdate}
              className="form-create-product"
              encType="multipart/form-data"
            >
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="form-group">
                    <label htmlFor="product_name">Product Title: </label>
                    <input
                      className="form-control"
                      id="product_name"
                      type="text"
                      name="product_name"
                      defaultValue={this.state.product_name}
                      onChange={this.handleChangePostName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_summary">Product Summary: </label>
                    <input
                      className="form-control"
                      id="product_summary"
                      type="text"
                      name="product_summary"
                      defaultValue={this.state.product_summary}
                      onChange={this.handleChangePostSummary}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoCover">Choose one photoCover:</label>
                    <input
                      id="photoCover"
                      type="file"
                      accept="image/*"
                      name="photoCover"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_description_1">
                      Product content 1:
                    </label>
                    <textarea
                      className="product_description form-control"
                      id="product_description_1"
                      name="product_description_1"
                      cols="100"
                      rows="5"
                      defaultValue={this.state.product_description_1}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="photoContent_1">
                      Choose one photo for content 1:
                    </label>
                    <input
                      id="photoContent_1"
                      type="file"
                      accept="image/*"
                      name="photoContent_1"
                    />
                  </div>

                  {/* for update post */}
                  {this.state.product_description_2 ? (
                    <ElementContent
                      key={2}
                      numberContent={2}
                      product_description="product_description_2"
                      defaultValue={this.state.product_description_2}
                      photoContent="photoContent_2"
                    />
                  ) : null}
                  {this.state.product_description_3 ? (
                    <ElementContent
                      key={3}
                      numberContent={3}
                      product_description="product_description_3"
                      defaultValue={this.state.product_description_3}
                      photoContent="photoContent_3"
                    />
                  ) : null}
                  {this.state.product_description_4 ? (
                    <ElementContent
                      key={4}
                      numberContent={4}
                      product_description="product_description_4"
                      defaultValue={this.state.product_description_4}
                      photoContent="photoContent_4"
                    />
                  ) : null}
                  {this.state.product_description_5 ? (
                    <ElementContent
                      key={5}
                      numberContent={5}
                      product_description="product_description_5"
                      defaultValue={this.state.product_description_5}
                      photoContent="photoContent_5"
                    />
                  ) : null}
                  {this.state.product_description_6 ? (
                    <ElementContent
                      key={6}
                      numberContent={6}
                      product_description="product_description_6"
                      defaultValue={this.state.product_description_6}
                      photoContent="photoContent_6"
                    />
                  ) : null}
                  {this.state.product_description_7 ? (
                    <ElementContent
                      key={7}
                      numberContent={7}
                      product_description="product_description_7"
                      defaultValue={this.state.product_description_7}
                      photoContent="photoContent_7"
                    />
                  ) : null}
                  {/* for create post */}
                  {this.state.listContentPlus.map((child) => child)}
                  <div
                    className="btn btn-success btnPlus"
                    onClick={this.plusOneContent}
                  >
                    Plus 1 Content
                  </div>

                  <div className="form-group">
                    <label id="idSeeImg" htmlFor="xao">
                      Choose many photos:
                    </label>
                    <input id="photos" type="file" name="images" multiple="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="product_price">Product Price: </label>
                    <input
                      className="form-control"
                      id="product_price"
                      type="text"
                      name="product_price"
                      defaultValue={this.state.product_price}
                    />
                  </div>
                  <button
                    className="btn btn-success btn-hoa-wait"
                    type="submit"
                  >
                    {this.state.nameButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default CreatePost;
