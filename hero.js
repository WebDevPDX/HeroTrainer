'use strict';

angular.module('heroTrainerApp', [])

	.controller('HeroController', ['$scope', function($scope) {
		$scope.hero = {
			name : 'noname',
			image : 'images/hero.jpg',
			fame : '',
			level : 2,
			strength : 5,
			dexterity : 5,
			agility : 5,
			skill : 5,
			//weapon : weapon[0],
			minDmg : 1,
			maxDmg : 3, 
			//armor : armor[0],
			HP : 10,
			gold : 100
		}

		$scope.heroChange = {
			fame : '',
			level : '',
			strength : '',
			dexterity : '',
			agility : '',
			skill : '',
			HP : '',
			gold : ''
		}

		$scope.currentWeek = 0;

		$scope.goldCheck = function(price) {
			if ($scope.hero.gold > price) {
				$scope.enoughGold = true;
			} else {
				$scope.enoughGold = false;
			}
		}

		$scope.showMainTrainingsOptions = false;
		$scope.showTrainingResults = false;
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
			//console.log($scope.heroChange);
		}
		function enduranceTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[0].options[1].increase);
			$scope.hero.HP += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[0].options[1].price;
			//console.log($scope.heroChange);
		}
		function enduranceTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[0].options[2].increase);
			$scope.hero.HP += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[0].options[2].price;
			//console.log($scope.heroChange);
		}
		function strengthTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[1].options[0].increase);
			$scope.hero.strength += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[1].options[0].price;
			//console.log($scope.heroChange);
		}
		function strengthTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[1].options[1].increase);
			$scope.hero.strength += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[1].options[1].price;
			//console.log($scope.heroChange);
		}
		function strengthTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[1].options[2].increase);
			$scope.hero.strength += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[1].options[2].price;
			//console.log($scope.heroChange);
		}
		function dexterityTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[2].options[0].increase);
			$scope.hero.dexterity += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[2].options[0].price;
			//console.log($scope.heroChange);
		}
		function dexterityTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[2].options[1].increase);
			$scope.hero.dexterity += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[2].options[1].price;
			//console.log($scope.heroChange);
		}
		function dexterityTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[2].options[2].increase);
			$scope.hero.dexterity += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[2].options[2].price;
			//console.log($scope.heroChange);
		}
		function agilityTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[3].options[0].increase);
			$scope.hero.agility += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[3].options[0].price;
			//console.log($scope.heroChange);
		}
		function agilityTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[3].options[1].increase);
			$scope.hero.agility += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[3].options[1].price;
			//console.log($scope.heroChange);
		}
		function agilityTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[3].options[2].increase);
			$scope.hero.agility += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[3].options[2].price;
			//console.log($scope.heroChange);
		}
		function skillTrainOne() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.85, $scope.skillTrainingsOptions[4].options[0].increase);
			$scope.hero.skill += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[4].options[0].price;
			//console.log($scope.heroChange);
		}
		function skillTrainTwo() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.75, $scope.skillTrainingsOptions[4].options[1].increase);
			$scope.hero.skill += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[4].options[1].price;
			//console.log($scope.heroChange);
		}
		function skillTrainThree() {
			$scope.showMainTrainingsOptions = false;
			$scope.showTrainingResults = true;
			trainingCalculation(0.65, $scope.skillTrainingsOptions[4].options[2].increase);
			$scope.hero.skill += $scope.totalTrainingResult;
			$scope.hero.gold += $scope.skillTrainingsOptions[4].options[2].price;
			//console.log($scope.heroChange);
		}

		$scope.trainingOptions = function() {
			if (!$scope.showMainTrainingsOptions) {
				$scope.showMainTrainingsOptions = true;
			} else {
				$scope.showMainTrainingsOptions = false;
			}
		}

		$scope.whichButton = function(index) {
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

	}])

