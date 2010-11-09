$(document).ready(function(){
  simpleUpdate('#forks ul', 'fork', data.current_gist.forks);
  simpleUpdate('#revisions ul', 'revision', data.current_gist.revisions);
  simpleUpdate('#repos', 'gist_summary', data);
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
              input({cls: "gist-embed-box", size: "25", style: "display: none;", type: "text", value: "&lt;script src=&quot;http://gist.github.com/" + gist._id + ".js&quot;&gt; &lt;/script&gt;"})))))))
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
