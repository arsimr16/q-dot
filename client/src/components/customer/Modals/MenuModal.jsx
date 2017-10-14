import React from 'react';
import MenuListItem from '../MenuListItem.jsx'

const MenuModal = (props) => (
  <div style={{background: 'none', boxShadow: 'none'}} id="customer-menu" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h2 className="modal-title">Menu</h2>
        </div>
        <div className="modal-body">
          <ul className="menu">
            {props.modalRestaurant.map((menuItem, index) => {
              return <MenuListItem menuItem={menuItem} key={index}/>
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

export default MenuModal;
