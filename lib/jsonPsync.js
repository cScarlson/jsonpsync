

var $json = (function(){
  function server(uri){
      var q = uri.split('?')[1], p = q.split('&'), params = {};
      for(var i in p){ var param = p[i].split('='); params[param[0]] = param[1]; }
      setTimeout(function(){
          window[params.callback](JSON.stringify({paramName: params.name + '__ran'}));
      }, params.param * 1000);
  }
  
  function callServer(uri, cb){
      window.jsonsync = cb;
      var url = uri + '&callback=jsonsync';
      var s = document.createElement('script');
      s.src = url;
      document.body.appendChild(s);
      document.body.removeChild(s);
      //server(url);  // for testing with pseudo-server
  }

  function $jsonPsync(opts){
      $jsonPsync.i = $jsonPsync.i || 0;
      if(opts && opts.uris && $jsonPsync.i < opts.uris.length){
          var uri = opts.uris[$jsonPsync.i];
          callServer(uri, function(data){
              //var $data = JSON.parse(data);
              var $data = data;
              if(opts.callback($data) === $data){
                  $jsonPsync.i += 1;
                  $jsonPsync(opts);
              }
          });
      }else if($jsonPsync.i === opts.uris.length){ delete window.jsonsync; }
  }
  
  return {
    psync: $jsonPsync
  };

})();












