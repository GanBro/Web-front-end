// shoe.js

// 模拟一些鞋子的数据
var selectedSizes = [];
var shoes = [
  { name: "Shoe 1", price: 99.99, size: 35, category: "Basketball", brand: "Under Armour", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png","./imgs/Nike Kyrie 6 CNY EP.png","./imgs/Nike Kyrie 6 CNY EP.png","./imgs/Nike Kyrie 6 CNY EP.png",] },
  { name: "Shoe 2", price: 79.99, size: 36, category: "Running", brand: "New Balance", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 3", price: 129.99, size: 37, category: "Formal", brand: "Cole Haan", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 4", price: 89.99, size: 38, category: "Sneakers", brand: "Fila", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 5", price: 69.99, size: 39, category: "Hiking", brand: "Merrell", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 6", price: 119.99, size: 40, category: "Casual", brand: "Sperry", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 7", price: 99.99, size: 41, category: "Skateboarding", brand: "Vans", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 8", price: 79.99, size: 42, category: "Tennis", brand: "Asics", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 9", price: 139.99, size: 43, category: "Formal", brand: "Johnston & Murphy", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 10", price: 109.99, size: 44, category: "Sneakers", brand: "Puma", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 11", price: 89.99, size: 45, category: "Running", brand: "Under Armour", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 12", price: 149.99, size: 46, category: "Formal", brand: "Stacy Adams", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 13", price: 119.99, size: 35, category: "Skateboarding", brand: "DC Shoes", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 14", price: 99.99, size: 36, category: "Hiking", brand: "KEEN", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 15", price: 159.99, size: 37, category: "Formal", brand: "ECCO", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 16", price: 129.99, size: 38, category: "Sneakers", brand: "Fila", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 17", price: 109.99, size: 39, category: "Basketball", brand: "Nike", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 18", price: 179.99, size: 40, category: "Formal", brand: "Allen Edmonds", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  { name: "Shoe 19", price: 149.99, size: 41, category: "Sneakers", brand: "Reebok", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] },
  // { name: "Shoe 20", price: 129.99, size: 42, category: "Casual", brand: "Clarks", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png", smallImages: ["./imgs/Nike Kyrie 6 CNY EP.png"] }
];
var searchTerm; // 搜索内容

var shoesPerPage = 4;
var currentPage = 1;

// 在全局范围定义 openModal 函数
window.openModal = function (imagePath) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("modalImg");

  modal.style.display = "block";
  modalImg.src = imagePath;

  // 点击模态框以外的区域关闭模态框
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

// 在全局范围定义 closeModal 函数
window.closeModal = function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

function initializePagination() {
  var totalPages = Math.ceil(shoes.length / shoesPerPage);
  generatePaginationButtons(totalPages);
  displayShoesByPage(currentPage); // 显示初始界面
}

initializePagination();

function generatePaginationButtons(totalPages) {
  var paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  // 添加上一页按钮
  var prevButton = document.createElement("button");
  prevButton.textContent = "上一页";
  prevButton.className = "btn btn-outline-secondary page-btn";
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayShoesByPage(currentPage);
      updatePaginationButtons(totalPages); // 更新按钮状态
    }
  });
  paginationContainer.appendChild(prevButton);

  // 添加页码按钮
  for (var i = 1; i <= totalPages; i++) {
    var button = document.createElement("button");
    button.textContent = i;
    button.className = "btn btn-outline-secondary page-btn";

    button.addEventListener("click", function (event) {
      currentPage = parseInt(event.target.textContent);
      displayShoesByPage(currentPage);
      updatePaginationButtons(totalPages); // 更新按钮状态
    });

    paginationContainer.appendChild(button);
  }

  // 添加下一页按钮
  var nextButton = document.createElement("button");
  nextButton.textContent = "下一页";
  nextButton.className = "btn btn-outline-secondary page-btn";
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayShoesByPage(currentPage);
      updatePaginationButtons(totalPages); // 更新按钮状态
    }
  });
  paginationContainer.appendChild(nextButton);

  // 初始化时更新按钮状态
  updatePaginationButtons(totalPages);
}

