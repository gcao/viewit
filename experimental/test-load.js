$(document).ready(function(){
  $('#forks ul').html(Jaml.render('fork', data.current_gist.forks));
});

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
