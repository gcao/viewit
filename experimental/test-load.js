$(document).ready(function(){
  simpleUpdate('#forks ul', 'fork', data.current_gist.forks);
  simpleUpdate('#revisions ul', 'revision', data.current_gist.revisions);
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
