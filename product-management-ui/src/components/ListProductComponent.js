import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import ProductServices from '../Services/ProductServices';

const ListProductComponent = () => {

  const [products, setProducts] = useState([]);
  const history = useHistory();

  const editProduct = (id) => {
    history.push(`/edit-product/${id}`);
  };

  const getProducts = () => {
    ProductServices.getProducts().then((response) => {
      setProducts(response.data);
    }).catch(error => { 
      console.log(error); 
    });
  };

  const deleteProduct = (id) => {
    ProductServices.deleteProduct(id).then((response) => {
      getProducts();
    }).catch(error => {
      console.log(error);
    })
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  return (
    <div>
      <h2 className = "text-center">Product List</h2>
      <div className = "row">
        <div className = "col-md-4">
          <Link to = "/add-product" className = "btn btn-primary mb-2" style = {{marginBottom : "10px"}}>Add Product</Link>
        </div>
        <div className = "row">
          <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Product Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map(
                  product =>
                    <tr key = {product.id}>
                      <td>{ product.productCode }</td>
                      <td>{ product.productName }</td>
                      <td>{ product.price }</td>
                      <td>
                        <button className = "btn btn-info" onClick = { (e) => editProduct(product.id) }>Edit</button>
                        <button className = "btn btn-danger" style = {{marginLeft : "10px"}} onClick = { () => deleteProduct(product.id) }>Delete</button>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListProductComponent;