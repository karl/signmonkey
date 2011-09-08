var http = require('http');
var sys = require('sys');
var querystring = require('querystring');

var express = require('express');
var rest = require('restler');

var app = express.createServer(express.logger());

var create_page = function(request, response) {
    var tagName = request.params.tag;
    var guid = request.params.guid || '0C297806-AD8A-E094-12F0-A686F09CCCD1';
    
    var currentTag = tags[0];
    
    tags.forEach(function(tag) {
        if (tag.link === tagName) {
            currentTag = tag;
        }
    });
    
    currentTag.configString = JSON.stringify(currentTag.config);
    
    var currentPresentation = {
        guid: guid
    }
    
    var domain = 'signmonkey.kuluvalley.com';

    get_html(domain, currentPresentation.guid, 'title', 'asc', 1, 'title--alternateWords', 'video', function(url, presentationHtml) {
        currentPresentation.htmlUrl = url;
        currentPresentation.html = presentationHtml;
        
        get_html(domain, currentTag.config.guid, currentTag.config.sortField || 'title', currentTag.config.sortDirection || 'asc', currentTag.config.size || 1000, 'title--alternateWords', '/word-#{guid}', function(url, widgetHtml) {
            currentTag.htmlUrl = url;
            currentTag.html = widgetHtml;

            response.render(__dirname + '/public/index.ejs', {
                layout:false,
                locals: {
                    title: currentTag.title,
                    currentTag: currentTag,
                    currentPresentation: currentPresentation,
                    tags: tags
                }
            });
        });
    });
    
};


app.get('/word-:guid[0-9a-fA-F-]', create_page);
app.get('/:tag?', create_page);

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


var get_html = function(domain, guid, sortField, sortDirection, size, info_string, link, callback) {
    
    var query = querystring.stringify({
        size: size,
        sortField : sortField,
        sortDirection: sortDirection,
        info: info_string,
        link: link
    });
    
    
    var url = 'http://widgets.kuluvalley.com/1/clients/' + domain + '/' + guid + '/html/?' + query;
    sys.puts(url);
    rest.get(url).on('complete', function(data) {
        setTimeout(function() {
            callback(url, data);
        }, 0);
    });
}

var tags = [ {
        link: '',
        title: 'Latest',
        config: {
            guid: "7497d133-288b-9448-a9b3-6a10ab20af34",
            sortField: 'publishedDate',
            sortDirection: 'desc',
            size: 10
        }
    }, {
        link: 'all',
        title: 'All',
        config: {
            guid: "7497d133-288b-9448-a9b3-6a10ab20af34"
        }
    }, {
        link: 'alphabet',
        title: 'Alphabet',
        config: {
    guid: "08b14214-e558-1fc1-5383-662d4402563a"
  }
    }, {
        link: 'communication',
        title: 'Communication',
        config: {
    guid: "a5fe2bdf-eae4-587a-ef7a-0a9395c9b0f5"
  }
    }, {
        link: 'greeting',
        title: 'Greeting',
        config: {
    guid: "95b94c89-d9b1-ce0e-a7cb-ce267ecf0f41"
  }
    }, {
        link: 'basics',
        title: 'Basics',
        config: {
    guid: "4dc00198-22ef-16bf-3cbe-6a75e9070200"
  }
    }, {
        link: 'numbers',
        title: 'Numbers',
        config: {
    guid: "84cccdc3-b113-a326-62a5-0cbf75d58ef2"
  }
    }, {
        link: 'time-calendar',
        title: 'Time & Calendar',
        config: {
    guid: "134b2668-af02-6d7d-6f69-3d927c14c644"
  }
    }, {
        link: 'day-of-week',
        title: 'Days of the week',
        config: {
    guid: "68303ce0-bb5d-36e2-97e0-80fe89f2abee",
    sortField: 'publishedDate',
    sortDirection: 'desc'
  }
    }, {
        link: 'months',
        title: 'Months',
        config: {
    guid: "a90e25bb-782c-a2d2-8058-4e4deab5620e",
    sortField: 'publishedDate',
    sortDirection: 'desc'
  }
    }, {
        link: 'weather',
        title: 'Weather',
        config: {
    guid: "237f44fe-cdec-2a1e-d833-8b991f7954d1"
  }
    }, {
        link: 'season',
        title: 'Seasons',
        config: {
    guid: "aaf25fd7-0d85-ee13-7b01-66935aab2f02",
    sortField: 'publishedDate',
    sortDirection: 'desc'
  }
    }, {
        link: 'colours',
        title: 'Colours',
        config: {
    guid: "3db9efa6-6e91-b8fe-f6b5-c25c21e70c1a"
  }
    }, {
        link: 'questions',
        title: 'Questions',
        config: {
    guid: "a9fc3880-f538-bfdb-58c1-718231457ee6"
  }
    }, {
        link: 'directions',
        title: 'Directions',
        config: {
    guid: "debd37b0-06e4-b43d-2ba5-bbc00a7e53aa"
  }
    }, {
        link: 'transport',
        title: 'Transport',
        config: {
    guid: "ce132b91-fde3-5114-c196-42e722968f89"
  }
    }, {
        link: 'animals',
        title: 'Animals',
        config: {
    guid: "3f761c69-edaa-42ec-4952-9d9a0243e084"
  }
    }, {
        link: 'family',
        title: 'Family',
        config: {
    guid: "e8b26ae5-8abb-556c-c863-76b76196e6da"
  }
    }, {
        link: 'emotions',
        title: 'Emotions',
        config: {
    guid: "bd176f4c-3520-66cc-da4f-39e6c02e0537"
  }
    }, {
        link: '101-vocab',
        title: '101 vocab',
        config: {
    guid: "b2734940-698e-13d4-3298-0507be389870"
  }
    }, {
        link: 'size',
        title: 'Size',
        config: {
    guid: "f4d73300-a799-4adf-c387-114c0c74c1bd"
  }
    }, {
        link: 'food-drink',
        title: 'Food & drink',
        config: {
    guid: "19ba8a07-3be1-3027-12a8-cc6ed554fadc"
  }
    }, {
        link: 'money',
        title: 'Money',
        config: {
    guid: "97420cee-44e2-560d-06f5-9cd4f73d4e97"
  }
    }, {
        link: 'home',
        title: 'Home',
        config: {
    guid: "9b656ae5-8433-8344-4612-f0fc6f64e1ba"
  }
    }, {
        link: 'school-and-work',
        title: 'School & work',
        config: {
    guid: "3455939b-2e6f-7125-4664-fcdf6c739f8d"
  }
    }, {
        link: 'shops',
        title: 'Shops',
        config: {
    guid: "507a9408-5c1f-e6fb-affd-e6c919573800"
  }
    }, {
        link: 'countries-and-places',
        title: 'Countries & places',
        config: {
    guid: "c2eb7805-26b4-8eaa-996b-e44dce4fe829"
  }
    }, {
        link: 'hobbies',
        title: 'Hobbies',
        config: {
    guid: "36d96ca3-4d2a-a7cd-1548-30067dd1e46e"
  }
    }
];
