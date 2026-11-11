document.currentScript.insertAdjacentHTML("beforebegin", `
  <div class="announcement-bar">A little treat for you — free delivery on orders over Rs. 5,000 <span>♡</span></div>
  <header class="site-header">
    <nav class="navbar navbar-expand-lg container" aria-label="Main navigation">
      <a class="navbar-brand soul-logo" href="index.html">soul<span>.</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#soulNav" aria-controls="soulNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="soulNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link" href="index.html#shop">Shop</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#categories">Collections</a></li>
          <li class="nav-item"><a class="nav-link" href="index.html#story">Our story</a></li>
        </ul>
        <a class="cart-link" href="cart.html" aria-label="Shopping bag"><i class="bi bi-bag"></i><span>Bag</span><b class="cart-count" data-cart-count>0</b></a>
      </div>
    </nav>
  </header>
`);
