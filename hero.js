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
			weapon : weapon[0],
			minDmg : 1,
			maxDmg : 3, 
			armor : armor[0],
			HP : 10,
			gold : 100
		}
	}])

	.controller('TrainingController', ['$scope', function($scope) {

		$scope.showMainTrainingsOptions = false;
		$scope.skillTrainingsOptions = [
			{
				name : 'Endurance',
				tip : 'Allows you to last longer in a fight',
				options : [
					{
						name : 'Get punched for 3 hours a day',
						price : 5,
						cost : 'Costs you some dignity and 5 gold per week',
						increase : 0.5
					},
					{
						name : 'Get into bar fights',
						price : 25,
						cost : 'Ditching the authorities and replacing furniture: 25 gold per week',
						increase : 2
					},
					{
						name : 'Rocky Stalone',
						price : 100,
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
						name : 'Do some push and pull-ups',
						price : 5,
						cost : '5 gold for the use of non-professional equipment',
						increase : 0.5
					},
					{
						name : 'Go weight lifting',
						price : 25,
						cost : 'Good equipment but more expensive at 25 gold per week',
						increase : 2
					},
					{
						name : 'Arnold Whitegger',
						price : 100,
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
						name : 'Play darts at the local pub',
						price : 5,
						cost : '5 gold for getting drunk during your training',
						increase : 0.5
					},
					{
						name : 'Archery',
						price : 25,
						cost : 'Yep, arrows break in training - 25 gold per week',
						increase : 2
					},
					{
						name : 'EagleEye Johnson',
						price : 100,
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
						name : 'Archery helper',
						price : 5,
						cost : 'Pick up arrows while other\'s are practicing for 5 gold per week',
						increase : 0.5
					},
					{
						name : 'Dancing in a crowded ball room',
						price : 25,
						cost : 'Don\'t step on anybody\'s toes! 25 gold per week membership fee',
						increase : 2
					},
					{
						name : 'The Sober Monkey',
						price : 100,
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
						name : 'Training Dummy',
						price : 5,
						cost : 'Hack away at it. Don\'t forget to pay your 5 gold for the week',
						increase : 0.5
					},
					{
						name : 'Sparring',
						price : 25,
						cost : 'Fights against other trainees, organized for only 25 gold per week',
						increase : 2
					},
					{
						name : 'Neo Reeves',
						price : 100,
						cost : '"Learn the Kung Fu in 10 minutes" for 100 gold per week',
						increase : 10
					},
				]
			},
		]

		$scope.trainingOptions = function() {
			if (!$scope.showMainTrainingsOptions) {
				$scope.showMainTrainingsOptions = true;
			} else {
				$scope.showMainTrainingsOptions = false;
			}
		}

	}])

