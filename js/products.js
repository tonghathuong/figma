// ================================
// PRODUCT DATA & MANAGEMENT
// ================================

// Dữ liệu sản phẩm mẫu
const PRODUCTS = [
  // Trà sữa
  {
    id: 'ts-001',
    name: 'Trà Sữa Truyền Thống',
    category: 'tra-sua',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
    description: 'Trà sữa truyền thống với hương vị đậm đà, thơm ngon',
    popular: true,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'ts-002',
    name: 'Trà Sữa Matcha',
    category: 'tra-sua',
    price: 40000,
    image: '/images/cach-lam-tra-sua-matcha-thom-ngon-tai-nha1.webp',
    description: 'Trà sữa matcha Nhật Bản, vị ngọt thanh dịu nhẹ',
    popular: true,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'ts-003',
    name: 'Trà Sữa Chocolate',
    category: 'tra-sua',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
    description: 'Sự kết hợp hoàn hảo giữa trà sữa và chocolate ngọt ngào',
    popular: false,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'ts-004',
    name: 'Trà Sữa Khoai Môn',
    category: 'tra-sua',
    price: 38000,
    image: '/images/0_dcceb04098b44f8cafaf0189a4566dcb.webp',
    description: 'Trà sữa khoai môn thơm béo, đậm vị',
    popular: true,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'ts-005',
    name: 'Trà Sữa Dâu Tây',
    category: 'tra-sua',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400',
    description: 'Trà sữa dâu tây tươi mát, ngọt thanh',
    popular: false,
    sizes: ['S', 'M', 'L']
  },

  // Cà phê
  {
    id: 'cf-001',
    name: 'Cà Phê Đen Đá',
    category: 'ca-phe',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    description: 'Cà phê đen nguyên chất, đậm đà hương vị Việt Nam',
    popular: true,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'cf-002',
    name: 'Cà Phê Sữa',
    category: 'ca-phe',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    description: 'Cà phê sữa đá truyền thống Sài Gòn',
    popular: true,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'cf-003',
    name: 'Bạc Xỉu',
    category: 'ca-phe',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    description: 'Cà phê sữa Bạc Xỉu ngọt dịu, thơm béo',
    popular: false,
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'cf-004',
    name: 'Cappuccino',
    category: 'ca-phe',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    description: 'Cappuccino Ý đậm đà với bọt sữa mịn màng',
    popular: true,
    sizes: ['S', 'M', 'L']
  },

  // Nước ép
  {
    id: 'ne-001',
    name: 'Nước Ép Cam',
    category: 'nuoc-ep',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    description: 'Nước ép cam tươi 100%, giàu vitamin C',
    popular: true,
    sizes: ['M', 'L']
  },
  {
    id: 'ne-002',
    name: 'Nước Ép Dưa Hấu',
    category: 'nuoc-ep',
    price: 28000,
    image: '/images/cach-lam-nuoc-ep-dua-hau-4.jpg',
    description: 'Nước ép dưa hấu mát lạnh, ngọt thanh',
    popular: false,
    sizes: ['M', 'L']
  },
  {
    id: 'ne-003',
    name: 'Nước Ép Ổi',
    category: 'nuoc-ep',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
    description: 'Nước ép ổi tươi giàu vitamin và chất xơ',
    popular: false,
    sizes: ['M', 'L']
  },

  // Sinh tố
  {
    id: 'st-001',
    name: 'Sinh Tố Bơ',
    category: 'sinh-to',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
    description: 'Sinh tố bơ béo ngậy, thơm ngon bổ dưỡng',
    popular: true,
    sizes: ['M', 'L']
  },
  {
    id: 'st-002',
    name: 'Sinh Tố Dâu',
    category: 'sinh-to',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
    description: 'Sinh tố dâu tây tươi mát lạnh',
    popular: true,
    sizes: ['M', 'L']
  },
  {
    id: 'st-003',
    name: 'Sinh Tố Xoài',
    category: 'sinh-to',
    price: 40000,
    image: '/images/cach-lam-sinh-to-xoai.jpg',
    description: 'Sinh tố xoài ngọt thơm, đậm đà',
    popular: false,
    sizes: ['M', 'L']
  },

  // Soda
  {
    id: 'sd-001',
    name: 'Soda Chanh',
    category: 'soda',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    description: 'Soda chanh tươi mát, giải khát tuyệt vời',
    popular: true,
    sizes: ['M', 'L']
  },
  {
    id: 'sd-002',
    name: 'Soda Blue Curaçao',
    category: 'soda',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',
    description: 'Soda blue curaçao màu xanh đẹp mắt, vị ngọt dịu',
    popular: false,
    sizes: ['M', 'L']
  },
  {
    id: 'sd-003',
    name: 'Soda Việt Quất',
    category: 'soda',
    price: 30000,
    image: '/images/soda-viet-quat-6.jpg',
    description: 'Soda việt quất tươi mát, thơm ngon',
    popular: false,
    sizes: ['M', 'L']
  },
  {
    id: 'sd-004',
    name: 'Soda Bạc hà',
    category: 'soda',
    price: 30000,
    image: '/images/nuoc-bac-ha.jpg',
    description: 'Soda bạc hà tươi mát, thơm ngon',
    popular: false,
    sizes: ['M', 'L']
  }
];

