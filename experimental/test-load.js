$(document).ready(function(){
  // This does not work when there is no server involved? 
  // $.getJSON("test.json", function(data){ window.page_data = data; });
  simpleUpdate('#forks ul', 'fork', page_data.current_gist.forks);
  simpleUpdate('#revisions ul', 'revision', page_data.current_gist.revisions);
  simpleUpdate('#repos', 'gist_summary', page_data);
  updateGistFiles(page_data);
  updateComments(page_data);
  simpleUpdate('#comments-form', 'gist_comment_form', page_data);
});

function simpleUpdate(path, template, data) {
  $(path).html(Jaml.render(template, data));
}

Jaml.register("fork", function(fork){
  li(
    a({href: "http://gist.github.com/" + fork._id}, "gist: " + fork._id),
    " by ",
    a({href: "http://gist.github.com/" + fork.owner.username}, fork.owner.username),
    span({cls: "description"}),
    small(
      " created ",
      span({cls: "date"},
        abbr({cls: "relatize relatized", title: fork.created_at}, fork.created_at_alias)
      )
    )
  );
});

Jaml.register("revision", function(revision){
  li({cls: "other"},
    renderChanges(revision.changes_abbr),
    a({cls: "id", href: revision.view_url}, revision._id),
    a({cls: "author", href: revision.owner.view_url}, revision.owner.username),
    span({cls: "date"},
      abbr({cls: "relatize relatized", title: revision.created_at}, revision.created_at_alias)
    )
  );
});

Jaml.register("gist_summary", function(data){
  var gist = data.current_gist;
  var messages = data.messages;
  div({cls: "repo public"},
    div({cls: "title"},
      div({cls: "path"},
        messages.gist_label + gist._id,
        a({href: gist.download_url},
          img({cls: "button", alt: "Download_button", border: "0", src: "test_files/download_button.png"})),
        a({href: gist.fork_url},
          img({cls: "button", alt: "fork", src: "test_files/fork_button.png"})),
        a({href: gist.star_url},
          img({cls: "button", alt: "star", src: "test_files/star_button.png"}))),
      div({cls: "security public_security", style: ""},
        a({href: "#public_repo", rel: "facebox"},
          img({alt: "public", src: "test_files/public.png"}))),
      div({id: "private_repo", cls: "hidden"},
        messages.private_gist_desc),
      div({cls: "security public_security", style: "display: none;"},
        a({href: "#public_repo", rel: "facebox"},
          img({alt: "public", src: "test_files/public.png"}))),
      div({id: "public_repo", cls: "hidden"},
        messages.public_gist_desc)),
    div({cls: "meta"},
      table(
        tbody(
          tr(
            td({cls: "label"}, messages.description_label),
            td(
              div({cls: "description"},
                span({id: "gist-text-description", cls: "edit"}, gist.description)))),
          tr(
            td({cls: "label"}, messages.public_clone_label),
            td(
              a({cls: "git_url_facebox", href: gist.public_clone_url, rel: "#git-clone"}, gist.public_clone_url),
              div({id: "git-clone", style: "display: none; min-width: 500px;"},
                messages.public_clone_note,
                br(),
                code("git clone ", gist.public_clone_url, " gist-", gist._id)))),
          tr(
            td({cls: "label"}, messages.embed_label),
            td(
              a({cls: "gist-embed-link", href: "#"}, messages.show_embed_label),
              input({cls: "gist-embed-box", size: "25", style: "display: none;", type: "text", value: "&lt;script src=&quot;http://gist.github.com/" + gist._id + ".js&quot;&gt; &lt;/script&gt;"})))))));
});

function updateGistFiles(data) {
  var files = [];
  $.each(data.current_gist.files, function(){
    files.push({file: this, messages: data.messages});
  });
  simpleUpdate('#files', 'gist_file', files);
  $.each(data.current_gist.files, function(i){
    $("#files div.wikistyle:eq(" + i + ")").load(this.body_url);
  });
}

