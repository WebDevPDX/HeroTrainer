var weapon = [
		{	name : 'fists',
			minDmg : 1,
			maxDmg : 3
		},
		{	name : 'stick',
			minDmg : 2,
			maxDmg : 3
		},
		{	name : 'dagger',
			minDmg : 2,
			maxDmg : 5
		},
		{	name : 'sword',
			minDmg : 4,
			maxDmg : 6
		},
		{	name : 'battleAxe',
			minDmg : 3,
			maxDmg : 8
		},
		{	name : 'greatsword',
			minDmg : 5,
			maxDmg : 10
		}
];

var armor = [
		{	name : 'clothes',
			protection : 1,
		},
		{	name : 'leather armor',
			protection : 2,
		},
		{	name : 'reinforced leather',
			protection : 3,
		},
		{	name : 'chain mail',
			protection : 4,
		},
		{	name : 'plate mail',
			protection : 5,
		},
		{	name : 'full plate',
			protection : 6,
		},
];

var monster = {
	type : 'human',
	level : 1,
	strength : 1,
	dexterity : 1,
	agility : 1,
	skill : 1,
	weapon : "",
	armor : "",
	HP : 10,
	gold : ""
}

var monsterGenerator = function() {
	//set monster level to hero level
	monster.level = hero.level;
	//pick a weapon from array (max weapon = monster.level)
	if (monster.level <= weapon.length) {
		monster.weapon = weapon[Math.floor(Math.random() * monster.level)];
	} else {
		monster.weapon = weapon[Math.floor(Math.random() * weapon.length)];
	}
	//pick a armor from array (max armor = monster.level)
	if (monster.level <= armor.length) {
		monster.armor = armor[Math.floor(Math.random() * monster.level)];
	} else {
		monster.armor = armor[Math.floor(Math.random() * armor.length)];
	}
	//set attributes for HP, strength, dexterity, agility and skill
	var attributes = monster.level * 4;
	var monsterXP = attributes;
	var HP = (Math.round(Math.random() * attributes));
	monster.HP = HP * 10;
	//if HP ends up below 10 then set it to 10 minimum
	if (monster.HP < 10) {
		monster.HP = 10;
		monsterXP += 10;
	}
	attributes = attributes - HP;
	monster.strength = Math.round(Math.random() * attributes);
	attributes = attributes - monster.strength;
	monster.dexterity = Math.round(Math.random() * attributes);
	attributes = attributes - monster.dexterity;
	monster.agility = Math.round(Math.random() * attributes);
	attributes = attributes - monster.agility;
	monster.skill = Math.round(Math.random() * attributes);
	attributes = attributes - monster.skill;
	//determine XP for defeating the monster
	//determine the loot for the monster
	monster.gold = Math.floor(Math.random() * (monster.level / 2) * 10 + monster.level);
}

var heroHitCalc = function() {
	// random change between 1 and 100 + (hero dex + hero skill)
	return (Math.floor((Math.random() * 100) + 1) + (hero.dexterity * 0.25 + hero.skill));
}

var monsterHitCalc = function() {
	// random change between 1 and 100 + (monster dex + monster skill)
	return (Math.floor((Math.random() * 100) + 1) + (monster.dexterity * 0.25 + monster.skill));
}

var heroDodgeCalc = function() {
	return (Math.floor((Math.random() * 50) + 1) + (hero.agility * .25));
}

var monsterDodgeCalc = function() {
	return (Math.floor((Math.random() * 50) + 1) + (monster.agility * .25));
}

var heroDmgCalc = function() {
	return ( Math.floor(Math.random()*(hero.weapon.maxDmg-hero.weapon.minDmg + 1) + hero.weapon.minDmg + hero.strength) - monster.armor.protection );
}

var monsterDmgCalc = function() {
	return ( Math.floor(Math.random()*(monster.weapon.maxDmg-monster.weapon.minDmg + 1) + monster.weapon.minDmg + monster.strength) - hero.armor.protection );
}

var heroDodge = function() {
	if (monsterHitCalc() < heroDodgeCalc()) {
		console.log('hero dodges');	
	} else {
		console.log('monster hits');
		hero.HP = hero.HP - monsterDmgCalc();
	}
}

var monsterDodge = function() {
	if (heroHitCalc() < monsterDodgeCalc()) {
		console.log('monster dodge');
	} else {
		console.log('hero hit');
		monster.HP = monster.HP - heroDmgCalc();
	}
}

var combatSequence = function() {
	if (hero.agility >= monster.agility) {
		while (monster.HP > 0 && hero.HP > 0) {
			monsterDodge();
			console.log('monsterHP: ' + monster.HP)
			if (monster.HP <= 0) {
				break
			}
			heroDodge();
			console.log('heroHP: ' + hero.HP)
		}
	}
	if (hero.agility < monster.agility) {
		while (monster.HP > 0 && hero.HP > 0) {
			heroDodge();
			console.log('heroHP: ' + hero.HP);
			if (hero.HP <= 0) {
				break
			}
			monsterDodge();
			console.log('monsterHP: ' + monster.HP);
		}
	}
}

var letsFight = function() {
	monsterGenerator();
	console.log(monster);
	combatSequence();
}

letsFight();



