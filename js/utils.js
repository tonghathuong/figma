// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Hiển thị thông báo toast
 * @param {string} message - Nội dung thông báo
 * @param {string} type - Loại thông báo: 'success', 'error', 'warning'
 */
function showToast(message, type = 'success') {
  // Xóa toast cũ nếu có
  const oldToast = document.querySelector('.ds-toast');
  if (oldToast) {
    oldToast.remove();
  }

  // Tạo toast mới
  const toast = document.createElement('div');
  toast.className = `ds-toast ${type}`;
  toast.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <span class="text-lg mr-3">
          ${type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠'}
        </span>
        <span>${message}</span>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-500 hover:text-gray-700">
        ✕
      </button>
    </div>
  `;

  document.body.appendChild(toast);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 3000);
}

/**
 * Lấy dữ liệu từ localStorage
 * @param {string} key - Key trong localStorage
 * @returns {any} Dữ liệu đã parse hoặc null
 */
function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
}

/**
 * Lưu dữ liệu vào localStorage
 * @param {string} key - Key trong localStorage
 * @param {any} value - Giá trị cần lưu
 */
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
}

/**
 * Xóa dữ liệu khỏi localStorage
 * @param {string} key - Key cần xóa
 */
function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

/**
 * Format số tiền theo định dạng VND
 * @param {number} amount - Số tiền
 * @returns {string} Chuỗi đã format
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

/**
 * Tạo ID ngẫu nhiên
 * @returns {string} ID ngẫu nhiên
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Validate email
 * @param {string} email - Email cần validate
 * @returns {boolean} True nếu email hợp lệ
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate số điện thoại Việt Nam
 * @param {string} phone - Số điện thoại cần validate
 * @returns {boolean} True nếu số điện thoại hợp lệ
 */
function isValidPhone(phone) {
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return phoneRegex.test(phone);
}

/**
 * Cập nhật số lượng giỏ hàng trên header
 */
function updateCartCount() {
  const cart = getLocalStorage('cart') || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById('cart-count');
  
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    if (cartCount > 0) {
      cartBadge.classList.remove('hidden');
      cartBadge.classList.add('ds-pulse');
      setTimeout(() => {
        cartBadge.classList.remove('ds-pulse');
      }, 500);
    } else {
      cartBadge.classList.add('hidden');
    }
  }
}

/**
 * Cập nhật trạng thái đăng nhập trên header
 */
function updateAuthUI() {
  const currentUser = getLocalStorage('currentUser');
  const authContainer = document.getElementById('auth-container');
  
  if (authContainer) {
    if (currentUser) {
      authContainer.innerHTML = `
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Xin chào, <strong>${currentUser.name}</strong></span>
          <button onclick="logout()" class="text-red-600 hover:text-red-700 font-medium">
            Đăng xuất
          </button>
        </div>
      `;
    } else {
      authContainer.innerHTML = `
        <div class="flex items-center space-x-4">
          <a href="login.html" class="text-gray-700 hover:text-green-600 font-medium">
            Đăng nhập
          </a>
          <a href="register.html" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Đăng ký
          </a>
        </div>
      `;
    }
  }
}

/**
 * Đăng xuất
 */
function logout() {
  removeLocalStorage('currentUser');
  showToast('Đăng xuất thành công!', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

/**
 * Kiểm tra đăng nhập
 * @returns {boolean} True nếu đã đăng nhập
 */
function isLoggedIn() {
  return getLocalStorage('currentUser') !== null;
}

/**
 * Redirect về trang login nếu chưa đăng nhập
 */
function requireAuth() {
  if (!isLoggedIn()) {
    showToast('Vui lòng đăng nhập để tiếp tục!', 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return false;
  }
  return true;
}

/**
 * Debounce function
 * @param {Function} func - Hàm cần debounce
 * @param {number} wait - Thời gian chờ (ms)
 * @returns {Function} Hàm đã được debounce
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Scroll to top
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('open');
  }
}

/**
 * Highlight active menu item
 */
function highlightActiveMenu() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('.ds-nav-link');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Initialize app
 */
function initApp() {
  // Cập nhật số lượng giỏ hàng
  updateCartCount();
  
  // Cập nhật UI đăng nhập
  updateAuthUI();
  
  // Highlight menu active
  highlightActiveMenu();
  
  // Add scroll effect to navbar
  const navbar = document.querySelector('.ds-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

// Khởi tạo khi DOM loaded
document.addEventListener('DOMContentLoaded', initApp);
