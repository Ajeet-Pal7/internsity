function findInternship() {
    // const user = localStorage.getItem("user");
    openFullscreen();
    // window.location.href = "internships";
}
function openFullscreen() {
    elem = document.getElementById('body');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}