/**
 * Lấy tất cả sản phẩm
 * @returns {Array} Mảng sản phẩm
 */
function getAllProducts() {
  return PRODUCTS;
}

/**
 * Lấy sản phẩm theo ID
 * @param {string} productId - ID sản phẩm
 * @returns {Object|null} Sản phẩm hoặc null
 */
function getProductById(productId) {
  return PRODUCTS.find(p => p.id === productId) || null;
}

/**
 * Lấy sản phẩm theo danh mục
 * @param {string} category - Tên danh mục
 * @returns {Array} Mảng sản phẩm
 */
function getProductsByCategory(category) {
  if (!category || category === 'all') {
    return PRODUCTS;
  }
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Lấy sản phẩm phổ biến
 * @param {number} limit - Giới hạn số lượng
 * @returns {Array} Mảng sản phẩm
 */
function getPopularProducts(limit = 8) {
  return PRODUCTS.filter(p => p.popular).slice(0, limit);
}

/**
 * Tìm kiếm sản phẩm
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Array} Mảng sản phẩm
 */
function searchProducts(keyword) {
  if (!keyword || keyword.trim() === '') {
    return PRODUCTS;
  }

  const searchTerm = keyword.toLowerCase().trim();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm)
  );
}

/**
 * Lọc sản phẩm theo khoảng giá
 * @param {number} minPrice - Giá tối thiểu
 * @param {number} maxPrice - Giá tối đa
 * @returns {Array} Mảng sản phẩm
 */
function filterByPrice(minPrice = 0, maxPrice = Infinity) {
  return PRODUCTS.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

/**
 * Sắp xếp sản phẩm
 * @param {Array} products - Mảng sản phẩm
 * @param {string} sortBy - Tiêu chí sắp xếp: 'price-asc', 'price-desc', 'name'
 * @returns {Array} Mảng đã sắp xếp
 */
function sortProducts(products, sortBy = 'default') {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

/**
 * Render danh sách sản phẩm
 * @param {Array} products - Mảng sản phẩm
 * @param {string} containerId - ID của container
 */
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-4 text-xl font-semibold text-gray-700">Không tìm thấy sản phẩm</h3>
        <p class="mt-2 text-gray-500">Vui lòng thử lại với từ khóa khác</p>
      </div>
    `;
    return;
  }

  let html = '';
  
  products.forEach(product => {
    html += `
      <div class="ds-product-card bg-white rounded-xl shadow-sm overflow-hidden ds-hover-scale ds-fade-in">
        <div class="relative overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
          ${product.popular ? '<span class="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Phổ biến</span>' : ''}
          <div class="ds-overlay">
            <a href="product-detail.html?id=${product.id}" 
               class="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-600 hover:text-white transition">
              Xem chi tiết
            </a>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-green-600">${formatCurrency(product.price)}</span>
            <button onclick="quickAddToCart('${product.id}')" 
                    class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}
function quickAddToCart(productId) {
  const product = getProductById(productId);
  if (product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M'
    }, 1);
  }
}

/**
 * Lấy danh sách danh mục
 * @returns {Array} Mảng danh mục
 */
function getCategories() {
  return [
    { id: 'all', name: 'Tất cả' },
    { id: 'tra-sua', name: 'Trà Sữa' },
    { id: 'ca-phe', name: 'Cà Phê' },
    { id: 'nuoc-ep', name: 'Nước Ép' },
    { id: 'sinh-to', name: 'Sinh Tố' },
    { id: 'soda', name: 'Soda' }
  ];
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getPopularProducts,
    searchProducts,
    filterByPrice,
    sortProducts,
    renderProducts,
    getCategories
  };
}
