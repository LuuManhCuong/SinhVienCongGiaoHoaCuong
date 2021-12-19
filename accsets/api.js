    console.log("api.js")
// lấy Api 
// var imgApi = 'http://localhost:3000/images'
// var eventApi = 'http://localhost:3000/events'

var imgApi = 'https://luumanhcuong.github.io/SinhVienCongGiaoHoaCuong/json_server/db.json'
var eventApi = 'https://luumanhcuong.github.io/SinhVienCongGiaoHoaCuong/json_server/db.json'


function start() {
        // lấy apiImg và xử lý
    getApiImages(renderImg);
    getApiImages(renderActiveImg)
    getApiEvents(renderEvents)
    getApiEvents(renderActivities)  
}
start();

function getApiImages(calback) {
    fetch(imgApi)
      .then((response) => response.json())

      .then(calback)

    //   .catch(() => {
    //     alert("không thể truy cập dữ liệu")
    //    })
}


function renderImg(data) {
    var imgs = data.images
    // console.log(imgs[0])

    // sidebar title
    var sidebarBlock = document.querySelector('.sidebar')
    // khối ảnh tương ứng mỗi sidebar title
    var imgBlock = document.querySelector('.content-img')


    if(sidebarBlock) {
        // render title
        var sidebarTitle = imgs.map((img) => {
            return `
            <li class="sidebar__item" setId=${img.id}>
                <ion-icon name="play-outline"></ion-icon>
                <h3>${img.title}</h3>
            </li>
            `
        })
        sidebarBlock.innerHTML = sidebarTitle.join('')
    }

    curentDefault(0)
    
    function curentDefault(id) {
        var curentActive = document.querySelectorAll('.sidebar__item')[id]
        if(curentActive) {
            curentActive.classList.add('active')
        }
        // render ảnh mặc định
        var curentImgBlock = imgs[id]
        if(imgBlock) {
            var imgHtml = curentImgBlock.imgs.map((img) => {
                return `
                    <a data-aos="fade-up" data-fancybox="gallery" href="${img}">
                        <img src="${img}" alt="">
                    </a>
                `
            })
            imgBlock.innerHTML = imgHtml.join('')
        }
    }
    var sidebarTitles = document.querySelectorAll('.sidebar__item')
    if(sidebarTitles) {
        for(var i=0; i<sidebarTitles.length; i++) {
            sidebarTitles[i].onclick = function() {
    
                // render ảnh 
                var sidebarActive = this
                var removeActive = document.querySelector('.sidebar__item.active')
                if(removeActive) {
                    removeActive.classList.remove('active')
                }
    
                sidebarActive.classList.add('active')
            
                var sidebarIndex = Number(sidebarActive.getAttribute('setId'))
                if(typeof sidebarIndex === 'number') {
                    var imgElementActive = imgs[sidebarIndex-1]
                    if(imgElementActive) {
                        var imgHtml = imgElementActive.imgs.map((img) => {
                            return `
                                <a data-aos="fade-up" data-fancybox="gallery" href="${img}">
                                    <img src="${img}" alt="">
                                </a>
                            `
                        })
                        imgBlock.innerHTML = imgHtml.join('')
                    }
                }
                
                $(document).ready(function(){
                    $(window).scrollTop(0);
                });
            }
        }
    }
    // console.log(sidebarTitles)
}

// render hoạt động nổi bật
function renderActiveImg(data) {
    var images = data.images
    var imgBlock = document.querySelector('.render__imgs')
    if(imgBlock) {
        var imgBlockHtml =  images.map((image) => {
            
            return `
                <div class="col l-2-4">
                    <div class="introduce__img">
                        <div class="likeBtn likeBtn__${image.id}">
                            <i class="far fa-heart"></i>
                            <i class="fas fa-heart"></i>
                            <span>${image.like}</span>
                        </div>
                        <img src="${image.imgs[0]}" alt="img">
                        <div class="introduce__img__context">
                            <h4>${image.title}</h4>
                            <p>${image.date}</p>
                        </div>
                        <button class="introduce__btn" setId="${image.id}">xem thêm</button>
                    </div>
                </div>
            `
        })
        imgBlock.innerHTML = imgBlockHtml.join('')

        // slick tour
        $(document).ready(function(){
            $('.render__imgs').slick({
                slidesToShow: 5,
                slidesToScroll: 2,
                autoplay: true,
                autoplaySpeed: 2000,
                Infinity: true,
                prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
                dots: true,
                responsive: [
                    {
                    breakpoint: 1060,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        arrows: false
                    }
                    },
                    {
                    breakpoint: 740,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true,
                    }
                    },
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        Infinity: false,
                        centerMode: true,
                        centerPadding: '10px',
                        dots: false,
                    }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        });
    }
}


