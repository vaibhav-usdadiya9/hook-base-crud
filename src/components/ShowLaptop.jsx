import React, { useState, useEffect } from "react";
import laptopData from "../services/Laptop";
import Navbar from "./Navbar";
import accessoriesData from "../services/Accessories";

function ShowLaptopData(props) {
  const [laptops, setLaptops] = useState(laptopData);
  const [toggle, setToggle] = useState(true);
  const [quantity, setQuantity] = useState();
  const [cart, setCart] = useState([]);
  const [array, setArray] = useState([]);
  const [accessories, setAccessoriesData] = useState([]);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("data"));
    setCart(p);
    setAccessoriesData(accessoriesData);
  }, []);

  const searchItems = (input) => {
    const filteredData = laptopData.filter((filterLaptop) => {
      return (
        filterLaptop.brand.toLowerCase().includes(input.toLowerCase()) ||
        filterLaptop.model.toLowerCase().includes(input.toLowerCase())
      );
    });

    if (filteredData.length === 0 && input.length !== 0) {
      setLaptops([]);
    } else if (input.length === 0) {
      setLaptops(laptopData);
    } else {
      setLaptops(filteredData);
    }
  };

  const handlesort = () => {
    if (toggle == true) {
      const descendingorder = laptops.sort(
        (a, b) => Number(b.ratings) - Number(a.ratings)
      );

      setLaptops(descendingorder);
      setToggle(false);
    }

    if (toggle == false) {
      const ascendingOrder = laptops.sort(
        (a, b) => Number(a.ratings) - Number(b.ratings)
      );

      setLaptops(ascendingOrder);
      setToggle(true);
    }
  };

  const handleIncrement = () => {
    const incrementCount = quantity + 1;

    setQuantity(incrementCount);
  };
  const handelDecrement = () => {
    const decrementCount = quantity - 1;

    setQuantity(decrementCount);
  };

  const handelQuantity = (e) => {
    const { id } = e;
    setQuantity(1);

    if (cart) {
      cart.map((laptopInCart) => {
        if (laptopInCart.id === id) {
          setQuantity(laptopInCart.quantity);
        }
      });
    }
  };

  const handelAccessoriesSelect = (e, id) => {
    laptops.map((laptop) => {
      if (laptop.id == id) {
        let selectAccessories = accessories.map((selectedAccessories) =>
          selectedAccessories.id == e
            ? selectedAccessories.isChecked == true
              ? { ...selectedAccessories, isChecked: false }
              : { ...selectedAccessories, isChecked: true }
            : selectedAccessories
        );

        setAccessoriesData(selectAccessories);
      }
    });
  };

  const handelChecked = (e) => {
    const { id } = e;

    let checkedFalse = accessories.map((selectedLaptopAccessories) => {
      let des = { ...selectedLaptopAccessories, isChecked: false };
      return des;
    });
    setAccessoriesData(checkedFalse);

    if (cart) {
      cart.map((laptopInCart) => {
        if (laptopInCart.id == id) {
          let { selectedAccessories } = laptopInCart;

          if (selectedAccessories) {
            const result = accessories.reduce(
              (actualAccessories, currentAccessories) => {
                const stored = selectedAccessories.find(
                  ({ name }) => name === currentAccessories.name
                );

                if (stored) {
                  currentAccessories.isChecked = true;
                  actualAccessories.push(currentAccessories);
                } else {
                  currentAccessories.isChecked = false;
                  actualAccessories.push(currentAccessories);
                }
                return actualAccessories;
              },
              []
            );
            setAccessoriesData(result);
          }
        }
      });
    }
  };

  const addToLocalStorage = (selectedLaptop) => {
    const { id } = selectedLaptop;

    laptops.map((laptop) => {
      if (laptop.id === id) {
        laptop.quantity = quantity;

        const selectedAccessories = [];

        accessories.map((accessoriesIsSelected) =>
          accessoriesIsSelected.isChecked == true
            ? selectedAccessories.push(accessoriesIsSelected)
            : null
        );

        if (selectedAccessories.length > 0) {
          laptop.selectedAccessories = selectedAccessories;

          let price = selectedAccessories.map(
            (data, index) => selectedAccessories[index].price
          );

          let totalAccessoriesPrice = price.reduce(
            (total, item) => total + item,
            0
          );

          laptop.priceOfAccessories = totalAccessoriesPrice;

          laptop.totalPrice =
            Number(laptop.price) + Number(laptop.priceOfAccessories);
        } else {
          laptop.priceOfAccessories = 0;
          laptop.totalPrice = laptop.price;
        }

        if (quantity > 6) {
          alert("Cannot Add More Than 6 items in cart");
        } else {
          if (quantity >= 1) {
            if (cart === null) {
              const updatedArray = array.push(laptop);

              setArray(updatedArray);
              localStorage.setItem("data", JSON.stringify(array));
              setCart(array);
              alert("Data Added To Cart");
            } else {
              const selectedLaptopId = cart.some(
                (laptopInCart) => laptopInCart.id === id
              );
              if (selectedLaptopId === true) {
                cart.map((selectedLaptop) => {
                  if (selectedLaptop.id === id) {
                    selectedLaptop.quantity = quantity;

                    if (selectedAccessories.length == 0) {
                      delete selectedLaptop["selectedAccessories"];
                      selectedLaptop.priceOfAccessories = 0;
                      selectedLaptop.totalPrice = selectedLaptop.price;
                      return selectedLaptop;
                    } else {
                      selectedLaptop.selectedAccessories = selectedAccessories;

                      let price = selectedAccessories.map(
                        (data, index) => selectedAccessories[index].price
                      );

                      let totalAccessoriesPrice = price.reduce(
                        (total, accessoriesItem) => total + accessoriesItem,
                        0
                      );

                      selectedLaptop.priceOfAccessories = totalAccessoriesPrice;

                      selectedLaptop.totalPrice =
                        Number(selectedLaptop.price) +
                        Number(selectedLaptop.priceOfAccessories);
                    }
                  }
                });

                localStorage.setItem("data", JSON.stringify(cart));
                alert("Data Updated");
              } else {
                cart.push(laptop);
                localStorage.setItem("data", JSON.stringify(cart));
                alert("Data added to Cart");
              }
            }
          } else {
            alert("Pls Add Items");
          }
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Navbar onSortClick={handlesort} onChange={searchItems}></Navbar>

      <div className="mt-3"></div>

      <div className="container ">
        {laptops.length === 0 ? (
          <p>The laptop you are searching is unfortunately not available</p>
        ) : (
          <div className="row">
            {laptops.map((selectedLaptop) => {
              return (
                <div className="col-lg-4 col-md-6" key={selectedLaptop.id}>
                  <div className="row" key={selectedLaptop.id}>
                    <div className="col mt-4 ">
                      <div className="card shadow p-3 mb-5 bg-body rounded ">
                        <img
                          src={selectedLaptop.image}
                          className="card-img-top "
                          style={{
                            width: "280px",
                            height: "200px",
                            backgroundColor: "gray",
                          }}
                          alt="..."
                        ></img>
                        <div className="card-body">
                          <div className="card-title d-flex ">
                            <div>
                              <div>
                                <div>
                                  <h5>Brand</h5>
                                </div>
                              </div>
                              <div>
                                <b>Model</b>
                              </div>
                              <div>
                                <b>Processor</b>
                              </div>
                              <div>
                                <b>Memory</b>
                              </div>
                              <div>
                                <b>Ratings</b>
                              </div>
                              <div>
                                <b>Price</b>
                              </div>
                            </div>

                            <div>
                              <div className="ms-2">
                                <h5>
                                  <nbsp>:</nbsp> {selectedLaptop.brand}
                                </h5>
                              </div>
                              <div  className="ms-2">
                                <b>
                                  <nbsp>:</nbsp> {selectedLaptop.model}
                                </b>
                              </div>
                              <div  className="ms-2">
                                <b>
                                  <nbsp>:</nbsp> {selectedLaptop.processor}
                                </b>
                              </div>
                              <div  className="ms-2">
                                <b>
                                  <nbsp>:</nbsp> {selectedLaptop.memory}
                                </b>
                              </div>
                              <div  className="ms-2">
                                <b>
                                  <nbsp>:</nbsp> {selectedLaptop.ratings}
                                </b>
                              </div>
                              <div  className="ms-2">
                                <b>
                                  <nbsp>:</nbsp>
                                  <nbsp> </nbsp>
                                  <i className="fa-solid fa-indian-rupee-sign"></i>
                                  {selectedLaptop.price}
                                </b>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            href={`#exampleModal${selectedLaptop.id}`}
                            onClick={() => handelQuantity(selectedLaptop)}
                          >
                            Add To Cart
                          </button>

                          <div
                            className="modal fade"
                            id={`exampleModal${selectedLaptop.id}`}
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    <b>Brand</b> : {selectedLaptop.brand}
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body d-flex justify-content-between">
                                  
                                  
                                  
                                  <div className="">
                                    <p>
                                      <b>Model : </b> {selectedLaptop.model}
                                    </p>
                                    <p>
                                      <b>Memory : </b> {selectedLaptop.memory}
                                    </p>
                                    <p>
                                      <b>Price : </b>
                                      <i className="fa-solid fa-indian-rupee-sign"></i>
                                      {selectedLaptop.price}
                                    </p>

                                    <div>
                                      <p className=" d-flex line-height ">
                                        <b>Quantity : </b>
                                        <button
                                          onClick={() => handelDecrement()}
                                          disabled={
                                            quantity === 1 ? true : false
                                          }
                                          type="button"
                                          className="btn btn-primary btn-sm cartQtyBtn"
                                        >
                                          -
                                        </button>

                                        <span className="mx-2">{quantity}</span>

                                        <button
                                          onClick={() => handleIncrement()}
                                          disabled={
                                            quantity === 6 ? true : false
                                          }
                                          type="button"
                                          className="btn btn-primary  btn-sm"
                                        >
                                          +
                                        </button>
                                      </p>
                                    </div>

                                    <div>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-secondary dropdown-toggle"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          onClick={() =>
                                            handelChecked(selectedLaptop)
                                          }
                                        >
                                          Add Accessories
                                        </button>

                                        <ul
                                          className="dropdown-menu"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          {accessories.map(
                                            (selectedAccessories, index) => {
                                              return (
                                                <li
                                                  key={selectedAccessories.id}
                                                >
                                                  <form>
                                                    <div>
                                                      <input
                                                        type="checkbox"
                                                        id={selectedLaptop.id}
                                                        name={
                                                          selectedAccessories.name
                                                        }
                                                        value={
                                                          selectedAccessories.id
                                                        }
                                                        onChange={(e) =>
                                                          handelAccessoriesSelect(
                                                            e.target.value,
                                                            e.target.id
                                                          )
                                                        }
                                                        checked={
                                                          selectedAccessories.isChecked
                                                        }
                                                      ></input>

                                                      <label
                                                        htmlFor={`custom-checkbox-${index}`}
                                                      >
                                                        {
                                                          selectedAccessories.name
                                                        }
                                                      </label>
                                                    </div>
                                                  </form>
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <img
                                      src={selectedLaptop.image}
                                      style={{
                                        width: "220px",
                                        height: "170px",
                                      }}
                                    ></img>
                                  </div>
                                </div>
                                <div className="modal-footer d-flex justify-content-between ">
                                  <div>
                                    <button
                                      type="button"
                                      className="btn btn-secondary mx-2"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={(e) =>
                                        addToLocalStorage(selectedLaptop)
                                      }
                                      data-bs-dismiss="modal"
                                    >
                                      Buy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default ShowLaptopData;
