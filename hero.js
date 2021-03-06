//winning conditions - fame full for 156 fights = 12246
// gold estimate = 228k

// 2% of gold + fame = 4500 + 12250 = 16750

'use strict';

angular.module('heroTrainerApp', [])

	.controller('HeroController', ['$scope', function($scope) {

		$scope.startGame = true;
		$scope.start2 = false;
		$scope.game = false;
		$scope.showMainTrainingsOptions = false;
		$scope.showTrainingResults = false;
		$scope.showMainWorkingOptions = false;
		$scope.showWorkingResults = false;
		$scope.showFightOption = false;
		$scope.showCombatLog = false;
		$scope.showShop = false;
		$scope.win = false;
		$scope.heroDied = false;
		$scope.heroDeath = false;

		$scope.weapon = [
			{	name : 'fists',
				shopName : 'Fists',
				price : 0,
				minDmg : 1,
				maxDmg : 3
			},
			{	name : 'a stick',
				shopName : 'Stick',
				price : 10,
				minDmg : 2,
				maxDmg : 3
			},
			{	name : 'a dagger',
				shopName : 'Dagger',
				price : 25,
				minDmg : 2,
				maxDmg : 5
			},
			{	name : 'a sword',
				shopName : 'Sword',
				price : 50,
				minDmg : 4,
				maxDmg : 6
			},
			{	name : 'a battle axe',
				shopName : 'Battle Axe',
				price : 100,
				minDmg : 3,
				maxDmg : 8
			},
			{	name : 'a greatsword',
				shopName : 'Greatsword',
				price : 250,
				minDmg : 5,
				maxDmg : 10
			}
		];

		$scope.armor = [
			{	name : 'normal clothes',
				shopName : 'Street clothes',
				price : 0,
				protection : 1,
			},
			{	name : 'leather armor',
				shopName : 'Leather Armor',
				price : 25,
				protection : 2,
			},
			{	name : 'reinforced leather armor',
				shopName : 'Reinforced Leather Armor',
				price : 50,
				protection : 3,
			},
			{	name : 'chain mail',
				shopName : 'Chain Mail Shirt',
				price : 100,
				protection : 4,
			},
			{	name : 'plate mail',
				shopName : 'Plate Mail Hauberk',
				price : 250,
				protection : 5,
			},
			{	name : 'full plate',
				shopName : 'Full Plate Armor',
				price : 1000,
				protection : 6,
			},
		];

		$scope.resultFame = [
			{
				fame: 15000,
				rank: "The new king of Tarasul."
			},
			{
				fame: 14000,
				rank: "Military advisor to the king of Tarasul."
			},
			{
				fame: 13000,
				rank: "High General of the king's army."
			},
			{
				fame: 12000,
				rank: "a general in the king's army."
			},
			{
				fame: 11000,
				rank: "the gouvernor of the capitol."
			},
			{
				fame: 10000,
				rank: "Colonel in the king's army."
			},
			{
				fame: 9000,
				rank: "Captain in the king's army."
			},
			{
				fame: 8000,
				rank: "Mayor of one of the bigger towns of the kingdom."
			},
			{
				fame: 7000,
				rank: "Lieutenant in the king's army."
			},
			{
				fame: 6000,
				rank: "Steward of one of the kingdom's villages."
			},
			{
				fame: 5000,
				rank: "Sergeant First Class in the king's army."
			},
			{
				fame: 4000,
				rank: "Sergeant in the king's army."
			},
			{
				fame: 3000,
				rank: "Private in the king's army."
			},
			{
				fame: 2000,
				rank: "an unnamed soldier in the king's army - also called cannon fodder."
			},
			{
				fame: 1000,
				rank: "Latrine Cleaner in the king's army. At least you survived your training."
			},
			{
				fame: 0,
				rank: "A hermit in the mountains. Maybe you join one of the orc clans since you weren't enough of a threat for them to remember you."
			},
		]
		$scope.resultGold = [
			{
				gold: 200000,
				rank: "The financial power behind the kingdom. Right after making some more money..."
			},
			{
				gold: 180000,
				rank: "Financial Advisor to the king."
			},
			{
				gold: 160000,
				rank: "CEO of all the kingdom's privately owned banks."
			},
			{
				gold: 140000,
				rank: "Owner of your own trade empire."
			},
			{
				gold: 120000,
				rank: "Retiree in a medium sized town not too far out. Yes, you bought it and paid cash."
			},
			{
				gold: 100000,
				rank: "Business tycoon in the capitol."
			},
			{
				gold: 80000,
				rank: "Import / Export business owner in a medium sized town."
			},
			{
				gold: 60000,
				rank: "Retiree in a small village near the border. Yep, 12 easy payments over the next 5 years."
			},
			{
				gold: 40000,
				rank: "The towns blacksmith and spend the rest of your life shoeing horses."
			},
			{
				gold: 20000,
				rank: "A sightseer. Well, you have enough money to make it to the capitol and see a hero from a competing school that actually made it."
			},
			{
				gold: 0,
				rank: "broke and destitute beggar."
			},
		]

		$scope.hero = {
			name : 'Hero Name',
			image : 'images/hero.jpg',
			fame : 0,
			level : 1,
			endurance : 5,
			strength : 5,
			dexterity : 5,
			agility : 5,
			skill : 5,
			weapon : $scope.weapon[0],
			armor : $scope.armor[0],
			HP : '',
			gold : 100,
			heroTitle : '',
			owed: ''
		}
		$scope.hero.HP = Math.floor($scope.hero.endurance * 2.5);

		$scope.secondStartScreen = function() {
			$scope.startGame = false;
			$scope.start2 = true;
		}
		$scope.startTheGame = function() {
			$scope.start2 = false;
			$scope.game = true;
		}

		var getTitle = function() {
			if ($scope.hero.fame * 15 < $scope.hero.gold) {
				if ($scope.hero.gold < $scope.resultGold[$scope.resultGold.length - 1].gold) {
					$scope.hero.heroTitle = $scope.resultGold[$scope.resultGold.length].rank
				} else if ($scope.hero.gold > $scope.resultGold[0].gold) {
					$scope.hero.heroTitle = $scope.resultGold[0].rank
				} else {
					for (var i = 1; i < $scope.resultGold.length - 1; i++) {
						if ($scope.hero.gold > $scope.resultGold[i].gold) {
							$scope.hero.heroTitle = $scope.resultGold[i].rank
							break;
						}
					}
				}
			} else {
				if ($scope.hero.fame < $scope.resultFame[$scope.resultFame.length - 1].fame) {
					$scope.hero.heroTitle = $scope.resultFame[$scope.resultFame.length].rank
				} else if ($scope.hero.fame > $scope.resultFame[0].fame) {
					$scope.hero.heroTitle = $scope.resultFame[0].rank
				} else {
					for (var i = 1; i < $scope.resultFame.length - 1; i++) {
						if ($scope.hero.fame > $scope.resultFame[i].fame) {
							$scope.hero.heroTitle = $scope.resultFame[i].rank
							break;
						}
					}
				}
			}
			$scope.hero.owed = parseInt($scope.hero.gold/100*98);		
		}

		function resetHeroObject() {
			$scope.hero = {
				name : 'Hero Name',
				image : 'images/hero.jpg',
				fame : 0,
				level : 1,
				endurance : 5,
				strength : 5,
				dexterity : 5,
				agility : 5,
				skill : 5,
				weapon : $scope.weapon[0],
				armor : $scope.armor[0],
				HP : '',
				gold : 100,
				heroTitle : '',
				owed: ''
			}
			$scope.hero.HP = Math.floor($scope.hero.endurance * 2.5);
		}

		$scope.heroChange = {};

		function resetHeroChangeObject() {
			$scope.heroChange = {
				fame : '',
				level : '',
				endurance : '',
				strength : '',
				dexterity : '',
				agility : '',
				skill : '',
				HP : '',
				gold : '',
				armor : '',
				weapon : ''
			}
		}

		$scope.currentWeek = 0;
		$scope.maxTime = 156;

		var addAWeek = function() {
			$scope.currentWeek++;
			if ($scope.currentWeek > $scope.maxTime) {
				$scope.win = true;
				$scope.game = false;
				$scope.showMainTrainingsOptions = false;
				$scope.showTrainingResults = false;
				$scope.showMainWorkingOptions = false;
				$scope.showWorkingResults = false;
				$scope.showFightOption = false;
				$scope.showCombatLog = false;
				$scope.showShop = false;
				getTitle();
			}
		}

		$scope.restart = function() {
			resetHeroObject();
			resetHeroChangeObject();
			$scope.currentWeek = 0;
			$scope.startGame = false;
			$scope.start2 = true;
			$scope.game = false;
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = false;
			$scope.showMainWorkingOptions = false;
			$scope.showWorkingResults = false;
			$scope.showFightOption = false;
			$scope.showCombatLog = false;
			$scope.showShop = false;
			$scope.win = false;
			$scope.heroDied = false;
			$scope.heroDeath = false;
		}

		///////////////////////////
		// HERO TRAINING         //
		///////////////////////////

		$scope.trainingOptions = function() {
			console.log('training');
			if (!$scope.showMainTrainingsOptions) {
				$scope.showMainTrainingsOptions = true;
				$scope.showTrainingResults = false;
				$scope.showMainWorkingOptions = false;
				$scope.showWorkingResults = false;
				$scope.showFightOption = false;
				$scope.showCombatLog = false;
				$scope.showShop = false;
				$scope.showShopConfirm = false;
			} else {
				$scope.showMainTrainingsOptions = false;
			}
		}

		$scope.goldCheck = function(price) {
			if ($scope.hero.gold >= price * -1) {
				return false;
			} else {
				return true;
			}
		}

		$scope.skillTrainingsOptions = [
			{
				name : 'Endurance',
				tip : 'Allows you to last longer in a fight',
				options : [
					{
						index : 'end-1',
						name : 'Get punched for 3 hours a day',
						price : -5,
						cost : 'Costs you some dignity and 5 gold per week',
						increase : 0.5
					},
					{
						index : 'end-2',
						name : 'Get into bar fights',
						price : -25,
						cost : 'Ditching the authorities and replacing furniture: 25 gold per week',
						increase : 2
					},
					{
						index : 'end-3',
						name : 'Rocky Stalone',
						price : -100,
						cost : 'Teaches you how to take a punch or two or three... for 100 gold per week',
						increase : 10
					},
				]
			},
			{
				name : 'Strength',
				tip : 'Allows you to punch or swing your weapon harder',
				options : [
					{
						index : 'str-1',
						name : 'Do some push and pull-ups',
						price : -5,
						cost : '5 gold for the use of non-professional equipment',
						increase : 0.5
					},
					{
						index : 'str-2',
						name : 'Go weight lifting',
						price : -25,
						cost : 'Good equipment but more expensive at 25 gold per week',
						increase : 2
					},
					{
						index : 'str-3',
						name : 'Arnold Whitegger',
						price : -100,
						cost : 'Worse than any drill sergant and much more expensive at 100 gold.',
						increase : 10
					},
				]
			},
			{
				name : 'Dexterity',
				tip : 'The higher this skill, the more likely you are to land a hit',
				options : [
					{
						index : 'dex-1',
						name : 'Play darts at the local pub',
						price : -5,
						cost : '5 gold for getting drunk during your training',
						increase : 0.5
					},
					{
						index : 'dex-2',
						name : 'Archery',
						price : -25,
						cost : 'Yep, arrows break in training - 25 gold per week',
						increase : 2
					},
					{
						index : 'dex-3',
						name : 'EagleEye Johnson',
						price : -100,
						cost : 'Learn to shoot the ears off a fly at 50 paces - for 100 gold per week',
						increase : 10
					},
				]
			},
			{
				name : 'Agility',
				tip : 'The higher this skill, the more likely you are to dodge',
				options : [
					{
						index : 'agi-1',
						name : 'Archery helper',
						price : -5,
						cost : 'Pick up arrows while other\'s are practicing for 5 gold per week',
						increase : 0.5
					},
					{
						index : 'agi-2',
						name : 'Dancing in a crowded ball room',
						price : -25,
						cost : 'Don\'t step on anybody\'s toes! 25 gold per week membership fee',
						increase : 2
					},
					{
						index : 'agi-3',
						name : 'The Sober Monkey',
						price : -100,
						cost : 'Learn the secret art of sober boxing for 100 gold per week',
						increase : 10
					},
				]
			},
			{
				name : 'Fight Skill',
				tip : 'Your overall fighting skill, increases your hit chance',
				options : [
					{
						index : 'skill-1',
						name : 'Training Dummy',
						price : -5,
						cost : 'Hack away at it. Don\'t forget to pay your 5 gold for the week',
						increase : 0.5
					},
					{
						index : 'skill-2',
						name : 'Sparring',
						price : -25,
						cost : 'Fights against other trainees, organized for only 25 gold per week',
						increase : 2
					},
					{
						index : 'skill-3',
						name : 'Neo Reeves',
						price : -100,
						cost : '"Learn the Kung Fu in 10 minutes" for 100 gold per week',
						increase : 10
					},
				]
			},
		]

		$scope.trainingResults = [
			{
				weekday : 'Monday',
				result : ''
			},
			{
				weekday : 'Tuesday',
				result : ''
			},
			{
				weekday : 'Wednesday',
				result : ''
			},
			{
				weekday : 'Thursday',
				result : ''
			},
			{
				weekday : 'Friday',
				result : ''
			},
			{
				weekday : 'Saturday',
				result : ''
			},
			{
				weekday : 'Sunday',
				result : ''
			},
		]
		$scope.totalTrainingResult = 0;

		function trainingCalculation(successCheck, increase, skillName, cost) {
			//reset data storage variables
			resetHeroChangeObject();
			$scope.totalTrainingResult = 0;
			//change display
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			//calculation
			for (var i = 0; i < $scope.trainingResults.length; i++) {
				if (parseFloat(Math.random()).toFixed(2) <= successCheck) {
					$scope.trainingResults[i].result = 'Success';
					$scope.totalTrainingResult += increase;
				} else {
					$scope.trainingResults[i].result = 'Failed';
				}
			}
			//round results
			$scope.totalTrainingResult = Math.round($scope.totalTrainingResult);
			//update hero and heroChange objects
			$scope.hero[skillName] += $scope.totalTrainingResult;
			$scope.hero.gold -= cost;
			$scope.heroChange[skillName] += $scope.totalTrainingResult;
			$scope.heroChange.gold -= cost;
			//if endurance is increased, recalculate HP
			if (skillName === 'endurance') {
				var currentHP = $scope.hero.HP;
				$scope.hero.HP = Math.floor($scope.hero.endurance * 2.5);
				$scope.heroChange.HP = $scope.hero.HP - currentHP;
			}
			//add one week
			addAWeek();
		}

		$scope.greenRedCheck = function(check) {
			if (check > 0) {
				return 'green';
			} else if (check < 0) {
				return 'red';
			}
		}
		$scope.successFailCheck = function(check) {
			if (check === 'Success') {
				return 'green';
			} else if (check === 'Failed') {
				return 'red';
			}
		}		

		$scope.whichButtonTraining = function(index) {
			//values passed: 
				//trainingCalculation(successCheck, increase, skillName, cost)
				//base successCheck: 0.85 for T1 training, 0.75 for T2 training, 0.65 for T3 training
				//increase: 0.5 for T1 training, 2 for T2 training, 10 for T3 training per successful day
				//skillName: $scope.hero[key]
				//cost: 5 for T1 training, 25 for T2 training, 100 for T3 training per successful day
			if (index === 'end-1') {
				trainingCalculation(0.85, 0.5, 'endurance', 5);
			} else if (index === 'end-2') {
				trainingCalculation(0.75, 2, 'endurance', 25);
			} else if (index === 'end-3') {
				trainingCalculation(0.65, 10, 'endurance', 100);
			} else if (index === 'str-1') {
				trainingCalculation(0.85, 0.5, 'strength', 5);
			} else if (index === 'str-2') {
				trainingCalculation(0.75, 2, 'strength', 25);
			} else if (index === 'str-3') {
				trainingCalculation(0.65, 10, 'strength', 100);
			} else if (index === 'dex-1') {
				trainingCalculation(0.85, 0.5, 'dexterity', 5);
			} else if (index === 'dex-2') {
				trainingCalculation(0.75, 2, 'dexterity', 25);
			} else if (index === 'dex-3') {
				trainingCalculation(0.65, 10, 'dexterity', 100);
			} else if (index === 'agi-1') {
				trainingCalculation(0.85, 0.5, 'agility', 5);
			} else if (index === 'agi-2') {
				trainingCalculation(0.75, 2, 'agility', 25);
			} else if (index === 'agi-3') {
				trainingCalculation(0.65, 10, 'agility', 100);
			} else if (index === 'skill-1') {
				trainingCalculation(0.85, 0.5, 'skill', 5);
			} else if (index === 'skill-2') {
				trainingCalculation(0.75, 2, 'skill', 25);
			} else if (index === 'skill-3') {
				trainingCalculation(0.65, 10, 'skill', 100);
			}
		}

		///////////////////////////
		// HERO WORK             //
		///////////////////////////

		$scope.workingOptions = function() {
			if (!$scope.showMainWorkingOptions) {
				$scope.showMainWorkingOptions = true;
				$scope.showTrainingResults = false;
				$scope.showMainTrainingsOptions = false;
				$scope.showWorkingResults = false;
				$scope.showFightOption = false;
				$scope.showCombatLog = false;
				$scope.showShop = false;
				$scope.showShopConfirm = false;
			} else {
				$scope.showMainWorkingOptions = false;
			}
		}

		$scope.findSkill = function(index) {
			if (index === 'farm-1' || index === 'farm-2' || index === 'farm-3') {
				return $scope.hero.endurance;
			} else if (index === 'smith-1' || index === 'smith-2' || index === 'smith-3') {
				return $scope.hero.strength;
			} else if (index === 'bard-1' || index === 'bard-2' || index === 'bard-3') {
				return $scope.hero.dexterity;
			} else if (index === 'hunt-1' || index === 'hunt-2' || index === 'hunt-3') {
				return $scope.hero.agility;
			} else if (index === 'guard-1' || index === 'guard-2' || index === 'guard-3') {
				return $scope.hero.skill;
			}
		}

		$scope.skillCheck = function(skillLevel, required) {
			if (skillLevel >= required) {
				return false;
			} else {
				return true;
			}
		}

		$scope.workOptions = [
			{
				name : 'Farming',
				tip : 'Help with the chores on one of the many farms around your village',
				options : [
					{
						index : 'farm-1',
						name : 'Muck the stables',
						required : 0
					},
					{
						index : 'farm-2',
						name : 'Herd the sheeps and cows from and to the barn',
						required : 25
					},
					{
						index : 'farm-3',
						name : 'Work the fields - plowing, tilling, watering, harvesting...',
						required : 50
					},
				]
			},
			{
				name : 'Smithing',
				tip : 'Work in the village smithy, make money and gain strength',
				options : [
					{
						index : 'smith-1',
						name : 'Break charcoal - dirty but simple',
						required : 0
					},
					{
						index : 'smith-2',
						name : 'Work the bellows and stack ingots',
						required : 25
					},
					{
						index : 'smith-3',
						name : 'Work alongside the smith swinging a hammer',
						required : 50
					},
				]
			},
			{
				name : 'Bard\'ing',
				tip : 'A master bard lives in your village and he allows you to work for him',
				options : [
					{
						index : 'bard-1',
						name : 'Throw your master balls and other items for juggling',
						required : 0
					},
					{
						index : 'bard-2',
						name : 'Throw knives against audience participants',
						required : 25
					},
					{
						index : 'bard-3',
						name : 'Entertain the audience by juggling, dancing and hopping around',
						required : 50
					},
				]
			},
			{
				name : 'Hunting',
				tip : 'Help the hunters of your village',
				options : [
					{
						index : 'hunt-1',
						name : 'Run around the forest and scare animals out of their hiding places',
						required : 0
					},
					{
						index : 'hunt-2',
						name : 'Scout the forest silently and track the prey',
						required : 25
					},
					{
						index : 'hunt-3',
						name : 'Handle a bow and go hunting yourself',
						required : 50
					},
				]
			},
			{
				name : 'Guardsman',
				tip : 'Provide safety to the villagers',
				options : [
					{
						index : 'guard-1',
						name : 'Help the gate guards by bringing them their lunch',
						required : 0
					},
					{
						index : 'guard-2',
						name : 'Patrol the market and make sure no pickpockets are around',
						required : 25
					},
					{
						index : 'guard-3',
						name : 'Join the fight against the thieves guild',
						required : 50
					},
				]
			},
		]

		$scope.workingResults = [
			{
				weekday : 'Monday',
				result : ''
			},
			{
				weekday : 'Tuesday',
				result : ''
			},
			{
				weekday : 'Wednesday',
				result : ''
			},
			{
				weekday : 'Thursday',
				result : ''
			},
			{
				weekday : 'Friday',
				result : ''
			},
			{
				weekday : 'Saturday',
				result : ''
			},
			{
				weekday : 'Sunday',
				result : 'Day Off'
			},
		]

		$scope.totalWorkGoldIncrease = 0;
		$scope.totalWorkSkillIncrease = 0;

		function workingCalculation(skillLevel, difficultyCheck, goldIncrease, statIncrease, skillName) {
			resetHeroChangeObject();
			$scope.totalWorkGoldIncrease = 0;
			$scope.totalWorkSkillIncrease = 0;
			for (var i = 0; i < $scope.workingResults.length - 1; i++) {
				if (skillLevel / 500 + difficultyCheck > parseFloat(Math.random()).toFixed(2)) {
					$scope.workingResults[i].result = 'Success';
					$scope.totalWorkGoldIncrease += goldIncrease;
					$scope.totalWorkSkillIncrease += statIncrease;
				} else {
					$scope.workingResults[i].result = 'Failed';
				}
			}
			$scope.totalWorkSkillIncrease = Math.floor($scope.totalWorkSkillIncrease);
			$scope.hero.gold += $scope.totalWorkGoldIncrease;
			$scope.hero[skillName] += $scope.totalWorkSkillIncrease;
			if (skillName === 'endurance') {
				var currentHP = $scope.hero.HP;
				$scope.hero.HP = Math.floor($scope.hero.endurance * 2.5);
				$scope.heroChange.HP = $scope.hero.HP - currentHP;
			}
			$scope.heroChange.gold += $scope.totalWorkGoldIncrease;
			$scope.heroChange[skillName] += $scope.totalWorkSkillIncrease;
			$scope.showMainWorkingOptions = false;
			$scope.showWorkingResults = true;
			addAWeek();
		}

		$scope.whichButtonWork = function(index) {
			if (index === 'farm-1') {
				//values passed: 
				//base successchance: 0.85 for T1 job, 0.75 for T2 job, 0.65 for T3 job
				//gold gain: 1 for T1 job, 1 for T2 job, 5 for T3 job per successful day
				//skill gain: 0.2 for T1 job, 0.4 for T2 job, 0.7 for T3 job per successful day
				workingCalculation($scope.hero.endurance, 0.85, 1, 0.2, 'endurance');
			} else if (index === 'farm-2') {
				workingCalculation($scope.hero.endurance, 0.75, 3, 0.4, 'endurance');
			} else if (index === 'farm-3') {
				workingCalculation($scope.hero.endurance, 0.65, 5, 0.7, 'endurance');
			} else if (index === 'smith-1') {
				workingCalculation($scope.hero.strength, 0.85, 1, 0.2, 'strength');
			} else if (index === 'smith-2') {
				workingCalculation($scope.hero.strength, 0.75, 3, 0.4, 'strength');
			} else if (index === 'smith-3') {
				workingCalculation($scope.hero.strength, 0.65, 5, 0.7, 'strength');
			} else if (index === 'bard-1') {
				workingCalculation($scope.hero.dexterity, 0.85, 1, 0.2, 'dexterity');
			} else if (index === 'bard-2') {
				workingCalculation($scope.hero.dexterity, 0.75, 3, 0.4, 'dexterity');
			} else if (index === 'bard-3') {
				workingCalculation($scope.hero.dexterity, 0.65, 5, 0.7, 'dexterity');
			} else if (index === 'hunt-1') {
				workingCalculation($scope.hero.agility, 0.85, 1, 0.2, 'agility');
			} else if (index === 'hunt-2') {
				workingCalculation($scope.hero.agility, 0.75, 3, 0.4, 'agility');
			} else if (index === 'hunt-3') {
				workingCalculation($scope.hero.agility, 0.65, 5, 0.7, 'agility');
			} else if (index === 'guard-1') {
				workingCalculation($scope.hero.skill, 0.85, 1, 0.2, 'skill');
			} else if (index === 'guard-2') {
				workingCalculation($scope.hero.skill, 0.75, 3, 0.4, 'skill');
			} else if (index === 'guard-3') {
				workingCalculation($scope.hero.skill, 0.65, 5, 0.7, 'skill');
			}
		}

		///////////////////////////
		// HERO FIGHT            //
		///////////////////////////

		$scope.fightPreview = function() {
			if (!$scope.showFightOption) {
				$scope.showFightOption = true;
				$scope.showMainWorkingOptions = false;
				$scope.showWorkingResults = false;
				$scope.showTrainingResults = false;
				$scope.showMainTrainingsOptions = false;
				$scope.showCombatLog = false;
				$scope.showShop = false;
				$scope.showShopConfirm = false;
				monsterGenerator();
				addAWeek();	
			} else {
				$scope.showFightOption = false;
			}
		}

		$scope.comparisonObject = {
			endurance : '',
			strength : '',
			dexterity : '',
			agility : '',
			skill : ''
		}

		$scope.fightLog = [];
		$scope.fightResult = '';
		$scope.fightResultClass = '';
		$scope.fightResultButtonText = '';
		$scope.fightResultButtonClass = '';

		$scope.monster = {
			type : 'Ork',
			image : 'images/orc.png',
			level : 1,
			endurance : 5,
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
			$scope.monster.level = $scope.hero.level;
			//pick a weapon from array (max weapon = monster.level)
			if ($scope.monster.level <= $scope.weapon.length) {
				$scope.monster.weapon = $scope.weapon[Math.floor(Math.random() * $scope.monster.level)];
			} else {
				$scope.monster.weapon = $scope.weapon[Math.floor(Math.random() * $scope.weapon.length)];
			}
			//pick a armor from array (max armor = monster.level)
			if ($scope.monster.level <= $scope.armor.length) {
				$scope.monster.armor = $scope.armor[Math.floor(Math.random() * $scope.monster.level)];
			} else {
				$scope.monster.armor = $scope.armor[Math.floor(Math.random() * $scope.armor.length)];
			}
			//set attributes for endurance, strength, dexterity, agility and skill
			var attributes = $scope.monster.level * 5;
			$scope.monster.endurance = Math.round(Math.random() * (attributes - 1) + 1);
			attributes = attributes - $scope.monster.endurance;
			if ($scope.monster.endurance < 1) {
				$scope.monster.endurance = 1;
			}
			$scope.monster.HP = Math.floor($scope.monster.endurance * 2);
			$scope.monster.strength = Math.round(Math.random() * (attributes - 1) + 1);
			attributes = attributes - $scope.monster.strength;
			if ($scope.monster.strength < 1) {
				$scope.monster.strength = 1;
			}
			$scope.monster.dexterity = Math.round(Math.random() * (attributes - 1) + 1);
			attributes = attributes - $scope.monster.dexterity;
			if ($scope.monster.dexterity < 1) {
				$scope.monster.dexterity = 1;
			}
			$scope.monster.agility = Math.round(Math.random() * (attributes - 1) + 1);
			attributes = attributes - $scope.monster.agility;
			if ($scope.monster.agility < 1) {
				$scope.monster.agility = 1;
			}
			$scope.monster.skill = Math.round(Math.random() * (attributes - 1) + 1);
			attributes = attributes - $scope.monster.skill;
			if ($scope.monster.skill < 1) {
				$scope.monster.skill = 1;
			}
			//determine the loot for the monster
			$scope.monster.gold = Math.floor(Math.random() * ($scope.monster.level / 2) * 10 + $scope.monster.level);
			comparison('endurance');
			comparison('strength');
			comparison('dexterity');
			comparison('agility');
			comparison('skill');
		}

		var comparison = function(key) {
			if ($scope.hero[key] >= $scope.monster[key] + 50) {
				$scope.comparisonObject[key] = 'a lot less';
			} else if ($scope.hero[key] > $scope.monster[key]) {
				$scope.comparisonObject[key] = 'less';
			} else if ($scope.hero[key] === $scope.monster[key]) {
				$scope.comparisonObject[key] = 'equally as';
			} else if ($scope.hero[key] <= $scope.monster[key] + 50) {
				$scope.comparisonObject[key] = 'a lot more';
			} else if ($scope.hero[key] < $scope.monster[key]) {
				$scope.comparisonObject[key] = 'more';
			}
		}

		var heroHitCalc = function() {
			// random change between 1 and 100 + (hero dex + hero skill)
			return (Math.floor((Math.random() * 100) + 1) + ($scope.hero.dexterity * 0.25 + $scope.hero.skill));
		}

		var monsterHitCalc = function() {
			// random change between 1 and 100 + (monster dex + monster skill)
			return (Math.floor((Math.random() * 100) + 1) + ($scope.monster.dexterity * 0.25 + $scope.monster.skill));
		}

		var heroDodgeCalc = function() {
			return (Math.floor((Math.random() * 50) + 1) + ($scope.hero.agility * .25));
		}

		var monsterDodgeCalc = function() {
			return (Math.floor((Math.random() * 50) + 1) + ($scope.monster.agility * .25));
		}

		var heroDmgCalc = function() {
			var heroDmg = Math.floor(Math.random()*($scope.hero.weapon.maxDmg-$scope.hero.weapon.minDmg + 1) + $scope.hero.weapon.minDmg + $scope.hero.strength) - $scope.monster.armor.protection;
			$scope.fightLog.push({result: 'Hero causes ' + heroDmg + ' damage'});
			return heroDmg;
		}

		var monsterDmgCalc = function() {
			var monsterDmg = Math.floor(Math.random()*($scope.monster.weapon.maxDmg-$scope.monster.weapon.minDmg + 1) + $scope.monster.weapon.minDmg + $scope.monster.strength) - $scope.hero.armor.protection;
			$scope.fightLog.push({result: 'Monster causes ' + monsterDmg + ' damage'});
			return monsterDmg;
		}

		var heroDodge = function() {
			if (monsterHitCalc() < heroDodgeCalc()) {
				$scope.fightLog.push({result: 'Hero dodges'});	
			} else {
				$scope.fightLog.push({result: 'Monster hits'});
				$scope.hero.HP = $scope.hero.HP - monsterDmgCalc();
			}
		}

		var monsterDodge = function() {
			if (heroHitCalc() < monsterDodgeCalc()) {
				$scope.fightLog.push({result: 'Monster dodges'});
			} else {
				$scope.fightLog.push({result: 'Hero hits'});
				$scope.monster.HP = $scope.monster.HP - heroDmgCalc();
			}
		}

		var combatResult = function() {
			if ($scope.hero.HP <= 0 && $scope.monster.HP > 0) {
				$scope.fightResult = 'You Died!';
				$scope.fightResultClass = 'red';
				$scope.fightResultButtonText = 'OMG...';
				$scope.fightResultButtonClass = 'btn-danger';
				$scope.heroDied = true;
			}
			if ($scope.hero.HP > 0 && $scope.monster.HP <= 0) {
				$scope.fightResult = 'You win!';
				$scope.fightResultClass = 'green';
				$scope.hero.HP = Math.floor($scope.hero.endurance * 2.5);
				$scope.hero.fame += parseInt($scope.monster.level);
				$scope.hero.gold += $scope.monster.gold;
				$scope.hero.level++;
				resetHeroChangeObject();
				$scope.heroChange.fame = $scope.monster.level;
				$scope.heroChange.gold = $scope.monster.gold;
				$scope.heroDied = false;
			}
		}

		var combatSequence = function() {
			if ($scope.hero.agility >= $scope.monster.agility) {
				while ($scope.monster.HP > 0 && $scope.hero.HP > 0) {
					monsterDodge();
					$scope.fightLog.push({result: 'Monster has ' + $scope.monster.HP + ' HP left'});
					$scope.fightLog.push({result: ''});
					if ($scope.monster.HP <= 0) {
						break;
					}
					heroDodge();
					$scope.fightLog.push({result: 'Hero has ' + $scope.hero.HP + ' HP left'});
					$scope.fightLog.push({result: ''});
				}
			}
			if ($scope.hero.agility < $scope.monster.agility) {
				while ($scope.monster.HP > 0 && $scope.hero.HP > 0) {
					heroDodge();
					$scope.fightLog.push({result: 'heroHP: ' + $scope.hero.HP});
					$scope.fightLog.push({result: ''});
					if ($scope.hero.HP <= 0) {
						break;
					}
					monsterDodge();
					$scope.fightLog.push({result: 'monsterHP: ' + $scope.monster.HP});
					$scope.fightLog.push({result: ''});
				}
			}
		}

		$scope.fight = function() {
			$scope.fightLog = [];
			combatSequence();
			combatResult();
			console.log($scope.fightLog);
			console.log($scope.fightResult);
			$scope.showFightOption = false;
			$scope.showCombatLog = true;
		}

		$scope.theEnd = function() {
			$scope.startGame = false;
			$scope.start2 = false;
			$scope.game = false;
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = false;
			$scope.showMainWorkingOptions = false;
			$scope.showWorkingResults = false;
			$scope.showFightOption = false;
			$scope.showCombatLog = false;
			$scope.showShop = false;
			$scope.win = false;
			$scope.heroDeath = true;
		}

		///////////////////////////
		// HERO SHOP             //
		///////////////////////////

		$scope.showShopConfirm = false;
		$scope.weaponPurchase = false;
		$scope.armorPurchase = false;
		$scope.buyItem = {};
		var itemType;

		$scope.shopView = function() {
			console.log();
			if (!$scope.showShop) {
				$scope.showShop = true;
				$scope.showFightOption = false;
				$scope.showMainWorkingOptions = false;
				$scope.showWorkingResults = false;
				$scope.showTrainingResults = false;
				$scope.showMainTrainingsOptions = false;
				$scope.showCombatLog = false;
				$scope.showShopConfirm = false;
			} else {
				$scope.showShop = false;
			}
		}

		$scope.priceCheck = function(price) {
			if ($scope.hero.gold >= price) {
				return false;
			} else {
				return true;
			}
		}

		$scope.buyWeaponConfirmation = function(index) {
			$scope.buyItem = {};
			$scope.showShopConfirm = true;
			$scope.showShop = false;
			$scope.weaponPurchase = true;
			$scope.armorPurchase = false;
			$scope.buyItem = $scope.weapon[index];
			itemType = 0; //type set to weapon
		}

		$scope.buyArmorConfirmation = function(index) {
			$scope.buyItem = {};
			$scope.showShopConfirm = true;
			$scope.showShop = false;
			$scope.weaponPurchase = false;
			$scope.armorPurchase = true;
			$scope.buyItem = $scope.armor[index];
			itemType = 1; //type set to armor
		}

		$scope.buyIt = function() {
			resetHeroChangeObject();
			if (itemType === 0) {
				$scope.hero.weapon = $scope.buyItem;
				$scope.heroChange.weapon = $scope.buyItem.shopName;
				$scope.hero.gold -= $scope.buyItem.price;
				$scope.heroChange.gold -= $scope.buyItem.price;
			} else if (itemType === 1) {
				$scope.hero.armor = $scope.buyItem;
				$scope.heroChange.armor = $scope.buyItem.shopName;
				$scope.hero.gold -= $scope.buyItem.price;
				$scope.heroChange.gold -= $scope.buyItem.price;
			}
			$scope.showShopConfirm = false;
			$scope.weaponPurchase = false;
			$scope.armorPurchase = false;
			addAWeek();
		}

		$scope.dontBuyIt = function() {
			$scope.showShopConfirm = false;
			$scope.weaponPurchase = false;
			$scope.armorPurchase = false;
		}
	}])

