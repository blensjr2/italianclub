const alert = document.getElementById("alert")

if (alert) {
  alert.onclick = () => {
    alert.style.display = "none"
  }
}
