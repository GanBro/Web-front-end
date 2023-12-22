// shoe.js

// 模拟一些鞋子的数据
var shoes = [
  { name: "Shoe 1", price: 99.99, size: 9, category: "Sneakers", brand: "Nike", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png" },
  { name: "Shoe 2", price: 79.99, size: 8, category: "Casual", brand: "Adidas", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png" },
  { name: "Shoe 3", price: 129.99, size: 10, category: "Formal", brand: "Puma", imagePath: "./imgs/Nike Kyrie 6 CNY EP.png" },
  // 添加更多鞋子的数据...
];

// 显示鞋子的初始顺序
displayShoes(shoes);

var selectCategory = document.getElementById("selectCategory");

// 监听下拉框的变化事件
selectCategory.addEventListener("change", function () {
  // 获取当前选择的排序方式
  var sortBy = selectCategory.value;

  // 根据选择的排序方式调整鞋子的顺序
  if (sortBy === "Price") {
    shoes.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortBy === "Size") {
    shoes.sort(function (a, b) {
      return a.size - b.size;
    });
  } else if (sortBy === "Category") {
    shoes.sort(function (a, b) {
      return a.category.localeCompare(b.category);
    });
  } else if (sortBy === "Brand") {
    shoes.sort(function (a, b) {
      return a.brand.localeCompare(b.brand);
    });
  }

  // 更新展示鞋子的网格
  displayShoes(shoes);
});

// 显示鞋子的函数
function displayShoes(shoes) {
  var shoesContainer = document.getElementById("shoesContainer");
  shoesContainer.innerHTML = ""; // 清空容器

  // 遍历鞋子数据，创建卡片并添加到容器中
  shoes.forEach(function (shoe) {
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
  });
}

// 添加价格区间筛选函数
function filterByPriceRange() {
  var minPriceInput = document.getElementById("minPrice");
  var maxPriceInput = document.getElementById("maxPrice");

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

// 监听价格区间输入框失去焦点的事件
document.getElementById("minPrice").addEventListener("blur", filterByPriceRange);
document.getElementById("maxPrice").addEventListener("blur", filterByPriceRange);
