//TODO : Change HP to Endurance in training

'use strict';

angular.module('heroTrainerApp', [])

	.controller('HeroController', ['$scope', function($scope) {

		$scope.hero = {
			name : 'noname',
			image : 'images/hero.jpg',
			fame : '',
			level : 2,
			endurance : 5,
			strength : 5,
			dexterity : 5,
			agility : 5,
			skill : 5,
			//weapon : weapon[0],
			minDmg : 1,
			maxDmg : 3, 
			//armor : armor[0],
			HP : '',
			gold : 100
		}

		$scope.hero.HP = Math.floor($scope.hero.endurance * 2.5);

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
				gold : ''
			}
		}

		$scope.currentWeek = 0;
		$scope.maxTime = 260;

		///////////////////////////
		// HERO TRAINING         //
		///////////////////////////

		$scope.showMainTrainingsOptions = false;
		$scope.showTrainingResults = false;
		$scope.showMainWorkingOptions = false;
		$scope.showTrainingResults = false;

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
						cost : 'Teaches you how to take a punch for 100 gold per week',
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

		function trainingCalculation(successCheck, increase, cost, skillGain) {
			resetHeroChangeObject();
			$scope.totalTrainingResult = 0;
			for (var i = 0; i < $scope.trainingResults.length; i++) {
				if (parseFloat(Math.random()).toFixed(2) <= successCheck) {
					$scope.trainingResults[i].result = 'Success';
					$scope.totalTrainingResult += increase;
				} else {
					$scope.trainingResults[i].result = 'Failed';
				}
			}
			$scope.totalTrainingResult = Math.round($scope.totalTrainingResult);
			$scope.currentWeek += 1;
		}

		function enduranceTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[0].options[0].increase);
			$scope.hero.HP += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[0].options[0].price;
			$scope.heroChange.HP = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[0].options[0].price;
			//console.log($scope.heroChange);
		}
		function enduranceTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[0].options[1].increase);
			$scope.hero.HP += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[0].options[1].price;
			$scope.heroChange.HP = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[0].options[1].price;
			//console.log($scope.heroChange);
		}
		function enduranceTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[0].options[2].increase);
			$scope.hero.HP += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[0].options[2].price;
			$scope.heroChange.HP = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[0].options[2].price;
			//console.log($scope.heroChange);
		}
		function strengthTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[1].options[0].increase);
			$scope.hero.strength += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[1].options[0].price;
			$scope.heroChange.strength = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[1].options[0].price;
			//console.log($scope.heroChange);
		}
		function strengthTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[1].options[1].increase);
			$scope.hero.strength += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[1].options[1].price;
			$scope.heroChange.strength = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[1].options[1].price;
			//console.log($scope.heroChange);
		}
		function strengthTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[1].options[2].increase);
			$scope.hero.strength += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[1].options[2].price;
			$scope.heroChange.strength = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[1].options[2].price;
			//console.log($scope.heroChange);
		}
		function dexterityTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[2].options[0].increase);
			$scope.hero.dexterity += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[2].options[0].price;
			$scope.heroChange.dexterity = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[2].options[0].price;
			//console.log($scope.heroChange);
		}
		function dexterityTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[2].options[1].increase);
			$scope.hero.dexterity += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[2].options[1].price;
			$scope.heroChange.dexterity = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[2].options[1].price;
			//console.log($scope.heroChange);
		}
		function dexterityTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[2].options[2].increase);
			$scope.hero.dexterity += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[2].options[2].price;
			$scope.heroChange.dexterity = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[2].options[2].price;
			//console.log($scope.heroChange);
		}
		function agilityTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[3].options[0].increase);
			$scope.hero.agility += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[3].options[0].price;
			$scope.heroChange.agility = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[3].options[0].price;
			//console.log($scope.heroChange);
		}
		function agilityTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[3].options[1].increase);
			$scope.hero.agility += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[3].options[1].price;
			$scope.heroChange.agility = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[3].options[1].price;
			//console.log($scope.heroChange);
		}
		function agilityTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[3].options[2].increase);
			$scope.hero.agility += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[3].options[2].price;
			$scope.heroChange.agility = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[3].options[2].price;
			//console.log($scope.heroChange);
		}
		function skillTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[4].options[0].increase);
			$scope.hero.skill += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[4].options[0].price;
			$scope.heroChange.skill = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[4].options[0].price;
			//console.log($scope.heroChange);
		}
		function skillTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[4].options[1].increase);
			$scope.hero.skill += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[4].options[1].price;
			$scope.heroChange.skill = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[4].options[1].price;
			//console.log($scope.heroChange);
		}
		function skillTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[4].options[2].increase);
			$scope.hero.skill += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[4].options[2].price;
			$scope.heroChange.skill = $scope.totalTrainingResult;
			$scope.heroChange.gold = $scope.skillTrainingsOptions[4].options[2].price;
			//console.log($scope.heroChange);
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

		$scope.trainingOptions = function() {
			console.log('training');
			if (!$scope.showMainTrainingsOptions) {
				$scope.showMainTrainingsOptions = true;
				$scope.showTrainingResults = false;
				$scope.showMainWorkingOptions = false;
				$scope.showWorkingResults = false;
			} else {
				$scope.showMainTrainingsOptions = false;
			}
		}

		$scope.whichButtonTraining = function(index) {
			if (index === 'end-1') {
				enduranceTrainOne();
			} else if (index === 'end-2') {
				enduranceTrainTwo();
			} else if (index === 'end-3') {
				enduranceTrainThree();
			} else if (index === 'str-1') {
				strengthTrainOne();
			} else if (index === 'str-2') {
				strengthTrainTwo();
			} else if (index === 'str-3') {
				strengthTrainThree();
			} else if (index === 'dex-1') {
				dexterityTrainOne();
			} else if (index === 'dex-2') {
				dexterityTrainTwo();
			} else if (index === 'dex-3') {
				dexterityTrainThree();
			} else if (index === 'agi-1') {
				agilityTrainOne();
			} else if (index === 'agi-2') {
				agilityTrainTwo();
			} else if (index === 'agi-3') {
				agilityTrainThree();
			} else if (index === 'skill-1') {
				skillTrainOne();
			} else if (index === 'skill-2') {
				skillTrainTwo();
			} else if (index === 'skill-3') {
				skillTrainThree();
			}
		}

		///////////////////////////
		// HERO WORK             //
		///////////////////////////

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
			$scope.heroChange.gold += $scope.totalWorkGoldIncrease;
			$scope.heroChange[skillName] += $scope.totalWorkSkillIncrease;
			$scope.showMainWorkingOptions = false;
			$scope.showWorkingResults = true;
			$scope.currentWeek += 1;
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

		$scope.workingOptions = function() {
			if (!$scope.showMainWorkingOptions) {
				$scope.showMainWorkingOptions = true;
				$scope.showTrainingResults = false;
				$scope.showMainTrainingsOptions = false;
				$scope.showWorkingResults = false;
			} else {
				$scope.showMainWorkingOptions = false;
			}
		}

	}])

