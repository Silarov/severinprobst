var imgs;

$(document).ready(function () {
  function loadMain() {
    $("body").append(
      `
        <main>
            <div class="container js-flickity" data-flickity-options='{ "wrapAround": true, "autoPlay": true }'></div>
        </main>
        <footer></footer>
        `
    );
  }
  loadMain();

  function getFeedback() {
    $.ajax({
      async: false,
      url: "/json/img.json",
      dataType: "json",
      success: function (response) {
        imgs = response;
        loadImgs();
      },
    });
  }
  getFeedback();

  function loadImgs() {
    let path;
    let site;

    switch(location.pathname) {
        case "/index.html":
            site = "Home"
            break;
        case "/html/egypt.html":
            site = "Egypt"
            break;
        default:
            site = "Home"
            break;
    }
    if ($(window).height() > 800) {
        path = "/img/"+site+"/horizontal/";
        } else if ($(window).height() < 800) {
        path = "/img/"+site+"/vertical/";
        }
    $.each(imgs, function (key, img) {
      $(".container").append(
        `
        <div class='gallery-cell img' id='${img.id}'>\
            <img src='${
                (img.host === "local" ? path : img.host) + img.id + ".jpg"
            }' alt='${img.name}'>\
        </div>
        `
      );
    });
  }

  function loadFooter() {
    $("footer").append(
      `
        <a href="/index.html"><img src="/img/logo/Logo.png" alt="logo" class="logo"></a>
        <i class="fa-solid fa-bars hamburger"></i>
        <nav class="nav">
            <i class="fa-solid fa-xmark hamburger"></i>
            <div class="nav-sm">
                <ul>
                    <li><a href="/html/egypt.html" class="dt">Egypt</a></li>
                    <li><a href="" class="dt">Anima</a></li>
                    <li><a href="" class="dt">About</a></li>
                </ul>
            </div>
        </nav>
        `
    );
  }
  loadFooter();
});
