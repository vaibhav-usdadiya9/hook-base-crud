import React, { useState } from "react";
import Home from "./Home";

import PaypalCheckoutButton from "./PaypalCheckoutButton";
import RazorpayCheckoutButton from "./RazorpayCheckoutButton.jsx";

function Cart() {
  const [getLaptopInCart, setLaptopInCart] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  const handelDecrement = (selectedLaptop) => {
    let { id, quantity } = selectedLaptop;

    quantity = quantity - 1;

    const getDataForDecrementCount = JSON.parse(localStorage.getItem("data"));

    getDataForDecrementCount.map((laptop) => {
      if (laptop.id === id) {
        laptop.quantity = quantity;

        setLaptopInCart(getDataForDecrementCount);
      }
    });

    localStorage.setItem("data", JSON.stringify(getDataForDecrementCount));
  };

  const handleIncrement = (selectedLaptop) => {
    let { id, quantity } = selectedLaptop;

    quantity = quantity + 1;

    const getDataForIncrementCount = JSON.parse(localStorage.getItem("data"));

    getDataForIncrementCount.map((laptop) => {
      if (laptop.id === id) {
        laptop.quantity = quantity;

        setLaptopInCart(getDataForIncrementCount);
      }
    });

    localStorage.setItem("data", JSON.stringify(getDataForIncrementCount));
  };

  const handelRemove = (product) => {
    let { id } = product;
    const getDataForRemoveLaptop = JSON.parse(localStorage.getItem("data"));

    getDataForRemoveLaptop.map((laptop) => {
      if (laptop.id == id) {
        const index = getDataForRemoveLaptop.indexOf(laptop);

        if (index > -1) {
          getDataForRemoveLaptop.splice(index, 1);
          setLaptopInCart(getDataForRemoveLaptop);
        }
      }
    });

    localStorage.setItem("data", JSON.stringify(getDataForRemoveLaptop));
  };

  function totalSumAmount() {
    const getDataForTotal = JSON.parse(localStorage.getItem("data"));

    const total = getDataForTotal.reduce(
      (total, Laptop) => total + Laptop.totalPrice * Laptop.quantity,
      0
    ); 

    return total;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Home></Home>
      </nav>

      {getLaptopInCart.length === 0 ? (
        <h3 className="text-center">There Are No Item In Cart</h3>
      ) : (
        <div className="">
          <React.Fragment>
            <div className="table-responsive container-fluid">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Price</th>
                    <th scope="col">Price Of accessories</th>
                    <th scope="col">Quantity</th>
                    <th></th>
                    <th scope="col" className="text-center">
                      TotalPrice
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {getLaptopInCart.map((cartLaptop) => {
                      return (
                        <tr key={cartLaptop.id}>
                          <td>
                            <img
                              src={cartLaptop.image}
                              style={{
                                width: "60px",
                                height: "40px",
                              }}
                            ></img>
                          </td>
                          <td>{cartLaptop.brand}</td>
                          <td>{cartLaptop.model}</td>
                          <td>{cartLaptop.price}</td>
                          <td>{cartLaptop.priceOfAccessories}</td>

                          <td style={{ textAlign: "left" }}>
                            <button
                              onClick={() => handelDecrement(cartLaptop)}
                              disabled={
                                cartLaptop.quantity === 1 ? true : false
                              }
                              type="button"
                              className="btn btn-sm  btn-primary"
                            >
                              -
                            </button>

                            <span className="mx-2">{cartLaptop.quantity}</span>
                            <button
                              onClick={() => handleIncrement(cartLaptop)}
                              disabled={cartLaptop.quantity >= 6 ? true : false}
                              type="button"
                              className="btn btn-sm  btn-primary"
                            >
                              +
                            </button>
                          </td>

                          <td width={50}></td>

                          <td align="center">
                            {(Number(cartLaptop.price) +
                              Number(cartLaptop.priceOfAccessories)) *
                              Number(cartLaptop.quantity)}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handelRemove(cartLaptop)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                </tbody>

                <tfoot>
                  <>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td align="right" colSpan={2}>
                        <span className="mar-50">
                          <b className="ml-4">Total Quantity :</b>
                          <span> </span>
                          {getLaptopInCart.reduce(
                            (total, Laptop) => total + Laptop.quantity,
                            0
                          )}
                        </span>
                      </td>
                      <td align="left" colSpan={2}>
                        <span>
                          <b>Total Price :</b>
                          <span> </span>
                          {totalSumAmount()}
                        </span>
                      </td>
                      <td></td>
                    </tr>
                  </>
                </tfoot>
              </table>
            </div>

            <div className="buttons d-flex justify-content-center">
              <RazorpayCheckoutButton totalSumAmount={totalSumAmount} />
            </div>

            <div className="buttons d-flex justify-content-center">
              <PaypalCheckoutButton totalSumAmount={totalSumAmount} />
            </div>
          </React.Fragment>
        </div>
      )}
    </div>
  );
}

export default Cart;
