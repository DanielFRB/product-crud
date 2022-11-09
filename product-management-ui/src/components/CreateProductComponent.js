import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import ProductServices from '../Services/ProductServices';

const CreateProductComponent = () => {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  
  const history = useHistory();
  const { id } = useParams();

  const saveOrUpdateProduct = (e) => {
    e.preventDefault();
    const product = { productCode, productName, description, price, quantity };
    if (id) {
      ProductServices.updateProduct(id, product).then((response) => {
        history.push("/products");
      }).catch(error => {
        console.log(error);
      });
    } else {
      ProductServices.createProduct(product).then((response) => {
        history.push("/products");
      }).catch(error => {
        console.log(error);
      });
    };
  };

  useEffect(() => {
    ProductServices.getProductById(id).then((response) => {
      setProductCode(response.data.productCode);
      setProductName(response.data.productName);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setQuantity(response.data.quantity);
    }).catch(error => {
      console.log(error);
    });
  }, [id]);

  const getTitle = () => {
    if (id) {
      return <h3 className = "text-center">Update Product Form</h3>
    } else {
      return <h3 className = "text-center">Add Product Form</h3>
    };
  };

  return (
    <div>
      <div className = "container">
        <div className = "row">
          <div className = "card col-md-8 offset-md-2 offset-md-2" style = {{backgroundColor : 'lightgray', marginTop : "20px"}}>
            { getTitle() }
            <div className = "card-body">
              <form>
                <div className = "form-group mb-2">
                  <label className = "form-label">Product Code:</label>
                  <input type = "text" placeholder = "Enter Product Code" name = "productCode" maxLength = "12"
                    className = "form-control" value = { productCode } onChange = { (e) => setProductCode(e.target.value) } />
                </div>
                <div className = "form-group mb-2">
                  <label className = "form-label">Product Name:</label>
                  <input type = "text" placeholder = "Enter Product Name" name = "productName" 
                    className = "form-control" value = { productName } onChange = { (e) => setProductName(e.target.value) } />
                </div>
                <div className = "form-group mb-2">
                  <label className = "form-label">Description:</label>
                  <input type = "text" placeholder = "Enter Description" name = "description" 
                    className = "form-control" value = { description } onChange = { (e) => setDescription(e.target.value) } />
                </div>
                <div className = "form-group mb-2">
                  <label className = "form-label">Price:</label>
                  <input type = "text" placeholder = "Enter Price" name = "price" 
                    className = "form-control" value = { price } onChange = { (e) => setPrice(e.target.value) } />
                </div>
                <div className = "form-group mb-2">
                  <label className = "form-label">Quantity: </label>
                  <input type = "text" placeholder = "Enter Quantity" name = "quantity" 
                    className = "form-control" value = { quantity } onChange = { (e) => setQuantity(e.target.value) } />
                </div>
                <button className = "btn btn-success" onClick = { (e) => saveOrUpdateProduct(e) }>Save</button>
                <Link to = "/products" className = "btn btn-danger" style = {{marginLeft: "10px"}}>Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CreateProductComponent;