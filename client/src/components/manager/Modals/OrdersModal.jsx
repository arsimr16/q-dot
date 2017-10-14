import React from 'react';

const OrdersModal = (props) => (
  <div style={{background: 'none', boxShadow: 'none'}} id="manager-orders-modal" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h2 className="modal-title">Menu</h2>
        </div>
        <div className="modal-body text-left">
          <ul style={{width: '100%'}} className="menu">
            {props.modalOrders.map((menuItem, index) => {
              return (<li key={index}>
                <h4 className="col-xs-10">{menuItem.dish}</h4>
                <div className="col-sm-2 text-center price">
                  ${menuItem.price}
                </div>
                <div className="col-xs-11">
                  {menuItem.description}
                </div>
              </li>)
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



);

export default OrdersModal;
