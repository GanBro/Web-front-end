// shoe.js

// 模拟一些鞋子的数据
var selectedSizes = [];
var shoes = [
  { name: "Shoe 1", price: 99.99, size: 35, category: "Sneakers", brand: "Nike", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png" },
  { name: "Shoe 2", price: 79.99, size: 36, category: "Casual", brand: "Adidas", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png" },
  { name: "Shoe 3", price: 129.99, size: 37, category: "Formal", brand: "Puma", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png" },
  // 添加更多鞋子的数据...
];

var checkboxContainer = document.getElementById("checkboxContainer");

// 根据鞋子数据动态生成 checkbox 选项
for (var i = 0; i < shoes.length; i++) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox" + (i + 1);

  var label = document.createElement("label");
  label.htmlFor = "checkbox" + (i + 1);
  label.innerHTML = shoes[i].category;

  var br = document.createElement("br");

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);
  checkboxContainer.appendChild(br);
}

// 显示鞋子的初始顺序
displayShoes(shoes);

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
}

// 监听checkbox的点击事件
checkboxContainer.addEventListener("click", filterShoes);

function filterShoes() {
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

    // 新增：检查鞋子的类别是否在选中的类别中
    var categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(shoe.category);

    return sizeFilter && priceFilter && categoryFilter;
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
