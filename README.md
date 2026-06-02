# 🍽️ Smart Restaurant Ordering System
### QR + WhatsApp + PWA Based Digital Ordering Platform

> LABS0010 · Problem 4  
> Phase 03 — Build the Base MVP  
> Solution A: QR + WhatsApp + PWA Stack

---

## 📖 Project Overview

Smart Restaurant Ordering System is a mobile-first digital ordering platform designed to simplify restaurant ordering using QR codes, online payments, and automated WhatsApp confirmations.

Customers can scan a QR code placed on a restaurant table or counter, browse the menu through a Progressive Web App (PWA), place orders, complete payments using Razorpay, and instantly receive WhatsApp order confirmations.

The system is designed as a real end-to-end MVP with scalable architecture and modular components. :contentReference[oaicite:0]{index=0}

---

# 👥 Team Members

| Member | Role |
|---|---|
| **Nidal CMP** | Pod Lead · Integration |
| **Tanya Mariam Viji** | Frontend · PWA & Menu UI |
| **Alna** | Backend · API & Database |
| **Liya Zainab** | WhatsApp Integration |
| **Aysha Zaha Zahir** | Payments & QR Code |
| **Ziba Yousuf** | Data Model & Documentation |

---

# 🚀 Features

✅ QR Code Based Ordering  
✅ Progressive Web App (PWA)  
✅ Real-time Cart System  
✅ Razorpay Payment Integration  
✅ WhatsApp Order Confirmation  
✅ Backend API with Database Storage  
✅ Mobile-Friendly Responsive Design  
✅ End-to-End Order Workflow  

---

# 🔄 End-to-End Workflow

1. Customer scans QR code  
2. Menu opens in browser (PWA)  
3. Customer adds items to cart  
4. Payment completed using Razorpay  
5. WhatsApp confirmation is sent automatically  
6. Order stored in database for restaurant staff  

:contentReference[oaicite:1]{index=1}

---

# 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | React.js / HTML-CSS-JS |
| Backend | Node.js + Express |
| Database | Firebase Firestore / Supabase |
| Payments | Razorpay |
| Messaging | Twilio WhatsApp Sandbox |
| QR Generation | QRCode.js |
| Hosting | Vercel + Render |

:contentReference[oaicite:2]{index=2}

---

# 📂 Folder Structure

```bash
labs0010-problem4
│
├── frontend/        # PWA frontend files
├── backend/         # API & backend services
├── docs/            # Documentation & diagrams
├── data/            # Menu and sample data
│
├── README.md
└── .gitignore
