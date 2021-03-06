const faker = require('faker');
const Search = require('./connect-mysql');

Search.sync({ force: true })
	.then(() => {
		Search.create({
			restaurants: 'Kinjo',
			locations: 'Russian Hill, San Francisco',
			cuisines: 'Japanese'
		});
	})
	.then(() => {
		const cuisine = [
			'Japanese',
			'Chinese',
			'New American',
			'Mexican',
			'Korean',
			'Indian',
			'French',
			'Taiwanese'
		];
		for (let i = 1; i < 100; i++) {
			const random = Math.floor(Math.random() * cuisine.length);
			const restaurant = faker.lorem.word();
			Search.create({
				restaurants: restaurant.charAt(0).toUpperCase() + restaurant.slice(1),
				locations: `${faker.address.county()}, ${faker.address.city()}`,
				cuisines: cuisine[random]
			});
		}
		console.log('Data Has Been Successfully Seeded To The MySQL Database!');
	})
	.catch((err) => {
		console.error('Error During Data Seeding');
	});
