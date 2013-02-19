define(function(require, exports, module) {    
    function enableCSRFProtection($) {
        // Most of this code is taken verbatim from Django docs:
        // https://docs.djangoproject.com/en/dev/ref/contrib/csrf/
        
        // Utility function to get cookie values
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };
                    
        // Add CSRF info
        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }
        
        $.ajaxPrefilter(function(options, originalOptions, xhr) {
            if (!options.hasOwnProperty("crossDomain")) {
                options.crossDomain = false;
            }
            
            var type = options["type"] || "";
            if (!csrfSafeMethod(type)) {
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            }
        });
    };
    
    function enableUnauthorizationRedirection($, loginURL, logoutURL) {
        $(document).bind('ajaxError', function(ev, xhr, opts, err) {
            var pathname = window.location.pathname;
            
            if (xhr.status === 401 && pathname.indexOf(logoutURL) === -1) {
                var returnTo = encodeURIComponent(pathname + document.location.search);
                document.location = loginURL + "?return_to=" + returnTo;
                return;
            } 
        });
    };
    
    return {
        enableCSRFProtection: enableCSRFProtection,
        enableUnauthorizationRedirection: enableUnauthorizationRedirection
    };
});