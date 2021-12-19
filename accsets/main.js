
  console.log("Hello World")
  // $(document).ready(function() {
  //   $(`.content-img a`).fancybox();
  // });
  // slider
  // let $ = document.querySelector(document)
  $(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        Infinity: true,
        prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        dots: false,
        responsive: [
            {
            breakpoint: 1060,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true
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
                dots: true,
            }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
  });
window.onload = function() {

  // Validator-----------------------------------------------------------------------
  function Validator(formSeclector) {
    var _this = this;
    var formRules = {};

    function getParent(element, Selector) {
      while(element.parentElement){
        if(element.parentElement.matches(Selector)) {
          return element.parentElement
        }
        element = element.parentElementl;
      }
    }

    // các rule -> có lỗi thì show error/ ko có lỗi thì undifine
    
    var validatorRules = {
      required(value) {
        return value ? undefined : `Vui lòng nhập trường này`
      },
      number(value) {
        return Number(value) ? undefined : `Trường này phải là số điện thoại`
      },
      email(value) {
        var regex  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined : "Trường này phải là email"
      },
      min(min) {
        return function (value) {
          return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
        }
      },
      max(max) {
        return function (value) {
          return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} kí tự`
        }
      }
    };

    var ruleName = `required`

    // lấy ra form cần validate
    var formElement = document.querySelector(formSeclector)
    
    // chỉ xử lý khi có form đó
    if (formElement) {

      var inputs = formElement.querySelectorAll(`[name][rules]`)
      
      for(var input of inputs){
        var rules = input.getAttribute(`rules`).split(`|`)
        for(var rule of rules) {

          var isRuleHasValue = rule.includes(`:`)
          var ruleInfo;

          // trường hợp rule có :
          if(isRuleHasValue){
            ruleInfo = rule.split(`:`)
            rule = ruleInfo[0]
          }
          
          var ruleFunc = validatorRules[rule]

          if(isRuleHasValue){
            ruleFunc = validatorRules[rule](ruleInfo[1])
          }

          if(Array.isArray(formRules[input.name])){
            formRules[input.name].push(ruleFunc)
          } else {
            formRules[input.name] = [ruleFunc]
          }
        }

        // lắng nghe sự kiện để validate (blur, input, change...)
        input.onblur = handleValidate;
        input.oninput = handleClearValidate;

      }

      // hàm thực hiện validate
      function handleValidate(event) {
        var rules = formRules[event.target.name]
        // console.log(rules)
        var errorMessage;

        for (var rule of rules) {
          errorMessage = rule(event.target.value)
          if (errorMessage) break;
        }
        // nếu có lỗi thì show error
        if(errorMessage) {
          var formGourp = getParent(event.target, `.input-box`)
          if(formGourp) {
            var formMessage = formGourp.querySelector(`.form-message`);
            if(formMessage) {
              formMessage.innerText = errorMessage
            }
          }
        }

        // trả về bloolen để xem có lỗi hay ko
        return !errorMessage
      }

      // hàm thực hiện bỏ validate khi người dùng nhập vào
      function handleClearValidate(event) {
        var formGourp = getParent(event.target, `.input-box`)
        if(formGourp) {
          var formMessage = formGourp.querySelector(`.form-message`);
          if(formMessage) {
            formMessage.innerText = ``
          }
        }
      }
      // console.log(formRules)
    } 
    // console.log(this)

    // hàm xử lý khi submit form
    var formSubmit = formElement.querySelector(`.form-submit`)
    formSubmit.onclick = function(event) {
      // console.log(_this)
      var inputs = formElement.querySelectorAll(`[name][rules]`)
      var isValid = true;

      for(var input of inputs){
        if(!handleValidate({target : input})){
          isValid = false;
        }
      }
      
      // khi không có lỗi thì submit form
      if(isValid) {
        if(typeof _this.onSubmit === `function`) {
          var enableInputs = formElement.querySelectorAll(`[name]`)               
            // conver nodelist sang array
            var formValues = Array.from(enableInputs).reduce((values, input) => {  
                // values[input.id] = input.value  
                switch (input.type) {
                    case "checkbox" :
                        if (!input.matches(`:checked`)){
                            values[input.name] = ``
                            return values
                        }
                        if(!Array.isArray(values[input.name])){
                            values[input.name] = []
                        }
                        values[input.name].push(input.value)
                        break;
                    case "radio" :
                        values[input.name] = formElement.querySelector(`input[name="` + input.name + `"]:checked`).value
                        break;
                    case `file` :
                        values[input.name] = input.files
                        break;
                    default :
                        values[input.name] = input.value  
                }          
                return values;
            }, {})

            // gọi lại hàm và trả về giá trị của form
            _this.onSubmit(formValues)
        } else {
          formElement.submit();
        }
      }


      
    }
  }




  // countdown ----------------------------------------------------------
  function countDown(date, selector) {
    const countDate = new Date(`${date} 00:00:00`).getTime()
    const now = new Date().getTime()
    // khoảng thời gian đếm ngược mili giây
    const gap = countDate - now

    // how the time work?
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    // tính ra thời gian cụ thể
    // floor(x): trả về kiểu double = một số nguyên và không lớn hơn đối số (vd: 3.14 -> 3.0)
    // chia số dư %: lấy phần dư thời gian còn lại 
    const textDay = Math.floor(gap / day)
    const textHour = Math.floor((gap % day) / hour)
    const textMinute = Math.floor((gap % hour) / minute)
    const textSecond = Math.floor((gap % minute) / second)

    // render html
    var dayContent = document.querySelector(`.${selector} .countdown-day h2`)
    var hourContent = document.querySelector(`.${selector} .countdown-hour h2`)
    var muniteContent = document.querySelector(`.${selector} .countdown-munite h2`)
    var secondContent = document.querySelector(`.${selector} .countdown-second h2`)
    
    if(dayContent && hourContent && muniteContent && secondContent) {
      dayContent.innerText = textDay
      hourContent.innerText = textHour
      muniteContent.innerText = textMinute
      secondContent.innerText = textSecond

      if (textDay <= 0 && textHour <= 0 && textMinute <= 0 && textSecond <= 0) {
        document.querySelector(`.event__btn`).style.color = `red`
        document.querySelector(`.event__btn`).textContent = "Đang diễn ra"
        dayContent.innerText = "00"
        hourContent.innerText = "00"
        muniteContent.innerText = "00"
        secondContent.innerText = "00"
    }
  }
    }



  setInterval(() => {
      countDown(`december 25, 2021`, 'count__evetn__1');
      countDown(`december 27, 2021`, 'count__evetn__2');
  }, 1000);


  var likeBtns = document.querySelectorAll('.likeBtn')
  // console.log(likeBtns)
  for(var i=0; i<likeBtns.length; i++) {
    likeBtns[i].onclick = function() {
      this.classList.toggle('active')
      if(this.classList.contains('active')){
        var totalLike = this.querySelector('span').textContent++
      } else {
        var totalLike = this.querySelector('span').textContent--
      }
      
    }
  }

  // 1 đầu ra mong muốn (validator)
var form = new Validator(`#contact-form`);

form.onSubmit = function(formData) {
    console.log(formData)
  
   alert("Yêu cầu của bạn đã được gửi đi, chúng mình sẽ liên hệ với bạn sớm nhất")
}


var eventBtns = document.querySelectorAll('.event__btn')
var test = document.querySelector('.event-container')

for(var i=0; i<eventBtns.length; i++) {
  var checkEventBtn = false;
  eventBtns[i].onclick = function() {
      console.log(this.getAttribute('setID'))
      checkEventBtn = true;
      window.location="./event.html";
  }
}



var viewMoreBtns = document.querySelectorAll('.introduce__btn')
var test = 0;
   
  Array.from(viewMoreBtns).map((viewMoreBtn) => {
    viewMoreBtn.onclick = function() {
      // console.log(viewMoreBtns[i].getAttribute('setid'))
      window.location = './img.html'
      test =  viewMoreBtn.getAttribute('setId')
      console.log(test)
    }


  })
    

  var menuIcon = document.querySelector('.menu_rps')

  if(menuIcon) {
    menuIcon.onclick = function() {
      menuIcon.classList.toggle('active')
    }
  }

}


