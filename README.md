# 📊 FinTrack – Personal Finance Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen)](https://finance-dashboard-theta-ten.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

---

## 🖼️ Screenshots

### Admin Dashboard

#### Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/5ed640d2-1af0-42f8-a2d6-ed556c0b5aec)

#### Transactions
![Transactions](https://github.com/user-attachments/assets/51b76a48-1032-46d9-8d88-b5eba5674913)

#### Insights
![Insights](https://github.com/user-attachments/assets/7d7066de-4644-4289-b6cf-601d0b40d6f9)

#### Add Transaction
![Add Transaction](https://github.com/user-attachments/assets/b391b6b9-8ea4-425d-8ffd-74f5efef6da4)

### Viewer Dashboard

#### Dashboard
![Viewer Dashboard](https://github.com/user-attachments/assets/ead90f70-c526-4937-9647-3bdf6f3cdf88)

#### Transactions
![Transactions](https://github.com/user-attachments/assets/c7fc247a-a6ef-4458-88b8-2440ee638c6d)

#### Dark Mode
![Dark Mode](https://github.com/user-attachments/assets/a9ac90f1-270a-4730-9239-85f7772151db)

---

## ✨ Features

| Module | Capabilities |
|--------|--------------|
| **📈 Dashboard** | Summary cards (balance, income, expenses, savings rate) • 6-month bar chart • Spending donut chart • Recent transactions |
| **💳 Transactions** | Add / Edit / Delete • Search • Filter (type, category, month) • Sort any column • CSV export |
| **💡 Insights** | Top spending category • Savings rate gauge • Monthly comparison • Smart observations |
| **🎨 UX** | Dark/Light theme • Admin/Viewer roles • Keyboard shortcuts • Toast notifications • Fully responsive |

---

## 🛠️ Tech Stack

- **Frontend**: HTML5 • CSS3 • Vanilla JavaScript
- **Data Storage**: LocalStorage API
- **Visualization**: SVG Charts

---

## 🚀 Quick Start

### Clone & Run

```bash
git clone https://github.com/T-Durgaprasad-Reddy/Finance-Dashboard.git
cd Finance-Dashboard
# Open index.html with Live Server
```

---

## 📁 Project Structure

```
Finance-Dashboard/
├── index.html       # Application structure & layout
├── style.css        # Styling, themes & responsive design
└── script.js        # Core application logic
```

---

## 📖 Usage Guide

| Action | How to Use |
|--------|-----------|
| ➕ **Add Transaction** | Click "+ Add Transaction" button (Admin mode only) |
| ✏️ **Edit/Delete** | Click the edit (✏️) or delete (🗑️) icons in the transaction row |
| 🔍 **Search & Filter** | Use the search box or dropdown filters (type, category, month) |
| 🔄 **Sort Data** | Click any column header to sort ascending/descending |
| 💾 **Export** | Click "Export" button to download data as CSV |
| 👥 **Switch Role** | Use the sidebar dropdown to toggle Admin/Viewer mode |
| 🌙 **Toggle Theme** | Click the moon (🌙) or sun (☀️) icon in the header |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| <kbd>Ctrl</kbd> + <kbd>N</kbd> | New Transaction |
| <kbd>Ctrl</kbd> + <kbd>D</kbd> | Go to Dashboard |
| <kbd>Ctrl</kbd> + <kbd>T</kbd> | Go to Transactions |
| <kbd>Ctrl</kbd> + <kbd>I</kbd> | Go to Insights |

---

## 🔧 Customization

### Add Custom Categories
Edit the `CATS` array in `script.js`:
```javascript
const CATS = ['Groceries', 'Transport', 'Entertainment', 'Healthcare', ...];
```

### Change Currency Format
Modify the `fmt()` function in `script.js`:
```javascript
const fmt = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
```

### Update Color Scheme
Edit CSS variables in `style.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --background: #fff;
  --text: #000;
}
```

---

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| **Lighthouse Score** | 95+ |
| **Bundle Size** | ~45KB |
| **Browser Support** | All modern browsers |
| **Responsiveness** | Mobile • Tablet • Desktop |

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

---

**Made with ❤️ by [T-Durgaprasad-Reddy](https://github.com/T-Durgaprasad-Reddy)**