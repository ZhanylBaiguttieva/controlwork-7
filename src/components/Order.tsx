import React from "react";

interface Props {
  id: number;
  name: string;
  price: number;
  image: string;
  onChange: (id: number, quantity: number) => void;
  imgOrder: (id: number) => string;
}

const Order: React.FC<Props> = (props) => {
  return (
    <div>
      <button className="btn btn-white" onClick={() => props.onChange(props.id,1)}>
        <div key={props.id} className="card p-2">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
                <img src={props.imgOrder(props.id)} width='50px' height='50px' alt="Order image" />
              </div>
              <div className="col-auto flex-grow-1">
                {props.name}
              </div>
              <div className="col-auto">
                {props.price} KGS
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Order;