function updatePaginationButtons(totalPages) {
  var buttons = document.getElementById("pagination-container").querySelectorAll("button.page-btn");

  // 移除所有按钮的高亮
  buttons.forEach(function (button) {
    button.classList.remove("active");
  });

  // 高亮显示当前页码按钮
  buttons.forEach(function (button) {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add("active");
    }
  });

  // 禁用或启用上一页和下一页按钮
  var prevButton = document.getElementById("pagination-container").querySelector("button");
  var nextButton = document.getElementById("pagination-container").querySelectorAll("button")[totalPages + 1];

  // 禁用或启用上一页按钮
  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  // 禁用或启用下一页按钮
  if (currentPage === totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

function displayShoesByPage(pageNumber) {
  var startIndex = (pageNumber - 1) * shoesPerPage;
  var endIndex = startIndex + shoesPerPage;
  var currentShoes = shoes.slice(startIndex, endIndex);
  displayShoes(currentShoes);
}


// 获取输入框元素
var searchInput = document.querySelector('input[type="text"]');

// 在线监听输入事件
searchInput.addEventListener('input', function(event) {
  searchTerm = event.target.value;
  event.preventDefault(); // 阻止表单提交
  filterShoes(); // 调用筛选函数
});

// 搜索按钮监听
const form = document.getElementById('search-form');
searchTerm = form.querySelector('input[type=text]').value;

form.addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单提交
  filterShoes(); // 调用筛选函数
});


var checkboxContainer = document.getElementById("checkboxContainer");

// 根据鞋子数据动态生成按字典序排序且去重的 checkbox 选项
var uniqueCategories = Array.from(new Set(shoes.map(shoe => shoe.category))).sort();

for (var i = 0; i < uniqueCategories.length; i++) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox" + (i + 1);

  var label = document.createElement("label");
  label.htmlFor = "checkbox" + (i + 1);
  label.innerHTML = uniqueCategories[i];

  var br = document.createElement("br");

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);
  checkboxContainer.appendChild(br);
}

var selectCategory = document.getElementById("selectCategory");
var sizeButtonsContainer = document.getElementById("sizeButtonsContainer");
var minPriceInput = document.getElementById("minPrice");
var maxPriceInput = document.getElementById("maxPrice");

// 监听下拉框的变化事件
selectCategory.addEventListener("change", filterShoes);

// 监听 sizeButtonsContainer 内部的按钮点击事件
sizeButtonsContainer.addEventListener("click", function (event) {
  // 检查点击的是否是尺码按钮
  if (event.target.classList.contains("size-btn")) {
    // 切换按钮的样式，保持激活状态
    event.target.classList.toggle("active");

    // 获取点击的尺码
    var selectedSize = parseInt(event.target.textContent, 10);

    // 在数组中存储选中的尺码
    if (!selectedSizes.includes(selectedSize)) {
      selectedSizes.push(selectedSize);
    } else {
      // 如果已经选中，则取消选择
      selectedSizes = selectedSizes.filter(size => size !== selectedSize);
    }

    // 根据选中的尺码筛选鞋子
    filterShoes();
  }
});

// 监听价格区间输入框失去焦点的事件
minPriceInput.addEventListener("blur", filterByPriceRange);
maxPriceInput.addEventListener("blur", filterByPriceRange);

