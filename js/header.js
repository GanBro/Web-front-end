// header.js
export function createHeader() {
  return `
    <header>
      <div class="bg-light py-3">
        <div class="container d-flex justify-content-between align-items-center">
          <a class="navbar-brand" href="#" style="font-size: 24px">Shoe.</a>
          <form class="d-flex custom-search">
            <div class="input-group">
              <button class="btn btn-outline-primary" type="submit">
                <i class="fas fa-search search-icon"></i>
              </button>
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
      </div>
      <hr class="header-divider" /> <!-- 添加浅灰色分割线 -->
    </header>
  `;
}