// render các hoạt động
function renderActivities(data) {
    var events = data.events
    
    var activeBlock = document.querySelector('.event-group')
    if(activeBlock) {
        var formActiveHtml = events.map((event) => {
            return `
                <div class="join-group" event-id="${event.id}">
                    <div class="form-context">
                        <h3>sắp diễn ra</h3>
                        <h2>${event.name}</h2>
                        <p>Gắn kết, giao lưu, học hỏi, chia sẻ và nâng đỡ nhau để thăng tiến hơn trong đời sống Đức Tin và giúp cho các bạn sinh viên khi tham gia vào có một kỹ năng hoạt động nhóm tốt và có phương pháp học tốt nhất cho mình.</p>
                    </div>
                    
                    <div id="contact-us-wrap" class="contact-us-wrap">
                        <div class="grid">
                            <div class="row">
                                <div class="col l-12 m-12">
                                    <div class="contact-us">
                                        <div class="contact-us__container">
                                            <div class="contact-info event-poster">
                                                <img src="${event.poster[1]}" alt="">
                                            </div>
                                            
                                            <div class="contact-form" id="contact-form">
                                                <h2>${event.title}</h2>
                                                <div class="form-box">
                                                    <div class="input-box w100 event-wraper">
                                                        <div class="event-form">
                                                            <ul class="event-form__info">
                                                                <li>
                                                                    <p class="event-form__time">7:00</p>
                                                                </li>
                                                                <li>
                                                                    <p class="event-form__date">20/12/2021</p>
                                                                </li>
                                                                <li>
                                                                    <p class="event-form__address">nhà thờ Hòa Cường</p>
                                                                </li>
                                                            </ul>   
                                                            <div class="event-form__title">
                                                                <input type="checkbox" name="activities" value="test1" required>
                                                                <h3>dọn dẹp nhà thờ</h3>
                                                            </div>
                                                        </div>
                                                        <div class="event-form">
                                                            <ul class="event-form__info">
                                                                <li>
                                                                    <p class="event-form__time">20:00</p>
                                                                </li>
                                                                <li>
                                                                    <p class="event-form__date">20/12/2021</p>
                                                                </li>
                                                                <li>
                                                                    <p class="event-form__address">120, trần hưng đạo, sơn trà, đà nẵng</p>
                                                                </li>
                                                            </ul>   
                                                            <div class="event-form__title">
                                                                <input type="checkbox" name="activities" value="test1" required>
                                                                <h3>dọn dẹp nhà thờ</h3>
                                                            </div>
                                                        </div>
                                                        <div class="event-form">
                                                            <ul class="event-form__info">
                                                                <li>
                                                                    <p class="event-form__time">19:00</p>
                                                                </li>
                                                                <li>
                                                                    <p class="event-form__date">20/12/2021</p>
                                                                </li>
                                                                <li>
                                                                    <p class="event-form__address">nhà thờ Hòa Cường</p>
                                                                </li>
                                                            </ul>   
                                                            <div class="event-form__title">
                                                                <input type="checkbox" name="activities" value="test1" required>
                                                                <h3>dọn dẹp nhà thờ</h3>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                    <div class="input-box w100">
                                                        <button class="form-submit">tham gia tất cả</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        })
        activeBlock.innerHTML = formActiveHtml.join('')
    }

    var eventBlock = document.querySelectorAll('.join-group')
    if(eventBlock) {
        for(var i=0; i<eventBlock.length; i++) {
            eventElement = eventBlock[i].querySelector('.event-wraper')
            // console.log(eventElement)
            if(eventElement) {
                var activeHtml = events[i].activities.map((active) => {
                    return `
                        <div class="event-form">
                            <ul class="event-form__info">
                                <li>
                                    <p class="event-form__time">${active.time}</p>
                                </li>
                                <li>
                                    <p class="event-form__date">${active.date}</p>
                                </li>
                                <li>
                                    <p class="event-form__address">${active.address}</p>
                                </li>
                            </ul>   
                            <div class="event-form__title">
                                <input type="checkbox" name="${events[i].title}" value="${active.title}" required>
                                <h3>${active.title}</h3>
                            </div>
                        </div>
                    `
                })
        
                eventElement.innerHTML = activeHtml.join('')
            }



            var submitBtns = document.querySelectorAll('.form-submit')
            // console.log(submitBtns[i]);
            submitBtns[i].onclick = function() {
                var formCheckBox = this.parentElement.parentElement.parentElement   
                var nameTitle = formCheckBox.querySelector('h2').textContent
                console.log(nameTitle) 
                var checkBoxList = formCheckBox.querySelectorAll('[name]')
                // console.log(checkBoxList)
                var thamgia = [];
                for (var i=0; i<checkBoxList.length; i++) {
                    // console.log(checkBoxList[i])
                    checkBoxList[i].checked = true;
                    if(checkBoxList[i].checked) {
                        thamgia.push(checkBoxList[i].value)
                    }
                    // checkBoxList[i].onclick = function() {
                    //     console.log('hihi')
                    // }
                }
                console.log(thamgia)
                this.textContent = "Đã tham gia"
                setTimeout(() => {
                    this.textContent = "Tham gia tất cả"
                }, 3000);
                
            }
        }
    }
}
  

// --------------------------------------


function getApiEvents(callback) {
    fetch(eventApi)
        .then((response) => response.json())
        .then(callback)
        // .catch(() => {
        //     alert("có lỗi xảy ra")
        // })
}



function renderEvents(data) {
    var events = data.events
    var eventsBlock = document.querySelector('.render-events')

    var eventHtml = events.map((event) => {
        // console.log(event)

        return `
            <div class="col l-5 m-6">
                <div class="event">
                    <img src="${event.poster[0]}" alt="img_event">
                    <h3>${event.name}</h3>
                    <h4>${event.date}</h4>
                    <button class="event__btn" setId="${event.id}">xem các hoạt động</button>
                    <ul class="event__countdown count__evetn__${event.id}">
                        <li class="event_count countdown-day">
                            <h2>00</h2>
                            <p>Ngày</p>
                        </li>
                        <li class="event_count countdown-hour">
                            <h2>00</h2>
                            <p>Giờ</p>
                        </li>
                        <li class="event_count countdown-munite">
                            <h2>00</h2>
                            <p>Phút</p>
                        </li>
                        <li class="event_count countdown-second">
                            <h2>00</h2>
                            <p>Giây</p>
                        </li>
                    </ul>
                </div>
            </div>
        `
    })

    if(eventsBlock) {
        eventsBlock.innerHTML = eventHtml.join('')
    }



}

var menuIcon = document.querySelector('.menu_rps')

if(menuIcon) {
    menuIcon.onclick = function() {
        menuIcon.classList.toggle('active')
    }
}








 