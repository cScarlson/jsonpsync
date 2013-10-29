jsonpsync
=========

*** QuickStart
Include the library:
`<script>src="/js/jsonpsync/lib/jsonPsync.js"></script>`

Implementation:

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
        
Test REST server in Node Express:

          /**
           * Module dependencies.
           */

          var express = require('express')
            , routes = require('./routes')
            , user = require('./routes/user')
            , http = require('http')
            , path = require('path');

          var app = express();

          app.configure(function(){
            app.set('port', process.env.PORT || 3000);
            app.set('views', __dirname + '/views');
            app.set('view engine', 'jade');
            app.use(express.favicon());
            app.use(express.logger('dev'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(app.router);
            app.use(express.static(path.join(__dirname, 'public')));
          });

          app.configure('development', function(){
            app.use(express.errorHandler());
          });

          app.get('/', routes.index);
          app.get('/users', user.list);
          
          // $jsonPsync
          app.set('jsonp callback', true);
          app.get('/testjsonpsync', function(req, res){
            var name = req.query.name
              , param = req.query.param;
            console.log('###', req.query.name);
            setTimeout(function(){
              res.jsonp({'you sent': name});
            }, param * 1000);
          });
          

          http.createServer(app).listen(app.get('port'), function(){
            console.log("Express server listening on port " + app.get('port'));
          });



