var letter_indexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'];

app.filter('letterIndex', [function () {
    return function (index) {
        index--;
        var sub = Math.floor(index / letter_indexes.length) - 1;
        var remain = index % letter_indexes.length;
        if (sub >= 0)
            return letter_indexes[sub] + letter_indexes[remain];
        else
            return letter_indexes[remain];
    }
}]);
app.filter('newlines', function () {
    return function (text) {
        if (text)
            return text.replace(/\n/g, '<br/>');
        else
            return text;
    };
});
app.filter('replace', [function () {
    return function (input, from, to) {
        if (input === undefined) {
            return;
        }
        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);
    };
}]);
app.filter('range', function () {
    return function (input, start, end) {
        if (isNaN(start) || isNaN(end)) {
            return [];
        } else {
            start = parseInt(start);
            end = parseInt(end);
            var direction = (start <= end) ? 1 : -1;
            while (start != end) {
                input.push(start);
                if (direction < 0 && start == end + 1) {
                    input.push(end);
                }
                if (direction > 0 && start == end - 1) {
                    input.push(end);
                }
                start += direction;
            }
            return input;
        }
    };
});
app.filter('steps_range', function () {
    return function (input, start_at_one, steps) {
        if (isNaN(steps)) {
            return [];
        } else {
            var start = start_at_one ? 1 : 0;
            steps = parseInt(steps) + start;
            var i;
            for (i = start; i < steps; i++) {
                input.push(i);
            }
            return input;
        }
    };
});
app.filter("format", function () {
    return function (input) {
        var args = arguments;
        return input.replace(/\{(\d+)\}/g, function (match, capture) {
            return args[1 * capture + 1];
        });
    };
});
app.filter("emptyToBegin", function () {
    return function (array, key) {
        if (!angular.isArray(array)) return;
        var present = array.filter(function (item) {
            return item[key];
        });
        var empty = array.filter(function (item) {
            return !item[key]
        });
        return empty.concat(present);
    };
});
app.filter('trusted', ['$sce', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html)
    }
}]);
app.filter('trustedyoutube', ['$sce', function ($sce) {
    return function (url) {
        var video_id = url.split('v=')[1].split('&')[0];
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
    };
}]);
app.filter('groupBy', ['$parse', 'pmkr.filterStabilize', function ($parse, filterStabilize) {

        function groupBy(input, prop) {

            if (!input) {
                return;
            }

            var grouped = {};

            input.forEach(function (item) {
                var key = $parse(prop)(item);
                grouped[key] = grouped[key] || [];
                grouped[key].push(item);
            });

            return grouped;

        }

        return filterStabilize(groupBy);

    }])

    .factory('pmkr.filterStabilize', [
        'pmkr.memoize',
        function (memoize) {

            function service(fn) {

                function filter() {
                    var args = [].slice.call(arguments);
                    // always pass a copy of the args so that the original input can't be modified
                    args = angular.copy(args);
                    // return the `fn` return value or input reference (makes `fn` return optional)
                    var filtered = fn.apply(this, args) || args[0];
                    return filtered;
                }

                var memoized = memoize(filter);

                return memoized;

            }

            return service;

        }
    ])

    .factory('pmkr.memoize', [
        function () {

            function service() {
                return memoizeFactory.apply(this, arguments);
            }

            function memoizeFactory(fn) {

                var cache = {};

                function memoized() {

                    var args = [].slice.call(arguments);

                    var key = JSON.stringify(args);

                    if (cache.hasOwnProperty(key)) {
                        return cache[key];
                    }

                    cache[key] = fn.apply(this, arguments);

                    return cache[key];

                }

                return memoized;

            }

            return service;

        }
    ])