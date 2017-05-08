var m_site = {
    input: ko.observable(),
    items: ko.observableArray(),
    ready: ko.observable(false),
    searching: ko.observable(false),
};

m_site.search = function (request) {
    m_site.ready(false)
    m_site.searching(true)
    m_site.items([])
    $.ajax({
        url: '/search',
        type: 'post',
        data: JSON.stringify({
            request: request
        }),
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (message) {
            m_site.searching(false)
            if (message.err) {
                return console.log(message.err);
            }
            m_site.ready(true)
            for (serviceName in message.data) {
                let service = message.data[serviceName]
                for (linkId in service) {
                    m_site.items.push(service[linkId])
                }
            }
        }
    })
}

$(document).ready(function () {
    ko.applyBindings(m_site);
});
