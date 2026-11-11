document.currentScript.insertAdjacentHTML("beforebegin", `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-newsletter">
        <div><span class="eyebrow">A little love in your inbox</span><h2>Good things look good <span>on you.</span></h2><p>New drops, style notes, and 10% off your first order.</p></div>
        <form class="newsletter-form" id="newsletter-form"><label class="visually-hidden" for="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required><button type="submit" aria-label="Subscribe"><i class="bi bi-arrow-right"></i></button><span class="newsletter-message" aria-live="polite"></span></form>
      </div>
      <div class="footer-main">
        <div class="footer-brand"><a class="soul-logo" href="index.html">soul<span>.</span></a><p>Wear what feels like you.<br>Made with a little extra love.</p><div class="social-links"><a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="#" aria-label="Pinterest"><i class="bi bi-pinterest"></i></a><a href="#" aria-label="TikTok"><i class="bi bi-tiktok"></i></a></div></div>
        <div class="footer-links"><h3>Explore</h3><a href="index.html#shop">Shop all</a><a href="index.html#categories">Collections</a><a href="index.html#story">Our story</a></div>
        <div class="footer-links"><h3>Here to help</h3><a href="mailto:hello@soul.example">Contact us</a><a href="mailto:hello@soul.example">Delivery & returns</a><a href="mailto:hello@soul.example">FAQs</a></div>
        <div class="footer-note"><span>✿</span><p>Be kind to yourself.<br>And wear the cute outfit.</p></div>
      </div>
      <div class="footer-bottom"><span>© 2026 Soul. Made for your moments.</span><span>Made with <i class="bi bi-heart-fill"></i> for the everyday you.</span></div>
    </div>
  </footer>
`);
