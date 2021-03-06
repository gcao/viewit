$(function () {
    $("ul.inline-tabs").tabs();
    $(".previewable-comment-form").previewableCommentForm();
    $(".new-comments .comment").editableComment();

    function d(a) {
        $(a).each(function () {
            var b = $(this).find("input.gist-name-textbox").enhancedField(),
                c = $(this).find(".gist-lang-desc"),
                e = $(this).find(".gist-lang");

            function f() {
                if (b.val() == "") {
                    c.hide();
                    e.show()
                } else {
                    c.show();
                    e.hide()
                }
            }
            f();
            b.keyup(f)
        })
    }
    d(".file");
    var i = $(".topsearch input[name=q]").enhancedField();
    $.hotkey("s", function () {
        i.val("").focus()
    });
    $(".gist-description").keypress(function (a) {
        if (a.keyCode == 13) {
            $(this).next().click();
            return false
        }
    });
    $(".remove-button").click(function () {
        if (confirm("Remove this file?")) {
            $(this).parent().parent().parent().append('<p class="removed">file removed</p>');
            $(this).parent().parent().remove()
        }
        var a = $(".file-contents").size();
        a < 2 && $(".remove-button").hide()
    });

    function j() {
        $("#edit-block").toggle();
        $("#gist-text-description").toggle();
        $("#gist-edit-button").toggle();
        $("#gist-description").is(":visible") && $("#gist-description").focus();
        return false
    }
    $("#gist-edit-button").click(j);
    $(".save-description").click(function () {
        var a = $("#gist-id").attr("value"),
            b = $("#gist-description").attr("value");
        a = "/gists/" + a + "/update_description";
        $.post(a, {
            description: b
        }, function (c) {
            $("#edit-block").hide();
            $("#gist-text-description").show();
            $("#gist-edit-button").show();
            $("#gist-text-description").html(c);
            return false
        });
        return false
    });
    $("#add-gist").click(function () {
        var a = $(".file").size() + 1;
        if (a > 10) {
            alert("Too many files. Please remove some (or consider creating a GitHub repository.)");
            return false
        }
        var b = "new" + a;
        $("#files").append('<div id="' + b + '"></div>');
        $("#" + b).load("/gists/new_file", {
            order: a
        }, function () {
            d("#" + b)
        });
        return false
    });
    $("#private-clone-url > a").bind("contextmenu", function () {
        var a = $(this).text().length;
        $(this).hide().next().attr("size", a).show().focus().get(0).select();
        return false
    });

    function g() {
        $(this).hide().prev().show()
    }
    $("#private-clone-url > :input").mouseout(g).blur(g);
    $(".git_url_facebox").click(function () {
        $.facebox($($(this).attr("rel")).html(), "tip");
        return false
    });
    $(".gist-embed-link").each(function () {
        var a =
        $(this),
            b = a.next(".gist-embed-box");

        function c() {
            a.toggle();
            b.toggle();
            b.is(":visible") && b.get(0).select();
            return false
        }
        a.click(c);
        b.blur(c)
    });
    $.facebox && $("a[rel*=facebox]").facebox();
    $.fn.relatizeDate && $(".relatize").relatizeDate();
    if ($("#csrf_token").length > 0) {
        var h = "&request_uri=" + window.location.pathname + "&authenticity_token=" + $("#csrf_token").text();
        $.ajaxSetup({
            beforeSend: function (a, b) {
                a.setRequestHeader("Accept", "text/javascript");
                if (typeof b.data == "string") b.data += h;
                else if (!b.data) b.data = h
            }
        })
    } else $.ajaxSetup({
        beforeSend: function (a) {
            a.setRequestHeader("Accept", "text/javascript")
        }
    })
});