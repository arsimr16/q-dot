import React from 'react';
import $ from 'jquery';

const MenuListItem = (props) => (
  <li>
    <h4 className="col-xs-10">{props.menuItem.dish}</h4>
    <div className="col-sm-2 text-center price">
      ${props.menuItem.price}
    </div>
    <div className="col-xs-11">
      {props.menuItem.description}
    </div>
    {props.order &&
      <div>
        { props.remove ?
          <button onClick={() => (props.removeOrder(props.menuItem, props.index))} className="getMenuBtn col-sm-6 col-sm-offset-6 col-xs-8 col-xs-offset-4">Remove from Order</button>
        :
          <button onClick={() => (props.addOrder(props.menuItem))} className="getMenuBtn col-sm-6 col-sm-offset-6 col-xs-8 col-xs-offset-4">Add to Order</button>
        }

      </div>
    }
  </li>
);

export default MenuListItem;
