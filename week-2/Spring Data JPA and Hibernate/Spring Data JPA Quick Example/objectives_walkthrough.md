# Objectives & Hands-on Walkthrough: Spring Data JPA & Hibernate

This guide covers all theoretical objectives and hands-on walkthrough explanations requested for the `orm-learn` country management module.

---

## 1. Object-Relational Mapping (ORM) Overview

### Need and Benefit of ORM
* **Need:** In traditional Java database programming (JDBC), developers write verbose SQL queries, map columns to class fields manually, manage database connections, and handle resource cleanup. This introduces boilerplate code and makes the domain layer heavily dependent on relational schemas.
* **Benefit:** 
  * **Abstraction:** ORM maps database tables directly to Java classes (Entities) and database rows to Java objects.
  * **Productivity:** Developers write type-safe Java code instead of SQL queries, reducing bugs and development time.
  * **Database Independence:** ORM abstraction isolates SQL generation, allowing applications to switch between different database systems (e.g., MySQL, Oracle, H2) by changing configuration dialects.
  * **Transaction Management:** Integrates seamlessly with Java transactions to manage ACID properties.

---

## 2. Core Objects of the Hibernate Framework

Hibernate acts as the ORM provider. Its architecture relies on five core interfaces/classes:

1. **Configuration:** Read properties (database connection, dialect, mapped entities) from `hibernate.cfg.xml` or properties files to build the SessionFactory.
2. **SessionFactory:** A thread-safe, heavy-weight factory object created once per database. It is responsible for compiling mappings and generating `Session` instances.
3. **Session:** A single-threaded, short-lived object representing a physical connection with the database. It is the primary interface for CRUD operations (e.g., `save()`, `get()`, `delete()`).
4. **Transaction:** Represents a database unit of work (transactionality). It wraps database-specific transactions (JDBC or JTA) and manages `commit()` and `rollback()` lifecycles.
5. **ConnectionProvider:** Exposes a factory for JDBC connections, decoupling Hibernate from the raw datasource/pooling mechanisms.

---

## 3. ORM Configurations: XML vs. Annotations

ORM mapping can be defined in two ways:

### A. Hibernate XML Configuration
* **Structure:** Maps Java classes to tables using `.hbm.xml` files, and defines connection settings in `hibernate.cfg.xml`.
* **Flow:**
  * Define `<class>` with properties mapping to `<column>` elements.
  * Load configurations in Java:
    ```java
    Configuration cfg = new Configuration().configure("hibernate.cfg.xml");
    SessionFactory sf = cfg.buildSessionFactory();
    Session session = sf.openSession();
    ```

### B. Hibernate Annotation Configuration
* **Structure:** Eliminates `.hbm.xml` files by putting metadata annotations directly on the Java class:
  * `@Entity`: Registers the class as a database-mapped object.
  * `@Table(name="...")`: Maps to the SQL table.
  * `@Id`: Specifies the primary key.
  * `@Column(name="...")`: Maps a field to a table column.
* **Flow:** SessionFactory detects annotations automatically at boot.

---

## 4. Differences: JPA vs. Hibernate vs. Spring Data JPA

| Aspect | Java Persistence API (JPA) | Hibernate | Spring Data JPA |
| :--- | :--- | :--- | :--- |
| **Type** | Specification | ORM Provider (Implementation) | Repository Abstraction Layer |
| **Role** | Defines standards and interfaces (JSR 338). | Implements the JPA interfaces and adds proprietary features. | Eliminates boilerplate code by generating runtime repository implementations. |
| **Boilerplate**| Medium | High (Session/Transaction management) | Very Low (Uses JpaRepository interfaces) |

### Code Comparison

#### Hibernate Code:
```java
public Integer addEmployee(Employee employee){
   Session session = factory.openSession();
   Transaction tx = null;
   Integer employeeID = null;
   try {
      tx = session.beginTransaction();
      employeeID = (Integer) session.save(employee); 
      tx.commit();
   } catch (HibernateException e) {
      if (tx != null) tx.rollback();
      e.printStackTrace(); 
   } finally {
      session.close(); 
   }
   return employeeID;
}
```

#### Spring Data JPA Code:
```java
// Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {}

// Service
@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void addEmployee(Employee employee) {
        employeeRepository.save(employee); // No Sessions, Trans, or Rollbacks to write!
    }
}
```

---

## 5. DDL-Auto Configurations in Hibernate

The `spring.jpa.hibernate.ddl-auto` property defines how the schema is generated or checked against the database:

1. **`create`**: Drops existing tables and creates new tables according to mappings. All existing data is lost.
2. **`update`**: Analyzes mappings. If a table or column doesn't exist, it adds them. It does not drop columns or modify column types if data might be lost.
3. **`validate`**: Validates the database tables and columns against entity mappings. If anything is missing or mismatched, it throws a boot exception. (Best for production).
4. **`create-drop`**: Creates tables at startup and drops them when the SessionFactory is closed (typical for unit tests).
