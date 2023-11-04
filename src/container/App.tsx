import {useState} from 'react';
import './App.css';
import {Item, Position} from '../types';

function App() {
  const items: Item[] = [
    {id:1, name:'Hamburger', price:80},
    {id:2, name:'Cheeseburger', price: 90},
    {id:3, name: 'Fries', price: 45},
    {id:4, name:'Coffee', price: 70},
    {id:5, name:'Tea', price: 50},
    {id:6, name:'Cola', price: 40},
  ];
  const [positions, setPositions] = useState<Position[]>([
    {item:{id:1, name:'Hamburger', price:80}, count: 0},
    {item:{id:2, name:'Cheeseburger', price: 90}, count: 0},
    {item:{id:3, name: 'Fries', price: 45}, count: 0},
    {item:{id:4, name:'Coffee', price: 70}, count: 0},
    {item:{id:5, name:'Tea', price: 50}, count: 0},
    {item:{id:6, name:'Cola', price: 40}, count: 0},
  ]);
  const [totalPrice, setTotalPrice] = useState(
    {price: 0}
  );
  const onChange = (id: number, quantity: number) => {
    setPositions(prevState => {
      const menuItem = prevState.map(position => {
        if (position.item.id === id) {
          return {... position, count: position.count + quantity};
        }
        return position;
      });

      setTotalPrice(prevPrice => {
        let totalPrice = 0;
        for (let i= 0; i < menuItem.length; i++) {
          totalPrice += menuItem[i].count * items[i].price;
        }
        return {...prevPrice, price: totalPrice};
      });
      return menuItem;
    });
  };

  return (
    <>
      <div className="container">
        <div className="container mt-2">
          <h1 className="fs-3">Items:</h1>
          <div className="mt-2 d-flex flex-column">
            {items.map(item => (
              <button className="btn btn-white" onClick={() => onChange(item.id,1)}>
                <div key={item.id} className="card p-2">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/*<div className="col-auto">*/}
                      {/*</div>*/}
                      <div className="col-auto flex-grow-1">
                        {item.name}
                      </div>
                      <div className="col-auto">
                        {item.price} KGS
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="container mt-5">
          <h1 className="mb-5 fs-3"> Order details: </h1>
          <div className="mt-2 d-flex flex-column">
            {positions.filter(position => position.count !== 0).map(position => (
              <div key={position.item.id} className="card p-2">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-auto flex-grow-1">
                      {position.item.name}
                    </div>
                    <div className="col-auto">
                      X {position.count}
                    </div>
                    <div className="col-auto">
                      {position.item.price} KGS
                    </div>
                    <div className="col-auto">
                      <button onClick={() => onChange(position.item.id,-1)}
                        className="btn btn-danger"
                      >
                        X </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-auto mt-3 fw-bold">
            Total price: {totalPrice.price} KGS
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
