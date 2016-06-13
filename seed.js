/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
// var connectToDb = require('./server.js');
var models = require('./models');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Location = mongoose.model('Location');
var Event = mongoose.model('Event');
var Day = mongoose.model('Day');
var path = require('path');
var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();



//Fetches the Database URI from the env folder, which determines whether this is a production or development environment
var DATABASE_URI = require(path.join(__dirname, '/env')).DATABASE_URI;

// mongoose.connect(process.env.MONGODB);
var db = mongoose.connect(DATABASE_URI).connection;
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running!!!.');
  process.exit(1);
});

// Promises returned from mongoose queries/operations are BLUEBIRD promises
mongoose.Promise = Promise;

//require models so that we can more easily access certain models

// Modifying startDbPromise to return the db object to have an access to it when  .then on startDbPromise
var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', function () {
      resolve(db);
    });
    db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened!'));
});


var userSeed = [
    {
        name: 'Admin',
        email: 'admin@me.com',
        password: '123',
        isAdmin: true,
    },
    {
        name: 'Jeff',
        email: 'fenster.js@gmail.com',
        password: '1234',
        isAdmin: true,
    },
    {
        name: 'Talya',
        email: 'talman129@gmail.com',
        password: '1234',
        isAdmin: false,
    },
    {
        name: 'Erik',
        email: 'me2@me.com',
        password: '1234',
        isAdmin: false,
    },
];

var tripSeed = [
    {
        name: 'JATEEA',
        description: 'The Trip of a Life time to Europe and Back. Bada Bing, Bada Boom. This was an awesome paragraph to write, I enjoyed it. The trip will be fun.'
    },
    {
        name: 'JATEEA 2.0',
        description: 'Italy is a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',

    },
    {
        name: 'The Trip of a Lifetime',
        description: 'It was a trip that was a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',
    },
    {
        name: 'A Trip',
        description: 'My Trip is a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',
    },
    {
        name: 'One More Trip',
        description: 'This Trip is a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',
    },
    {
        name: 'The Trip for the Ages',
        description: 'This is Great and it is a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',
    }
];

