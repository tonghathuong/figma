// ================================
// CART MANAGEMENT FUNCTIONS
// ================================

/**
 * Lấy giỏ hàng từ localStorage
 * @returns {Array} Mảng các sản phẩm trong giỏ
 */
function getCart() {
  return getLocalStorage('cart') || [];
}

/**
 * Lưu giỏ hàng vào localStorage
 * @param {Array} cart - Mảng sản phẩm
 */
function saveCart(cart) {
  setLocalStorage('cart', cart);
  updateCartCount();
}

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {Object} product - Thông tin sản phẩm {id, name, price, image, size}
 * @param {number} quantity - Số lượng
 * @returns {boolean} True nếu thêm thành công
 */
function addToCart(product, quantity = 1) {
  try {
    if (!product || !product.id) {
      showToast('Thông tin sản phẩm không hợp lệ!', 'error');
      return false;
    }

    if (quantity < 1) {
      showToast('Số lượng phải lớn hơn 0!', 'error');
      return false;
    }

    let cart = getCart();

    // Kiểm tra sản phẩm đã có trong giỏ chưa (cùng id và size)
    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && item.size === product.size
    );

    if (existingItemIndex !== -1) {
      // Sản phẩm đã có, tăng số lượng
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Sản phẩm mới, thêm vào giỏ
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size || 'M',
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }

    saveCart(cart);
    showToast('Đã thêm vào giỏ hàng!', 'success');
    return true;
  } catch (error) {
    console.error('Add to cart error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

/**
 * Cập nhật số lượng sản phẩm trong giỏ
 * @param {string} productId - ID sản phẩm
 * @param {string} size - Size sản phẩm
 * @param {number} quantity - Số lượng mới
 * @returns {boolean} True nếu cập nhật thành công
 */
function updateCartItem(productId, size, quantity) {
  try {
    if (quantity < 1) {
      return removeFromCart(productId, size);
    }

    let cart = getCart();
    const itemIndex = cart.findIndex(
      item => item.id === productId && item.size === size
    );

    if (itemIndex === -1) {
      showToast('Không tìm thấy sản phẩm trong giỏ hàng!', 'error');
      return false;
    }

    cart[itemIndex].quantity = quantity;
    saveCart(cart);
    return true;
  } catch (error) {
    console.error('Update cart item error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * @param {string} productId - ID sản phẩm
 * @param {string} size - Size sản phẩm
 * @returns {boolean} True nếu xóa thành công
 */
function removeFromCart(productId, size) {
  try {
    let cart = getCart();
    const newCart = cart.filter(
      item => !(item.id === productId && item.size === size)
    );

    if (newCart.length === cart.length) {
      showToast('Không tìm thấy sản phẩm trong giỏ hàng!', 'error');
      return false;
    }

    saveCart(newCart);
    showToast('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');
    return true;
  } catch (error) {
    console.error('Remove from cart error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

/**
 * Xóa toàn bộ giỏ hàng
 */
function clearCart() {
  saveCart([]);
  showToast('Đã xóa toàn bộ giỏ hàng!', 'success');
}

/**
 * Tính tổng tiền trong giỏ hàng
 * @returns {number} Tổng tiền
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

/**
 * Đếm số lượng sản phẩm trong giỏ
 * @returns {number} Tổng số lượng
 */
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Kiểm tra sản phẩm có trong giỏ không
 * @param {string} productId - ID sản phẩm
 * @param {string} size - Size sản phẩm
 * @returns {boolean} True nếu có trong giỏ
 */
function isInCart(productId, size) {
  const cart = getCart();
  return cart.some(item => item.id === productId && item.size === size);
}

/**
 * Lấy số lượng của sản phẩm trong giỏ
 * @param {string} productId - ID sản phẩm
 * @param {string} size - Size sản phẩm
 * @returns {number} Số lượng hoặc 0
 */
function getCartItemQuantity(productId, size) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId && item.size === size);
  return item ? item.quantity : 0;
}

/**
 * Render giỏ hàng ra HTML
 * @param {string} containerId - ID của container chứa giỏ hàng
 */
function renderCart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        <h3 class="mt-4 text-xl font-semibold text-gray-700">Giỏ hàng trống</h3>
        <p class="mt-2 text-gray-500">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
        <a href="products.html" class="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Xem sản phẩm
        </a>
      </div>
    `;
    return;
  }

  let html = '<div class="space-y-4">';
  
  cart.forEach(item => {
    html += `
      <div class="cart-item bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center space-x-4">
          <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800">${item.name}</h3>
            <p class="text-sm text-gray-600">Size: ${item.size}</p>
            <p class="text-green-600 font-bold">${formatCurrency(item.price)}</p>
          </div>
          <div class="quantity-control flex items-center space-x-2">
            <button onclick="decreaseQuantity('${item.id}', '${item.size}')" 
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100">
              <span class="text-lg">-</span>
            </button>
            <input type="number" value="${item.quantity}" 
                   onchange="updateQuantity('${item.id}', '${item.size}', this.value)"
                   class="w-16 text-center border border-gray-300 rounded-lg py-1" min="1">
            <button onclick="increaseQuantity('${item.id}', '${item.size}')" 
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100">
              <span class="text-lg">+</span>
            </button>
          </div>
          <div class="text-right">
            <p class="font-bold text-lg text-gray-800">${formatCurrency(item.price * item.quantity)}</p>
            <button onclick="removeCartItem('${item.id}', '${item.size}')" 
                    class="mt-2 text-red-600 hover:text-red-700 text-sm font-medium">
              Xóa
            </button>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

/**
 * Tăng số lượng sản phẩm
 */
function increaseQuantity(productId, size) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) {
    updateCartItem(productId, size, item.quantity + 1);
    renderCart('cart-items');
    updateCartSummary();
  }
}

/**
 * Giảm số lượng sản phẩm
 */
function decreaseQuantity(productId, size) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item && item.quantity > 1) {
    updateCartItem(productId, size, item.quantity - 1);
    renderCart('cart-items');
    updateCartSummary();
  }
}

/**
 * Cập nhật số lượng sản phẩm từ input
 */
function updateQuantity(productId, size, quantity) {
  const qty = parseInt(quantity);
  if (isNaN(qty) || qty < 1) {
    showToast('Số lượng không hợp lệ!', 'error');
    renderCart('cart-items');
    return;
  }
  updateCartItem(productId, size, qty);
  renderCart('cart-items');
  updateCartSummary();
}

/**
 * Xóa sản phẩm khỏi giỏ (với confirm)
 */
function removeCartItem(productId, size) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    removeFromCart(productId, size);
    renderCart('cart-items');
    updateCartSummary();
  }
}

/**
 * Cập nhật tổng tiền trong trang giỏ hàng
 */
function updateCartSummary() {
  const total = getCartTotal();
  const shipping = 30000; // Phí ship cố định
  const finalTotal = total + shipping;

  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(total);
  if (shippingEl) shippingEl.textContent = formatCurrency(shipping);
  if (totalEl) totalEl.textContent = formatCurrency(finalTotal);
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCart,
    saveCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    getCartItemQuantity,
    renderCart
  };
}
