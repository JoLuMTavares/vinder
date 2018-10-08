-- SELECT * FROM customers WHERE city = 'Berlin';

-- SELECT * FROM customers WHERE city = 'Berlin' ORDER BY firstname;

-- SELECT * FROM customers WHERE firstname LIKE "K%";

-- SELECT * FROM customers WHERE lastname LIKE "%a" OR lastname LIKE "%n";

SELECT year(curdate()) AS current_year, year(birthdate) AS birth_year FROM customers;

SELECT firstname, lastname, TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age FROM customers;

SELECT firstname, lastname, TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age FROM customers ORDER BY age desc;

SELECT firstname, lastname, TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age         
		FROM customers    
        WHERE TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 27
        ORDER BY age;
        
SELECT *         
		FROM customers    
        WHERE TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) > 27
        AND TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 35;
        
        
-- 7

SELECT *, TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age         
		FROM customers    
        WHERE email LIKE "%gmail%"
        OR email LIKE "%googlemail%"
        ORDER BY age desc
        LIMIT 0,5;   
        
-- 8

SELECT *        
		FROM customers    
        WHERE TIME(registered) > TIME("19:00:00");   

-- 9

SELECT DISTINCT lastname
      FROM customers;
      
-- 10

SELECT COUNT(*) FROM customers
	   WHERE city = 'Berlin';
        

-- 11

SELECT COUNT(*) FROM customers
	   WHERE city = 'Berlin'
       OR city = 'Leipzig';
       
-- 12
SELECT c.*, o.* 
		FROM customers c INNER JOIN orders o
        WHERE c.id = o.customer_id;
        
-- 13.

SELECT *
	FROM customers LEFT JOIN orders
    ON customers.id = orders.customer_id;
    
-- 14. THIS GIVES TOO MUCH

SELECT *
	FROM customers LEFT JOIN orders
    ON customers.id = orders.customer_id
    AND orders.customer_id IS NULL;
    
-- 14. MORE PRECISE
SELECT * FROM customers
		WHERE NOT EXISTS (SELECT * 
							FROM orders 
                            WHERE customers.id = orders.customer_id);


-- 15.`online_shop2`

SELECT p.*, pc.*
	FROM products p JOIN product_categories pc
    ON p.category_id = pc.id;
    
        