var eventSeed = [
    {
        name: 'Italian Adventure',
        description: 'Italy is a destination dreamt by most of the people. If you like good weather, perfect setting, magnificent views, beautiful blue waters, traditional hula-dancing and exquisite cuisine, come to Hawaii to experience the true Polynesian culture. You can start your discovery by visiting all the islands that form this magnificent archipelago. Kauiai is the northernmost island in this volcanic chain and offers an unforgettable sight of natural and wild beauty. The beaches along the Coconut Coast are the perfect place to take a long, relaxing walk or to enjoy a romantic escapade. New discoveries are to be made at the Grand Canyon of the Pacific, in the massive Waimea Canyon. Oahu is the place where you will meet a lot of people of different origins, traditions and culture. Most of the island rises to the expectations of the 21st century and cultural, natural wonders will amaze you. The North Shore is usually very busy during the time of big winter waves, when the surfers are repeatedly attempting to defeat the powers of the ocean. If youre not such a great surfer but would like to catch an insight to the wonders of surfing, try it yourself on Waikiki beach, the perfect place for new-comers and amateurs.The island of Molokai is not as modern as the rest. It managed to preserve its natural setting, its history and native culture. Kaunakakaki is more of a sleepy-town which is just perfect for relaxing and meditating. Halawa Valley is a sight not to be missed by any chance thanks to its verdant flora.',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        tag: 'http://img.freeflagicons.com/thumb/speech_bubble_icon/italy/italy_640.png',
        type: 'Activity',
        coordinates: [{x: 41.890234, y: 12.492231}],
        priority: 3,
        duration: 30,
        keywords: ['waterfalls', 'ocean', 'mountains', 'nature', 'beaches', 'snorkeling', 'fish', 'hiking', 'swimming'],
    },
    {
        name: 'Grand Canyon Expidition',
        description: 'The Territory of Arizona comprises the extreme south-western portion of the United States. It is bounded on the north by Nevada and Utah, on the east by New Mexico, on the south by Sonora, on the west by California and Nevada. It extends from the one hundred and ninth meridian west to the Great Colorado; and from 31° 28 of north latitude to the thirty-seventh parallel, and contains an area of about 114,000 square miles. The physical features of the Territory may be described as a series of elevated plateau, having an altitude of from 100 feet in the south-west, up to 6,000 and 7,000 feet above the sea level, in the north. Mountain ranges, having a general direction of north-west by south-east, extend over this lofty plateau the entire length of the Territory. These mountains often present the appearance of broken and detached spurs, and sometimes occur in regular and continuous ranges. Narrow valleys and wide, open plains lie between the mountains, while deep canyons and gorges, formed by the rains and floods, which sometimes rush with irresistible force from the mountain barriers, cross the country in every direction. The most extensive of these grand mesas, or table lands, is the Colorado plateau, in the northern portion of the Territory, occupying nearly two-fifths of its entire area. This great plateau has an average altitude of between 5,000 and 6,000 feet. Its surface is diversified by lofty peaks and isolated ranges; it is covered nearly its entire extent with fine grasses; it is penetrated on the west by the Rio Colorado, which has worn a channel thousands of feet in depth. It is also cut by the San Juan on the north-east, and the Little Colorado, the Verde, the Salinas, and the San Francisco on the south. These rivers form in places deep gorges, and again widen into beautiful and productive valleys.',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        tag: 'http://img.freeflagicons.com/thumb/speech_bubble_icon/italy/italy_640.png',
        type: 'Activity',
        coordinates: [{x: 36.1128, y: -113.9961}],
        duration: 15,
        keywords: ['Grand Canyon', 'hot', 'desert', 'sun', 'hiking'],
    },
    {
        name: 'African Adventure',
        description: 'Africa is a land of great diversity. It is the second largest continent in the world. If you were to travel through the 53 countries of Africa, you would see many things. The weather ranges from very hot desert climate to wet rainforests to permanently frozen glaciers. The landforms include tropical islands, flat plains, and very steep mountains.The people of Africa are just as diverse. There are over a thousand languages spoken in Africa. People come from many tribes. They practice many religions. They hold a variety of jobs, from simple farming to service jobs in teaching and medicine to industrial jobs.Despite all this diversity, Africa has a strong identity as a continent. This book will look at the physical geography of Africa and how it has affected life there.',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        tag: 'http://img.freeflagicons.com/thumb/speech_bubble_icon/italy/italy_640.png',
        type: 'Activity',
        coordinates: [{x: 17.5707, y: 3.9962}],
        priority: 2,
        duration: 230,
        keywords: ['animals', 'safari', 'sahara', 'wildlife', 'nature'],
    },
    {
        name: 'Austrailian Undertaking',
        description: 'Australia is a stable, democratic and culturally diverse nation with a highly skilled workforce and one of the strongest performing economies in the world.With spectacular landscapes and a rich ancient culture, Australia is a land like no other. It is the earths sixth-largest country in land area and is the only nation to govern an entire continent.Australia in Brief provides an authoritative overview of Australias history, the land, its people and their way of life. It also looks at Australias economic, scientific and cultural achievements and its foreign, trade and defence policies.  This is the 50th edition of Australia in Brief, revised and updated in October 2014. The Department of Foreign Affairs and Trade is grateful for assistance from other Government departments and agencies, and various private organisations who have licensed the use of photos and graphics. Money values are given in Australian dollars unless otherwise indicated. Weights and measures are metric and imperial.',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        tag: 'http://img.freeflagicons.com/thumb/speech_bubble_icon/italy/italy_640.png',
        type: 'Activity',
        coordinates: [{x: -25.2744, y: 133.7751}],
        priority: 1,
        duration: 115,
        keywords: ['wildlife', 'desert', 'hot', 'safari', 'ocean', 'nature', 'biking', 'snorkeling'],
    },
    {
        name: 'Egyptian Excursion',
        description: 'The Nile Valley and Delta, the most extensive oasis on earth, was created by the worlds longest river and its seemingly inexhaustible sources. Without the topographic channel that permits the Nile to flow across the Sahara, Egypt would be entirely desert. The length within Egypt of the River Nile in its northwards course from three central African sources – the White Nile, the Blue Nile, and the Atbara – totals some 1,600 km.The White Nile, which begins at Lake Victoria in Uganda, supplies about 28% of the Niles Egyptian waters. In its course from Lake Victoria to Juba in South Sudan, the White Niles channel drops more than 600 m. In its 1,600-km course from Juba to Khartoum, Sudans capital, the river descends just 75 m. In South Sudan, the White Nile passes through the Sudd, a wide, flat plain covered with swamp vegetation and slows almost to the point of stagnation.The Blue Nile, which originates at Lake Tana in Ethiopia, provides on average some 58% of the Niles Egyptian waters. This river has a steeper gradient and therefore flows more swiftly than the White Nile, which it joins at Khartoum. Unlike the White Nile, the Blue Nile carries a considerable amount of sediment. For several kilometres north of Khartoum, water closer to the eastern bank of the river, coming from the Blue Nile, is visibly muddy, while that closer to the western bank, and coming from the White Nile, is clearer.The much shorter Atbara River, which also originates in Ethiopia, joins the main Nile north of Khartoum between the fifth and sixth cataracts (areas of steep rapids) and provides about 14% of the Niles waters in Egypt. During the low-water season, which runs from January to June, the Atbarah shrinks to a number of pools. But, in late-summer, when torrential rains fall on the Ethiopian Highlands, the Atbarah provides 22% of the Niles flow.The Blue Nile has a similar pattern. It contributes 17% of the Niles waters in the low-water season and 68% during the high-water season. In contrast, the White Nile provides only 10% of the Niles waters during the high-water season but contributes more than 80% during the low-water period. Thus, before the Aswan High Dam was completed in 1971, the White Nile watered the Egyptian stretch of the river throughout the year, whereas the Blue Nile, carrying seasonal rain from Ethiopia, caused the Nile to overflow its banks and deposit a layer of fertile mud over adjacent fields. The great flood of the main Nile usually occurred in Egypt during August, September, and October, but it sometimes began as early as June at Aswan and often did not completely wane until January.The Nile enters Egypt a few kilometers north of Wadi Halfa, a Sudanese town that was completely rebuilt on high ground when its original site was submerged in the reservoir created by the Aswan High Dam. As a result of the dams construction, the Nile actually begins its flow into Egypt as Lake Nasser, which extends southwards from the dam for 320 km to the border and for an additional 158 km within Sudan. Lake Nassers waters fill the area through Lower Nubia (Upper Egypt and northern Sudan) within the narrow canyon between the cliffs of sandstone and granite created by the flow of the river over many centuries.',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        tag: 'http://img.freeflagicons.com/thumb/speech_bubble_icon/italy/italy_640.png',
        type: 'Activity',
        coordinates: [{x: 29.9792, y: 31.1342}],
        priority: 3,
        duration: 130,
        keywords: ['pyramids', 'Nile River', 'desert', 'sphynx'],
    },
    {
        name: 'Exploring China',
        description: 'Viewing the world map, you will find that China is a vast country situated at the eastern part of Eurasia and the western coast of the Pacific Ocean. Covering a land area of 3,706,581 square miles (9,600,000 square kilometers), China is the third largest of the world, inferior to Russia and Canada. It is 3,231 miles long from east to west and 3,417.5 miles long from north to south. With the entire territory shaping like a rooster, its northernmost end reaches Mohe in Heilongjiang Province; the southernmost is at Zengmu Ansha in Nansha Islands, the easternmost at conjunction of Heilongjiang River and the Wusuli River, while the western at the Pamirs. China is an ancient country having a profound history. Originated in the eastern area of the Yellow River Region, the countrys civilization is over 5,000 years old and was considered one of four ancient civilizations of the world, along with the civilizations of the ancient Babylon, the ancient Egypt and the ancient India. The first dynasty of Chinese history started from the Xia Dynasty (2070BC-1600BC) and the last one was the Qing Dynasty (1644-1912), while the most glorious period were the Qin (221BC-206BC), Han (206BC-220), Tang (618-907) and Ming (1368-1644) dynasties. During thousands of years of feudal ruling, Chinese people have created brilliant science and art culture, like the Four Great Inventions, the poetry, paintings and Chinese calligraphy. Also, a great amount of cultural relics such as the Great Wall and the Terra Cotta Warriors left by ancestors have become the treasures of the nation and the wonder of the world. Founded in 1949 by the Communist Party, the Peoples Republic of China (PRC) is a unified multi-ethnic country. 56 nationalities are now living in 34 direct administrative regions including 23 provinces, five autonomous regions, four directly-governed city regions–Beijing, Shanghai, Tianjin and Chongqing and two special administrative regions (SAR)–Hong Kong and Macau. The 55 ethnic minorities mainly live in Chongqing, Gansu, Guangxi, Guizhou, Hainan, Heilongjiang, Hubei, Hunan, Inner Mongolia, Jilin, Liaoning, Ningxia, Qinghai, Sichuan, Tibet, Xinjiang and Yunnan. China is also the most populous country in the world. Being over 1.3 billion (in the end of 2007), the countrys population is about 22 percent of the world population. The most populous part is the eastern coastal areas. Almost 94 percent of Chinese people live in the Southeast part of the country which covers 43 percent of its land area; while the other six percent people live in the northwestern areas which cover 57 percent of the territory.',
        image: 'http://www.thecanyon.com/assets/css/images/grandcanyon1.jpg',
        tag: 'http://img.freeflagicons.com/thumb/speech_bubble_icon/italy/italy_640.png',
        type: 'Activity',
        coordinates: [{x: 35.8617, y: 104.1954}],
        priority: 2,
        duration: 45,
        keywords: ['Great Wall of China', 'Genearl Tsos Chicken', 'mountains', 'nature', 'hiking', 'biking', 'food'],
    }
];

