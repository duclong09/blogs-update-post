import React from "react";
function ElementContent(props) {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={props.product_description}>Product content {props.numberContent}:</label>
        <textarea
          className="product_description form-control"
          id={props.product_description}
          name={props.product_description}
          cols="100"
          rows="5"
          defaultValue={props.defaultValue}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor={props.photoContent}>Choose one photo for content {props.numberContent}:</label>
        <input
          id={props.photoContent}
          type="file"
          accept="image/*"
          name={props.photoContent}
        />
      </div>
    </React.Fragment>
  );
}
export default ElementContent;
