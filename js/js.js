setTimeout(() => {
    a()
}, 1000);
function a() {
    getLocation()
}


function getLocation() {
    $.getJSON("https://ipinfo.io/", onLocationGot);
}

function onLocationGot(info) {
    let position = info.loc.split(",");
    // var name = prompt('Vui lòng nhập tên của bạn')
    const templateId = 'template_75sb4wn';
    const serviceID = 'ducthanh260801@gmail.com';
    sendFeedback(serviceID, templateId, {
        to_name: `mrthanh260801@gmail.com`,
        from_name: "Chào mừng đến với NDT Shop",
        message: "Người vừa truy cập: " + position[0] + ', ' + position[1],
        nguoi_nhan: 'ducthanh260801@gmail.com',
        reply_to: "mrthanh260801@gmail.com",
        link: '<a href="http://ndtshop.herokuapp.com/forgot-password">Truy cập tại đây</a>'
    })
}

const sendFeedback = (serviceID, templateId, variables) => {
    window.emailjs.send(
        serviceID, templateId,
        variables
    ).then(res => {
        console.log('Email successfully sent!')
    })
        .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
}