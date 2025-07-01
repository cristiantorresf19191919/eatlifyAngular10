# Eatlify

Eatlify is a restaurant management and point-of-sale (POS) web application built with Angular. It enables restaurant owners and staff to manage products, categories, sales, cashiers, and real-time orders, all within a modern, responsive UI.

---

## Overview
Eatlify was created to streamline restaurant operations, from product and category management to real-time sales tracking and analytics. Its goal is to provide an all-in-one, easy-to-use platform for restaurants to handle daily business, improve efficiency, and gain insights into sales performance.

---

## Features
- User authentication and authorization
- Product and category management (CRUD)
- Sales and cashier management
- Real-time order updates (via sockets)
- Dashboard with sales summaries and analytics
- Export sales data to Excel
- Modifier groups and add-ons for products
- Responsive, modern UI with Angular Material and PrimeNG
- Multi-user support (admin, cashier roles)
- Visual feedback and notifications (SweetAlert2)
- File/image upload for products and restaurants

---

## Running the Project

### Prerequisites
- Node.js (v14+ recommended)
- Angular CLI

### Steps
```bash
git clone <your-repo-url>
cd eatlifyUI
npm install
npm start
```
- Visit [http://localhost:4200](http://localhost:4200) in your browser.

### Deployment
- **Eatlify is automatically deployed with [Netlify](https://www.netlify.com/) using CI/CD. Every push to the `master` branch triggers a new deployment.**
- *(Add your Netlify live link here if available)*

---

## Dependencies
- [Angular](https://angular.io/) (v13)
- [Angular Material](https://material.angular.io/)
- [PrimeNG](https://www.primefaces.org/primeng/)
- [RxJS](https://rxjs.dev/)
- [NgRx](https://ngrx.io/) (state management)
- [ngx-socket-io](https://github.com/rodgc/ngx-socket-io) (real-time)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Chart.js](https://www.chartjs.org/)
- [xlsx](https://github.com/SheetJS/sheetjs) (Excel export)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- [Cloudinary](https://cloudinary.com/) (image upload)

---

## Optional Additions

### ToDo List
- [ ] Add multi-language support
- [ ] Improve accessibility
- [ ] Add more analytics and reporting features
- [ ] Integrate with payment gateways

### Contributors
- [CristianScript](https://github.com/cristianscript) (main developer)

### Ways to Contribute
- Fork the repo, create a feature branch, and submit a pull request.
- Report bugs or request features via GitHub Issues.
- Please follow Angular and TypeScript best practices.

### Visuals
![image](https://github.com/user-attachments/assets/25b38230-231f-4db6-8c9e-24823cf8e766)
https://www.youtube.com/watch?v=SfyrkdAfeZw
https://www.youtube.com/watch?v=e3DtIFkjLvg


---

> Following best practices for documentation helps everyone use and contribute to Eatlify more effectively. Happy coding!
