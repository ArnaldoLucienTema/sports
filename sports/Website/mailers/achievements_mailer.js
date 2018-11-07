const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'dc.pires@campus.fct.unl.pt',
            pass: 'Simoleons__1'
        },
        logger: false,
        debug: false // include SMTP traffic in the logs
    },
    {
        from: 'SportsConnected <arnaldo.tema@sportsconnected.pt>',
    }
);

let Service = {}

Service.ownAchievementMail = function(user_info, achievement) {

    const own_name = user_info.current_season.personal_info.name;
    const own_email = user_info.user_id ? user_info.user_id.email : '';

    // Message object
    let message = {
        // Comma separated list of recipients
        //to: own_name + ' <' + own_email + '>',
        to: "Arnaldo Trindade <arnaldo.trindade@closer.pt>",
        // Subject of the message
        subject: 'You got a new achievement in SportsConnected!',

        // plaintext body
        text: 'New achievement: ' + achievement.name + '!',

        // HTML body
        html:
        '<p><b>Hello ' + own_name + ',</b></p>' +
        '<p>You have earned a new achievement in SportsConnected:</p>' +
        '<p>' + achievement.name + '</p>' +
        '<p><img src="cid:nyan@example.com"/></p>',

        // An array of attachments
        attachments: [
            {
                filename: 'achievement_avatar.jpg',
                path: achievement.avatar,
                cid: 'nyan@example.com' // should be as unique as possible
            }
        ]
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
};

module.exports = Service;