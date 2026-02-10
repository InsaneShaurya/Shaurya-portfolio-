console.log("Portfolio Loaded Successfully 🚀");
// Welcome Message

window.onload = () => {
  console.log("Welcome to Shaurya's Portfolio 🚀");
};

// Button Click Effect

document.querySelectorAll(".buttons a").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.9)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 150);
  });
});