var locationSeed = [
    {
        name: 'Rome',
        coordinates: [{x: 35.8917, y: 104.1954}],
        tag: '/assets/flags/italy.png',
    },
    {
        name: 'Venice',
        coordinates: [{x: 35.8947, y: 104.1954}],
        tag: '/assets/flags/italy.png',
    },
    {
        name: 'Florence',
        coordinates: [{x: 35.8947, y: 104.1954}],
        tag: '/assets/flags/italy.png',
    },
    {
        name: 'Paris',
        coordinates: [{x: 32.8917, y: 101.1954}],
        tag: '/assets/flags/france.png',
    },
    {
        name: 'Brussels',
        coordinates: [{x: 36.8917, y: 103.1954}],
        tag: '/assets/flags/belgium.png',
    },
    {
        name: 'Amsterdam',
        coordinates: [{x: 36.8917, y: 103.1754}],
        tag: '/assets/flags/netherlands.png',
    },
    {
        name: 'Budapest',
        coordinates: [{x: 36.8317, y: 103.1254}],
        tag: '/assets/flags/hungary.jpg',
    },
    {
        name: 'Vienna',
        coordinates: [{x: 36.8917, y: 103.2354}],
        tag: '/assets/flags/austria.jpg',
    },
    {
        name: 'Prague',
        coordinates: [{x: 35.3917, y: 104.1354}],
        tag: '/assets/flags/czech.png',
    },
    {
        name: 'London',
        coordinates: [{x: 35.1917, y: 104.8954}],
        tag: '/assets/flags/england.jpg',
    },
    {
        name: 'Athens',
        coordinates: [{x: 35.4917, y: 104.6954}],
        tag: '/assets/flags/greece.jpg',
    },

];

