$("form[name=signup_form]").on("submit", function(e) {
   
    
    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
   
  
    $.ajax({
        url: "/user/signup",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(resp) {
            window.location.href = "/dashboard/";
        },
        error: function(resp) {
            $error.text(resp.responseJSON.error).removeClass("error--hidden");
        }
    });
    e.preventDefault(); // Prevents the default form submission
});

$("form[name=login_form]").on("submit", function(e) {
    e.preventDefault(); // Prevents the default form submission
    
    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
  
    $.ajax({
        url: "/user/login",
        type: "POST",
        data: data,
        dataType: "json",
        success: function(resp) {
            window.location.href = "/dashboard/";
        },
        error: function(resp) {
            $error.text(resp.responseJSON.error).removeClass("error--hidden");
        }
    });
});