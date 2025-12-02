// ================================
// AUTHENTICATION FUNCTIONS
// ================================

/**
 * Đăng ký tài khoản mới
 * @param {Object} userData - Thông tin người dùng {name, email, password}
 * @returns {boolean} True nếu đăng ký thành công
 */
function register(userData) {
  try {
    // Lấy danh sách users hiện có
    let users = getLocalStorage('users') || [];

    // Kiểm tra email đã tồn tại
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      showToast('Email đã được sử dụng!', 'error');
      return false;
    }

    // Validate dữ liệu
    if (!userData.name || userData.name.trim().length < 2) {
      showToast('Tên phải có ít nhất 2 ký tự!', 'error');
      return false;
    }

    if (!isValidEmail(userData.email)) {
      showToast('Email không hợp lệ!', 'error');
      return false;
    }

    if (!userData.password || userData.password.length < 6) {
      showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
      return false;
    }

    // Tạo user mới
    const newUser = {
      id: generateId(),
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password, // Trong thực tế nên hash password
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: new Date().toISOString()
    };

    // Thêm vào danh sách
    users.push(newUser);
    setLocalStorage('users', users);

    // Tự động đăng nhập sau khi đăng ký
    const userToStore = { ...newUser };
    delete userToStore.password; // Không lưu password vào currentUser
    setLocalStorage('currentUser', userToStore);

    showToast('Đăng ký thành công!', 'success');
    return true;
  } catch (error) {
    console.error('Register error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

/**
 * Đăng nhập
 * @param {string} email - Email
 * @param {string} password - Mật khẩu
 * @returns {boolean} True nếu đăng nhập thành công
 */
function login(email, password) {
  try {
    // Validate input
    if (!email || !password) {
      showToast('Vui lòng nhập đầy đủ thông tin!', 'error');
      return false;
    }

    // Lấy danh sách users
    const users = getLocalStorage('users') || [];

    // Tìm user
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      showToast('Email hoặc mật khẩu không đúng!', 'error');
      return false;
    }

    // Lưu user hiện tại (không lưu password)
    const userToStore = { ...user };
    delete userToStore.password;
    setLocalStorage('currentUser', userToStore);

    showToast(`Xin chào ${user.name}!`, 'success');
    return true;
  } catch (error) {
    console.error('Login error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

/**
 * Lấy thông tin user hiện tại
 * @returns {Object|null} Thông tin user hoặc null
 */
function getCurrentUser() {
  return getLocalStorage('currentUser');
}

/**
 * Cập nhật thông tin user
 * @param {Object} userData - Thông tin cần cập nhật
 * @returns {boolean} True nếu cập nhật thành công
 */
function updateUserProfile(userData) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      showToast('Vui lòng đăng nhập!', 'error');
      return false;
    }

    // Lấy danh sách users
    const users = getLocalStorage('users') || [];
    
    // Tìm và cập nhật user
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
      showToast('Không tìm thấy thông tin người dùng!', 'error');
      return false;
    }

    // Validate dữ liệu
    if (userData.name && userData.name.trim().length < 2) {
      showToast('Tên phải có ít nhất 2 ký tự!', 'error');
      return false;
    }

    if (userData.phone && !isValidPhone(userData.phone)) {
      showToast('Số điện thoại không hợp lệ!', 'error');
      return false;
    }

    // Cập nhật thông tin
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };

    // Lưu vào localStorage
    setLocalStorage('users', users);

    // Cập nhật currentUser
    const updatedUser = { ...users[userIndex] };
    delete updatedUser.password;
    setLocalStorage('currentUser', updatedUser);

    showToast('Cập nhật thông tin thành công!', 'success');
    return true;
  } catch (error) {
    console.error('Update profile error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

/**
 * Đổi mật khẩu
 * @param {string} oldPassword - Mật khẩu cũ
 * @param {string} newPassword - Mật khẩu mới
 * @returns {boolean} True nếu đổi mật khẩu thành công
 */
function changePassword(oldPassword, newPassword) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      showToast('Vui lòng đăng nhập!', 'error');
      return false;
    }

    // Lấy danh sách users
    const users = getLocalStorage('users') || [];
    
    // Tìm user
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
      showToast('Không tìm thấy thông tin người dùng!', 'error');
      return false;
    }

    // Kiểm tra mật khẩu cũ
    if (users[userIndex].password !== oldPassword) {
      showToast('Mật khẩu cũ không đúng!', 'error');
      return false;
    }

    // Validate mật khẩu mới
    if (!newPassword || newPassword.length < 6) {
      showToast('Mật khẩu mới phải có ít nhất 6 ký tự!', 'error');
      return false;
    }

    // Cập nhật mật khẩu
    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date().toISOString();

    // Lưu vào localStorage
    setLocalStorage('users', users);

    showToast('Đổi mật khẩu thành công!', 'success');
    return true;
  } catch (error) {
    console.error('Change password error:', error);
    showToast('Có lỗi xảy ra, vui lòng thử lại!', 'error');
    return false;
  }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    register,
    login,
    getCurrentUser,
    updateUserProfile,
    changePassword
  };
}
