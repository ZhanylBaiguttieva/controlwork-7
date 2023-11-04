import React from "react";

interface Props {
  id: number;
  name: string;
  price: number;
  count: number;
  onChange: (id: number, quantity: number) => void;
}

const ResultOrder: React.FC<Props> = (props) => {
  return (
      <div key={props.id} className="card p-2">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-auto flex-grow-1">
              {props.name}
            </div>
            <div className="col-auto">
              X {props.count}
            </div>
            <div className="col-auto">
              {props.price} KGS
            </div>
            <div className="col-auto">
              <button onClick={() => props.onChange(props.id,-1)}
                      className="btn btn-danger"
              >
                X </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ResultOrder;