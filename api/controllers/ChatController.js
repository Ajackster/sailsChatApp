/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    addConv: function(req, res) {
        var dataFromClient = req.params.all();
        if (req.isSocket && req.method === 'POST') {
            Chat.create(dataFromClient)
            .exec(function(err, dataFromClient) {
                Chat.publishCreate({
                    id: dataFromClient.id,
                    message: dataFromClient.message,
                    user: dataFromClient.user
                });
            });    
        } else if (req.isSocket) {
            var data = req.params.all();
            Chat.watch(req.socket);
            console.log('User subscribed to ' + req.socket.id);
            console.log(data);
        }
    }	
};

