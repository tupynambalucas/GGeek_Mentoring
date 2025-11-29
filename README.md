# 🌟 Geek Management - Technical Mentorship & Advisory

This repository serves as a **technical advisory and implementation support center** for the "Geek Management (GG)" final course project, developed by **Vitória Rodrigues Ferreira**.

My role is to provide specialized technical guidance, assist with architecture design, and support the implementation of key features for the system.

---

## 🚀 Project Overview: Geek Management (GG)

The **Geek Management** system is designed as a comprehensive management solution for the **Geek Station** retail store. Its primary goal is to **optimize operational control** by streamlining inventory management, sales processing, and customer data handling.

The solution is based on a **modern web architecture**, allowing management to obtain a panoramic view of store performance while providing attendants and cashiers with agile interfaces for customer service, sales processing, and quick product lookups.

| Detail | Specification |
| :--- | :--- |
| **System Name** | Geek Management (GG) |
| **Version** | 1.02 |
| **Developed For** | Geek Station Retail Store |
| **Core Purpose** | Stock Control, Sales Processing, and Customer Data Management |

---

## 🏗️ Technical Specifications & Stack

The project adopts a modern and modular architecture, divided between the production environment and development tools (Monorepo).

### **Production Architecture**
* **Model:** Client-Server (RESTful API)
* **Back-end:** Java with JDBC and Hibernate
* **Database:** MySQL
* **Front-end:** HTML5, CSS3, JavaScript (ES Modules)
* **Build Tool:** Vite (with Axios for HTTP requests)

### **Development Environment (Mocking)**
To allow parallel Front-end development, a provisional server is used:
* **Runtime:** Node.js
* **Framework:** Fastify with TypeScript
* **Function:** Simulates the Java API (Mock) to validate business rules and JSON data flow.

---

## 🔒 Access Roles and Permissions (RBAC)

The system integrates distinct functionalities tailored to different access profiles, ensuring robust information flow management through strict permissioning (Role-Based Access Control).

| Profile | Key Permissions | Main Responsibilities |
| :--- | :--- | :--- |
| **Admin** | Unrestricted access (Employees, Products, Sales, Reports). | System oversight, full data management, and employee registration. |
| **Manager** | Full access to operations and reports. <br>**(Restricted from deleting sales records)**. | Daily operations, reporting, and staff supervision. |
| **Attendant** | **Products** (Register/Edit/Delete) and **Customers** (Register/Edit). | Stock flow management and customer registration. |
| **Cashier** | **Sales** (Register/View) and **Customers** (Register/Edit). | Finalizing sales (POS) and quick customer registration. |

---

## ✅ Core Functional Requirements (FR)

The system is built around managing four main entities and ensuring efficient operational flow:

### 1. Entity Management & Registration
* **FR001 – Customer Registration:** Required by Attendant and Cashier profiles. <br>*(Mandatory Data: Name, CPF, Phone, Gender).*
* **FR002 – Product Registration:** Required by Attendant profile. <br>*(Mandatory Data: Name, Price, Code, Stock Quantity, Category, Description).*
* **FR003 – Sales Registration (POS):** Required by Cashier profile. <br>*(Mandatory Data: Product, Sale Date, Sale Code, Unit Price, Quantity, Linked Customer).*
* **FR004 – Employee Registration:** Required by Administrator and Manager profiles. <br>*(Mandatory Data: Name, CPF, Address details, Role).*

### 2. Inquiry and Listing
* **FR005 / FR006 / FR007:** System must allow authorized staff to **Consult** detailed records for Customers, Products, and Sales.
* **FR008 / FR009 / FR010:** System must present comprehensive **Listing Tables** for Customers, Products, and Sales History.
    * *Extra Permissions:* Admins/Managers can Edit and/or Delete records in these listings (Managers cannot delete sales).

### 3. Operational Features
* **FR011 – Catalog Maintenance:** The **Attendant** must be able to add, edit, and remove products from the catalog to keep inventory updated.
* **FR012 – Payment Methods:** System must process Credit Card, Debit Card, and Cash payments.

---

## 🛡️ Non-Functional Requirements (NFR)

The system prioritizes the following non-functional aspects:

* **NFR001 – Usability:** The web interface must be responsive, intuitive, and user-friendly, ensuring efficiency for users without advanced technical training.
* **NFR002 – Security:**
    * **Authentication:** Encrypted password storage (Hash).
    * **Authorization:** Backend validation of user roles.
    * **Integrity:** Logging of all financial transactions.
* **NFR003 – Reliability:** Implementation of regular database backup routines to mitigate data loss risks.

---

### **Need to collaborate or inquire about the technical implementation?**

Feel free to reach out to the project developer, **Vitória Rodrigues Ferreira**, or the technical mentor (via this repository's owner).