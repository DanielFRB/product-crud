package com.product.management.app.controllers;

import com.product.management.app.exceptions.ResourceNotFoundException;
import com.product.management.app.models.Product;
import com.product.management.app.repositories.ProductRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author danfe
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
    @Autowired
    private ProductRepository producRepository;
    
    //Get All Products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return producRepository.findAll();
    }
    
    //Create Product
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product p) {
        return producRepository.save(p);
    }
    
    //Get Product By Id
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product p = producRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product Not Found with Id: " + id));
        return ResponseEntity.ok(p);
    }
    
    //Update Product
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product p) {
        Product ptu = producRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product Not Found with Id: " + id));
        ptu.setProductName(p.getProductName());
        ptu.setProductCode(p.getProductCode());
        ptu.setDescription(p.getDescription());
        ptu.setQuantity(p.getQuantity());
        ptu.setPrice(p.getPrice());
        
        Product updated = producRepository.save(ptu);
        return ResponseEntity.ok(updated);
    }
    
    //Delete Product
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id) {
        Product p = producRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product Not Found with Id: " + id));
        producRepository.delete(p);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
