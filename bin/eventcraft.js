var util = require("util");
var events = require("events");


/**
 * Constructor.
 ****/
function MinecraftEventEmitter() {
	events.EventEmitter.call(this);
}

util.inherits(MinecraftEventEmitter, events.EventEmitter);

MinecraftEventEmitter.prototype.death = function (chunk, matches) {
	var  player = matches[1];
	var opponent, weapon;
	if(matches.length >= 3)
		opponent = matches[2];
	if(matches.length >= 4)
		weapon = matches[3];
	this.emit('death', {
		player: player,
		opponent: opponent,
		weapon: weapon,
		message: chunk
	});
}

MinecraftEventEmitter.prototype.join = function (chunk, player) {
	this.emit('join', {
		player: player,
		message: chunk
	});
}

MinecraftEventEmitter.prototype.quit = function (chunk, player) {
	this.emit('quit', {
		player: player,
		message: chunk
	});
}

MinecraftEventEmitter.prototype.achievement = function (chunk, player, achievement) {
	this.emit('achievement', {
		player: player,
		achievement: achievement,
		message: chunk
	});
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {

	// Deaths
	var match =
		// Anvil
		chunk.match(/([a-z0-9_]*) was squashed by a falling anvil/i) ||
		// Cactus
		chunk.match(/([a-z0-9_]*) was pricked to death/i) ||
		chunk.match(/([a-z0-9_]*) walked into a cactus whilst trying to escape ([a-z0-9_]*)/i) ||
		// Dispenser arrow
		chunk.match(/([a-z0-9_]*) was shot by arrow/i) ||
		// Drowning
		chunk.match(/([a-z0-9_]*) drowned/i) ||
		chunk.match(/([a-z0-9_]*) drowned whilst trying to escape ([a-z0-9_]*)/i) ||
		// Explosion
		chunk.match(/([a-z0-9_]*) blew up/i) ||
		chunk.match(/([a-z0-9_]*) was blown up by ([a-z0-9_]*)/i) ||
		// Falling
		chunk.match(/([a-z0-9_]*) hit the ground too hard/i) ||
		chunk.match(/([a-z0-9_]*) fell from a high place/i) ||
		chunk.match(/([a-z0-9_]*) fell off a ladder/i) ||
		chunk.match(/([a-z0-9_]*) fell off some vines/i) ||
		chunk.match(/([a-z0-9_]*) fell out of the water/i) ||
		chunk.match(/([a-z0-9_]*) fell into a patch of fire/i) ||
		chunk.match(/([a-z0-9_]*) fell into a patch of cacti/i) ||
		chunk.match(/([a-z0-9_]*) was doomed to fall (by ([a-z0-9_]*))/i) ||
		chunk.match(/([a-z0-9_]*) was shot off some vines by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was shot off a ladder by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was blown from a high place by ([a-z0-9_]*)/i) ||
		// Fire
		chunk.match(/([a-z0-9_]*) went up in flames/i) ||
		chunk.match(/([a-z0-9_]*) burned to death/i) ||
		chunk.match(/([a-z0-9_]*) was burnt to a crisp whilst fighting ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) walked into a fire whilst fighting ([a-z0-9_]*)/i) ||
		// Mob
		chunk.match(/([a-z0-9_]*) was slain by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was shot by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was fireballed by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was killed by ([a-z0-9_]*) using (magic)/i) ||
		chunk.match(/([a-z0-9_]*) got finished off by ([a-z0-9_]*) using ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was slain by ([a-z0-9_]*) using ([a-z0-9_]*)/i) ||
		// Lava
		chunk.match(/([a-z0-9_]*) tried to swim in lava/i) ||
		chunk.match(/([a-z0-9_]*) tried to swim in lava while trying to escape ([a-z0-9_]*)/i) ||
		// Lightning
		chunk.match(/([a-z0-9_]*) died/i) ||
		// PvP
		chunk.match(/([a-z0-9_]*) got finished off by ([a-z0-9_]*) using ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was slain by ([a-z0-9_]*) using ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) got finished off by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was shot by ([a-z0-9_]*) using ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was slain by ([a-z0-9_]*)/i) ||
		chunk.match(/([a-z0-9_]*) was killed by ([a-z0-9_]*) using (magic)/i) ||
		// Potion of harming
		chunk.match(/([a-z0-9_]*) was killed by magic/i) ||
		// Starvation
		chunk.match(/([a-z0-9_]*) starved to death/i) ||
		// Suffocation
		chunk.match(/([a-z0-9_]*) suffocated in a wall/i) ||
		// Thorns enchantment
		chunk.match(/([a-z0-9_]*) was killed while trying to hurt ([a-z0-9_]*)/i) ||
		// Void and /kill
		chunk.match(/([a-z0-9_]*) fell out of the world/i) ||
		chunk.match(/([a-z0-9_]*) fell from a high place and fell out of the world/i) ||
		chunk.match(/([a-z0-9_]*) was knocked into the void by ([a-z0-9_]*)/i) ||
		// Wither effect
		chunk.match(/([a-z0-9_]*) withered away/i);

	if(match && match.length) {
		minecraft.death(chunk, match);
		return;
	}

	match = chunk.match(/([a-z0-9_]*) joined the game/i);
	if(match && match.length) {
		minecraft.join(chunk, match[1]);
	}

	match = chunk.match(/([a-z0-9_]*) left the game/i);
	if(match && match.length) {
		minecraft.quit(chunk, match[1]);
	}

	match = chunk.match(/([a-z0-9_]*) has just earned the achievement \[([a-z0-9 !]+)\]/i);
	if(match && match.length) {
		minecraft.achievement(chunk, match[1], match[2]);
	}
});