var daySeed = [
    {
        events: [],
        date: ''
    },
    {
        events: [],
        date: ''
    },
    {
        events: [],
        date: ''
    },
    {
        events: [],
        date: ''
    },
    {
        events: [],
        date: ''
    },
    {
        events: [],
        date: ''
    },

];

var wipeCollections = function () {
    var models = [User, Day, Location, Trip, Event];

    return Promise.map(models, function(model) {
        return model.remove({}).exec();
    });
};

// tripSeed, locationSeed, daySeed, eventSeed, userSeed
var seedDB = function() {
    var randomizeSelector = function(array) {
      var random = Math.floor(Math.random() * array.length);
      var randomSelection = array[random];
      return randomSelection;
    };

    var eventsList;
    var usersList;
    var locationList;
    return Event.create(eventSeed)
    .then(function(events) {
        // console.log("Events", events)
        eventsList = events;
        return User.create(userSeed);
    })
    .then(function(users){

        usersList = users;

        //LOCATION SEED

        var dayNum = 14;
        var monthNum = 5;
        var counter = 0;
        return Promise.map(locationSeed, function(location) {

            var beginDate =  new Date(2016, monthNum, dayNum).toISOString();
            var endDate =  new Date(2016, monthNum, dayNum + 4).toISOString();

            location.begin = beginDate.substring(0,10)
            location.end = endDate.substring(0,10)

            counter++;
            dayNum+=4;
            if(counter===3) monthNum++;

            console.log("THE LOCATION THATS ABOUT TO BE CREATED:", location)
            return Location.create(location);
        });


    })
    .then(function(locations){

        locationList = locations

        //TRIP SEED
        return Promise.map(tripSeed, function(trip) {

            var beginDate = new Date(2016, 6, 14).toISOString();
            var endDate = new Date(2016, 7, 21).toISOString();

            trip.begin = beginDate.substring(0,10)
            trip.end = endDate.substring(0,10)
            trip.users = [];
            trip.locations = [];

            //Pick Random Users to add to trip Array
            var randomUser1 = randomizeSelector(usersList)._id
            var randomUser2 = randomizeSelector(usersList)._id
            var randomUser3 = randomizeSelector(usersList)._id
            var randomUser4 = randomizeSelector(usersList)._id

            //Pick Random Locations to add to Trip Array
            var randomLocation1 = randomizeSelector(locationList)._id
            var randomLocation2 = randomizeSelector(locationList)._id
            var randomLocation3 = randomizeSelector(locationList)._id
            var randomLocation4 = randomizeSelector(locationList)._id

            //Create the Users Array to add to the Trip
            trip.users.push(randomUser1)
            if (trip.users.indexOf(randomUser2) === -1) trip.users.push(randomUser2)
            if (trip.users.indexOf(randomUser3) === -1) trip.users.push(randomUser3)
            if (trip.users.indexOf(randomUser4) === -1) trip.users.push(randomUser4)

            //Create the Locations Array to add to the Trip
            trip.locations.push(randomLocation1)
            if (trip.locations.indexOf(randomLocation2) === -1) trip.locations.push(randomLocation2)
            if (trip.locations.indexOf(randomLocation3) === -1) trip.locations.push(randomLocation3)
            if (trip.locations.indexOf(randomLocation4) === -1) trip.locations.push(randomLocation4)

            console.log("THE TRIP THATS ABOUT TO BE CREATED:", trip)
            return Trip.create(trip);
        });


    })
    .then(function(locationList){

        //DAY SEED

        var dayNum = 14;
        var monthNum = 5;
        var counter = 0;
        return Promise.map(daySeed, function(day) {
            var eventToAddToDay1 = randomizeSelector(eventsList)._id;
            var eventToAddToDay2 = randomizeSelector(eventsList)._id;
            var eventToAddToDay3 = randomizeSelector(eventsList)._id;
            // console.log("The Events Being Added", eventToAddToDay1, eventToAddToDay2, eventToAddToDay3)
            // console.log("dayDate", monthNum, dayNum, day)
            var dayDate =  new Date(2016, monthNum, dayNum).toISOString();

            day.date = dayDate.substring(0,10)
            day.location = randomizeSelector(locationList)._id
            day.events.push(eventToAddToDay1);
            day.events.push(eventToAddToDay2);
            day.events.push(eventToAddToDay3);
            day.user = randomizeSelector(usersList);

            counter++;
            dayNum++;
            if(counter===3) monthNum++;

            console.log("THE DAY THATS ABOUT TO BE CREATED:", day)
            return Day.create(day);
        });
    })
};

startDbPromise
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        console.log(chalk.blue("Collections Wiped"))
        return seedDB();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