Jaml.register("gist_file", function(data){
  var file = data.file;
  var messages = data.messages;
  div({cls: 'file', id: file._id},
    div({cls: "meta clearfix"},
      div({cls: "info"},
        span({cls: "code"},
          file.title,
          a({href: file.url}, "#"))),
      div({cls: "actions"},
        div({id: "gist-embed", style: "display: inline;"},
          a({cls: "gist-embed-link", href: "#"}, messages.file_embed_label),
          input({cls: "gist-embed-box", size: "25", style: "display: none;", type: "text", value: file.embed_code})),
        a({href: file.raw_url}, messages.file_raw_label))),
    div({id: "readme", cls: "blob"},
      div({cls: "wikistyle"})));
});

function updateComments(data) {
  var commentCount = data.current_gist.comments.length;
  var text = commentCount + " Comment";
  if (commentCount > 1) text += "s";
  $('#comments h2').text(text);
  var comments = [];
  $.each(data.current_gist.comments, function() {
    comments.push({comment: this, messages: data.messages});
  });
  simpleUpdate('#comments .new-comments', 'gist_comment', comments);
}

Jaml.register("gist_comment", function(data){
  var comment = data.comment;
  var messages = data.messages;
  div({id: "gistcomment-" + comment._id, cls: "comment gist-comment"},
    div({cls: "cmeta"},
      p({cls: "author"},
        span({cls: "gravatar"},
          img({alt: "", height: "20", src: comment.author.gravatar, width: "20"})),
        strong({cls: "author"},
          a({href: comment.author.gists_url}, comment.author.username)),
        em(
          a({href: "#gistcomment-" + comment._id}, "commented"))),
      p({cls: "info"},
        em({cls: "date"},
          abbr({cls: "relatize relatized", title: comment.created_at}, comment.created_at_alias)),
        span({cls: "icon"}))),
    div({cls: "body"},
      div({cls: "formatted-content"},
        div({cls: "content-body wikistyle"}, comment.body))));
});

Jaml.register("gist_comment_form", function(data){
  var gist = data.current_gist;
  var author = data.logged_in_user;
  var messages = data.messages;
  form({action: "/" + gist._id + "/comment", method: "post"},
    div({style: "margin: 0pt; padding: 0pt;"},
      input({name: "authenticity_token", type: "hidden", value: data.authenticity_token})),
    p({cls: "comment-form-error", style: "display: none;"}, messages.blank_comment_error),
    div({cls: "comment-form previewable-comment-form"},
      messages.comment_note,
      ul({cls: "tabs inline-tabs"},
        li(
          a({cls: "selected", action: "write", href: "#write_bucket_comment"}, messages.write_comment_label)),
        li(
          a({action: "preview", href: "#preview_bucket_comment"}, messages.preview_comment_label))),
      div({id: "write_bucket_comment", cls: "tab-content", style: "display: block;"},
        textarea({id: "comment_body_comment", name: "comment[body]", tabindex: "1"})),
      div({id: "preview_bucket_comment", cls: "new-comments tab-content", style: "display: none;"},
        div({id: "openstruct-1", cls: "comment normal-comment"},
          div({cls: "cmeta"},
            p({cls: "author"},
              span({cls: "gravatar"},
                img({alt: "", height: "20", src: author.logo_url, width: "20"})),
              strong({cls: "author"},
                a({href: author.gists_url}, author.username)),
              em(
                a({href: "#openstruct-1"}, messages.commented_link_label))),
            p({cls: "info"},
              em({cls: "date"},
                abbr({cls: "relatize relatized", title: new Date()}, messages.now_label)),
              span({cls: "icon"}))),
          div({cls: "body"},
            div({cls: "formatted-content"},
              div({cls: "content-body wikistyle"}, messages.nothing_to_preview)))))),
    div({cls: "form-actions"},
      button({cls: "classy", type: "submit"},
        span(messages.comment_submit_label))))
});

// changes is a String like '++--**'
function renderChanges(changes){
  var s = "";
  for(var i=0; i<changes.length; i++) {
    var change = changes.charAt(i);
    if (change == '+')
      s += "<img alt='' src='test_files/dot_green.png' />";
    else if (change == '-')
      s += "<img alt='' src='test_files/dot_red.png' />";
    else if (change == '*')
      s += "<img alt='' src='test_files/dot_gray.png' />";
  }
  return s;
}
