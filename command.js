
module.exports = {

    fever: function(message) {
        message.channel.send({file: './lul.jpg'});
    },
    
    missus: function(message, userID) {
        message.channel.send('Oh shoot the missus is here! ' + userID);
    },

    mister: function(message, userID) {
        message.channel.send(userID + ' is always here. lul')
    }

}