import React from 'react';
import GMap from '../GMap.jsx'

const MapModal = (props) => (
  <div style={{background: 'none', boxShadow: 'none'}} id="rest-map" className="modal fade" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h2 className="modal-title">{props.modalMap.name}</h2>
        </div>
        <div className="modal-body">
          <div style={{width: '250px', height: '250px', margin: '15px auto'}}>
            <GMap
              you={!!props.location}
              isMarkerShown
              location={props.location}
              restaurant={{latitude: props.modalMap.latitude, longitude: props.modalMap.longitude}}
              apiKey={props.apiKey}
            />
          </div>
          <div style={{width: '100%'}} className="text-center transportation">
            <i onClick={() => (props.getTravelTime('driving'))} className="fa fa-car fa-2x" aria-hidden="true"></i>
            <i onClick={() => (props.getTravelTime('transit'))} className="fa fa-subway fa-2x" aria-hidden="true"></i>
            <i onClick={() => (props.getTravelTime('walking'))} className="fa fa-male fa-2x" aria-hidden="true"></i>
            <i onClick={() => (props.getTravelTime('bicycling'))} className="fa fa-bicycle fa-2x" aria-hidden="true"></i>
          </div>
          {!!props.travelTime ?
            <div>
              <div style={{width: '100%'}} className="text-center">
                <div className="travelInfo">Distance: {props.travelTime.distance.text}</div>
                <div className="travelInfo">Duration: {props.travelTime.duration.text}</div>
              </div>
              <ul className="menu">
                <li><div className="col-xs-11">
                  <i className="fa fa-map-marker" aria-hidden="true"></i> {props.travelTime.start_address}
                </div></li>
                {props.travelTime.steps.map((step, index) => {
                  return (
                    <li key={index}>
                      <h4 className="col-xs-9">{step.distance.text}</h4>
                      <div className="col-xs-3 text-right price">
                        {step.duration.text}
                      </div>
                      <div className="col-xs-11" dangerouslySetInnerHTML={{__html: step.html_instructions}}>
                      </div>
                    </li>
                  );
                })}
                <li><div className="col-xs-11">
                  <i className="fa fa-map-marker" aria-hidden="true"></i> {props.travelTime.end_address}
                </div></li>
              </ul>
            </div>
            :
            <div style={{width: '100%'}} className="text-center">
              <div className="travelInfo">(Note: You must enable location services to see your travel time)</div>
            </div>
          }
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
);

export default MapModal;
