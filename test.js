
window.onload = function(){
  console.log('Window Ready...');
  
    var uris = [
        '/testjsonpsync?name=first&param=0'
        , '/testjsonpsync?name=second&param=4'
        , '/testjsonpsync?name=third&param=1'
        , '/testjsonpsync?name=fourth&param=2'
        , '/testjsonpsync?name=fifth&param=1'
        , '/testjsonpsync?name=sixth&param=8'
        , '/testjsonpsync?name=seventh&param=1'
        , '/testjsonpsync?name=eighth&param=0'
    ];

    $json.psync({
        uris: uris,
        callback: function(data){
            console.log('DATA:', data);
            return data;
        }
    });


}
