// Optional animations or future dynamic behavior
document.addEventListener("DOMContentLoaded", () => {
    console.log("Home page loaded with animation");
  });
  // Sign Up Form Logic
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
  
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
  
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
  
        // Simulate saving user to localStorage
        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
  
        alert("Registration successful!");
        window.location.href = "login.html";
      });
    }
  });
  // Login Form Logic
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (
      storedUser.email === loginEmail &&
      storedUser.password === loginPassword
    ) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}
// Forgot Password Logic
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const forgotEmail = document.getElementById("forgotEmail").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === forgotEmail) {
      alert("✅ Password reset link has been sent to your email (mock).");
    } else {
      alert("❌ Email not found. Please check or sign up.");
    }
  });
}
// Dashboard Logic
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    let balance = localStorage.getItem("walletBalance") || 200;
  
    if (window.location.pathname.includes("dashboard.html")) {
      if (!isLoggedIn || !user) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
      }
  
      document.getElementById("welcomeText").textContent = `Welcome, ${user.name}`;
      document.getElementById("walletBalance").textContent = parseFloat(balance).toFixed(2);
  
      // Load mock trading chart
      const ctx = document.getElementById('liveChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [{
            label: 'Live Trades',
            data: [100, 120, 140, 130, 150],
            backgroundColor: 'rgba(0, 255, 204, 0.2)',
            borderColor: '#00ffcc',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  });
  
  // Start Trading Button
  function startTrading() {
    alert("Trading started... (mock)");
  }
  
  // Invest Button
  function invest() {
    let balance = parseFloat(localStorage.getItem("walletBalance") || 200);
    let amount = prompt("Enter amount to invest:");
    if (amount && !isNaN(amount)) {
      balance += parseFloat(amount);
      localStorage.setItem("walletBalance", balance);
      document.getElementById("walletBalance").textContent = balance.toFixed(2);
      alert("Investment successful!");
    }
  }
  
  // Withdraw Button
  function withdraw() {
    let balance = parseFloat(localStorage.getItem("walletBalance") || 200);
    let amount = prompt("Enter amount to withdraw:");
    if (amount && !isNaN(amount)) {
      if (parseFloat(amount) > balance) {
        alert("Insufficient funds.");
        return;
      }
      balance -= parseFloat(amount);
      localStorage.setItem("walletBalance", balance);
      document.getElementById("walletBalance").textContent = balance.toFixed(2);
      alert("Withdrawal successful!");
    }
  }
  
  // Logout
  function logout() {
    localStorage.removeItem("isLoggedIn");
  }
  // Plan Investment Logic
function selectPlan(planName, minAmount) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    let balance = parseFloat(localStorage.getItem("walletBalance") || 200);
  
    if (!isLoggedIn || !user) {
      alert("Please log in first.");
      window.location.href = "login.html";
      return;
    }
  
    const confirmInvest = confirm(`Invest in ${planName} Plan for at least $${minAmount}?`);
  
    if (confirmInvest) {
      if (balance >= minAmount) {
        balance -= minAmount;
        localStorage.setItem("walletBalance", balance);
        alert(`✅ Successfully invested $${minAmount} in ${planName} Plan!\nNew Wallet Balance: $${balance.toFixed(2)}`);
      } else {
        alert("❌ Insufficient balance to invest.");
      }
    }
  }
  // Admin Login
function adminLogin(e) {
    e.preventDefault();
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
  
    // Replace with secure credentials in production
    const adminUser = "admin";
    const adminPass = "admin123";
  
    if (username === adminUser && password === adminPass) {
      localStorage.setItem("isAdminLoggedIn", "true");
      alert("✅ Admin login successful");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("❌ Invalid admin credentials");
    }
  }
  function checkAdminAccess() {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      alert("Access denied. Please login as admin.");
      window.location.href = "admin-login.html";
      return;
    }
    loadDashboardData();
  }
  
  function adminLogout() {
    localStorage.removeItem("isAdminLoggedIn");
    alert("You have been logged out.");
    window.location.href = "admin-login.html";
  }
  
  function loadDashboardData() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const withdrawals = JSON.parse(localStorage.getItem("withdrawals")) || [];
    const investments = JSON.parse(localStorage.getItem("investments")) || [];
  
    document.getElementById("userCount").innerText = users.length;
    document.getElementById("withdrawalCount").innerText = withdrawals.length;
    document.getElementById("investmentCount").innerText = investments.length;
  
    const tableBody = document.getElementById("userTableBody");
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>$${user.balance || 0}</td>`;
      tableBody.appendChild(row);
    });
  }
  function logTransaction(email, type, amount) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const date = new Date().toLocaleString();
    transactions.push({ email, type, amount, date });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  logTransaction(currentUser.email, "Deposit", 200);

  function logTransaction(email, type, amount) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const date = new Date().toLocaleString();
    transactions.push({ email, type, amount, date });
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  logTransaction(currentUser.email, "Deposit", 200);

  
