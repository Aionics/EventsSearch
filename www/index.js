var m_site = {
    input: ko.observable(),
    items: ko.observableArray()
};

m_site.search = function (target, request) {
    $('#button').prop('disabled', true);
    $('#button').text('Ищем...');
    $.ajax({
        url: '/search',
        type: 'post',
        data: JSON.stringify({
            target: target,
            request: request
        }),
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (message) {
            $('#button').prop('disabled', false);
            $('#button').text('Найти на afisha.ru');
            if (message.err) {
                return console.log(message.err);
            }
            m_site.items(message.data)
        }
    })
}

$(document).ready(function () {
    ko.applyBindings(m_site);
});
