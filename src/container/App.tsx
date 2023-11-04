import {useState} from 'react';
import {Item, Position} from '../types';
import Order from '../components/Order';
import cutleryImg from '../assets/fork.png';
import drinkImg from '../assets/cup.png';
import './App.css';



function App() {
  const items: Item[] = [
    {id:1, name:'Hamburger', price:80, image: cutleryImg},
    {id:2, name:'Cheeseburger', price: 90, image: cutleryImg},
    {id:3, name: 'Fries', price: 45, image: cutleryImg},
    {id:4, name:'Coffee', price: 70, image: drinkImg},
    {id:5, name:'Tea', price: 50, image: drinkImg},
    {id:6, name:'Cola', price: 40, image: drinkImg},
  ];

  const [positions, setPositions] = useState<Position[]>([
    {item:{id:1, name:'Hamburger', price:80, image: cutleryImg}, count: 0},
    {item:{id:2, name:'Cheeseburger', price: 90, image: cutleryImg}, count: 0},
    {item:{id:3, name: 'Fries', price: 45, image: cutleryImg}, count: 0},
    {item:{id:4, name:'Coffee', price: 70, image: drinkImg}, count: 0},
    {item:{id:5, name:'Tea', price: 50, image: drinkImg}, count: 0},
    {item:{id:6, name:'Cola', price: 40, image: drinkImg}, count: 0},
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

  const imgOrder = (id: number)=> {
    const detail = items.find(item => item.id === id);
    if(detail !== undefined) {
      return detail.image;
    } else {
      return ' ';
    }
  };

  return (
    <>
      <div className="container">
        <div className="container mt-2">
          <h1 className="fs-3">Items:</h1>
          <div className="mt-2 d-flex flex-column">
            {items.map(item => (
              <Order   id = {item.id}
                       name = {item.name}
                       price = {item.price}
                       image = {item.image}
                       onChange = {onChange}
                       imgOrder = {imgOrder}
              ></Order>
            ))}
          </div>
        </div>
        <div className="container mt-5">
          <h1 className="mb-5 fs-3"> Order details: </h1>
          <div className="mt-2 d-flex flex-column gap-2">
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

// <button className="btn btn-white" onClick={() => onChange(item.id,1)}>
//   <div key={item.id} className="card p-2">
//     <div className="card-body">
//       <div className="row align-items-center">
//         <div className="col-auto">
//           <img src={imgOrder(item.id)} width='50px' height='50px' alt="Order image" />
//         </div>
//         <div className="col-auto flex-grow-1">
//           {item.name}
//         </div>
//         <div className="col-auto">
//           {item.price} KGS
//         </div>
//       </div>
//     </div>
//   </div>
// </button>