// 显示鞋子的函数
function displayShoes(shoes) {
  var shoesContainer = document.getElementById("shoesContainer");
  shoesContainer.innerHTML = ""; // 清空容器

  // 遍历鞋子数据，创建卡片并添加到容器中
  shoes.forEach(function (shoe) {
    // 如果尺码被筛选，则显示对应尺码的鞋子
    if (selectedSizes.length === 0 || selectedSizes.includes(shoe.size)) {
      var cardHtml = `
        <div class="col-md-6 mb-3">
          <div class="card">
            <img src="${shoe.imagePath}" class="card-img-top" alt="${shoe.name}">
            <div class="card-body">
              <h5 class="card-title">${shoe.name}</h5>
              <div class="small-images-container">
                ${generateSmallImages(shoe)}
              </div>
              <p class="card-text">
                <strong>Category:</strong> ${shoe.category}<br>
                <strong>Brand:</strong> ${shoe.brand}<br>
                <strong>Price:</strong> $${shoe.price.toFixed(2)}<br>
                <strong>Size:</strong> ${shoe.size}
              </p>
            </div>
          </div>
        </div>
      `;

      shoesContainer.innerHTML += cardHtml;
    }
  });

  // 绑定小图片点击事件
  var smallImages = document.querySelectorAll(".small-image");
  smallImages.forEach(function (smallImage, index) {
    smallImage.addEventListener("click", function () {
      openModal(shoes[index].imagePath);
    });
  });
}
// 生成小图片的函数
function generateSmallImages(shoe) {
  var smallImagesHtml = "";
  shoe.smallImages.forEach(function (smallImage) {
    smallImagesHtml += `<img src="${smallImage}" class="small-image" alt="${shoe.name}" onclick="openModal('${smallImage}')">`;
  });
  return smallImagesHtml;
}

// 打开模态框
function openModal(imagePath) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("modalImg");

  modal.style.display = "block";
  modalImg.src = imagePath;

  // 点击模态框以外的区域关闭模态框
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// 关闭模态框
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// 监听checkbox的点击事件
checkboxContainer.addEventListener("click", filterShoes);

// 筛选鞋子
function filterShoes() {
  // const input = form.querySelector('input[type=text]');
  // const value = input.value.trim().toLowerCase(); // 获取搜索内容（转成小写并去掉首尾空格）
  const value = searchTerm.trim().toLowerCase();

  var minPrice = parseFloat(minPriceInput.value);
  var maxPrice = parseFloat(maxPriceInput.value);

  var sortBy = selectCategory.value;

  // 获取选中的类别
  var selectedCategories = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.labels[0].textContent);

  // 使用数组的 filter 方法过滤鞋子
  var filteredShoes = shoes.filter(function (shoe) {
    var sizeFilter = selectedSizes.length === 0 || selectedSizes.includes(shoe.size);
    var priceFilter = isNaN(minPrice) || isNaN(maxPrice) || (shoe.price >= minPrice && shoe.price <= maxPrice);
    var categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(shoe.category);
    
    // 根据搜索内容筛选
    var searchFilter = searchTerm === '' || 
      shoe.name.toLowerCase().includes(value) ||
      shoe.brand.toLowerCase().includes(value) ||
      shoe.category.toLowerCase().includes(value);

    return sizeFilter && priceFilter && categoryFilter && searchFilter;
  });

  // 根据选择的排序方式调整鞋子的顺序
  if (sortBy === "Price") {
    filteredShoes.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortBy === "Size") {
    filteredShoes.sort(function (a, b) {
      return a.size - b.size;
    });
  } else if (sortBy === "Category") {
    filteredShoes.sort(function (a, b) {
      return a.category.localeCompare(b.category);
    });
  } else if (sortBy === "Brand") {
    filteredShoes.sort(function (a, b) {
      return a.brand.localeCompare(b.brand);
    });
  }

  // 更新展示鞋子的网格
  displayShoes(filteredShoes);
}

// 添加价格区间筛选函数
function filterByPriceRange() {
  var minPrice = parseFloat(minPriceInput.value);
  var maxPrice = parseFloat(maxPriceInput.value);

  // 确保输入有效数字
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    // 使用数组的 filter 方法过滤价格范围内的鞋子
    var filteredShoes = shoes.filter(function (shoe) {
      return shoe.price >= minPrice && shoe.price <= maxPrice;
    });

    // 更新展示鞋子的网格
    displayShoes(filteredShoes);
  }
}
