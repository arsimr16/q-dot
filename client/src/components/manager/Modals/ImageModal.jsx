import React from 'react';

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
  }

  updateVal(e) {
    this.setState({
      image: e.target.value
    });
  }

  render() {
    return (
      <div style={{background: 'none', boxShadow: 'none'}} id="change-image" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h2 className="modal-title">Change Image</h2>
            </div>
            <div className="modal-body text-left">
              <form>
                <div className="form-group">
                  <label htmlFor="message-text" className="form-control-label">Image URL:</label>
                  <input className="form-control" id="message-text" value={this.state.image} onChange={(e) => (this.updateVal(e))}/>
                </div>
              </form>
              <button onClick={(e) => (this.props.updateImage(this.state.image))}>
                Submit
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageModal;
