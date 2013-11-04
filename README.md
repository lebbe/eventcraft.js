eventcraft.js
=============

Runs your minecraft-server as a node.js child process and emits events when something interesting happen on the server. Will also recieve messages and send to its stdin (for chatting, sending commands, etc).


Work in progress
----------------

Or, this is how I picture the direction of this software. As of now, the committet code only reads from stdin, and emits the said events.

Do no despair, however. This can be useful in itself, just pipe the output of the log into this node.js program:

    node eventcraft.js | tail server.log
    

And write some code which listens on the events, like this:

    var minecraft = new MinecraftEventEmitter();

    minecraft.on('death', function(e) {
        console.log(e.player + ' died');
    });

    minecraft.on('join', function(e) {
        console.log(e.player + ' join');
    });

    minecraft.on('quit', function(e) {
        console.log(e.player + ' quit');
    });

    minecraft.on('achievement', function(e) {
        console.log(e.player + ' achievement: ' + e.achievement);
    });
