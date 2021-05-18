const { Client } = require('pg');
const { cyan } = require('chalk');

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'comments',
	port: 5432,
});

const query = `DROP TABLE IF EXISTS anon_comments;
DROP TYPE IF EXISTS media;
CREATE TYPE media AS ENUM('article', 'video');
CREATE TABLE anon_comments(
    id serial primary key,
    comment text not null,
    media_id integer not null,
    media_type media
);
INSERT INTO anon_comments (comment, media_id, media_type)
VALUES ('Best show on TV by a country mile. Brilliantly written and acted. Had me and my wife shouting at the screen last night.', 1, 'article'),
('Superb drama! I was absolutely gutted at the end of episode 5!', 1, 'article'),
('I look forward to the new reality show “Beat the Bear”.', 2, 'article'),
('If attacked by a grizzly, smile. Well, you have to grin and bear it!', 2, 'article'),
('I made this today. It was very good! Thanks for the recipe.', 3, 'video'),
('I am in love with this recipe! So delicious! I added dark chocolate chunks to it.', 3, 'video');`;

client.connect();
function createAndSeed() {
	client.query(query, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log(
				cyan('\nSuccessfully created and seeded anon_comments table.\n')
			);
		}
		client.end();
	});
}
createAndSeed();
