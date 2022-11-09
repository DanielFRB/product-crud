package com.product.management.app.repositories;

import com.product.management.app.models.Product;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author danfe
 */

@Repository
@Qualifier(value = "ProductRepository")
public interface ProductRepository extends JpaRepository<Product, Long> {

}
