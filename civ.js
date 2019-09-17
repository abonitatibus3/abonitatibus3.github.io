// var numSel = 0

var selected = []
var newSelected = []
var newDeselected = []

function pageUpdate() {
  console.log(newSelected)
  for (var i = 0; i < newSelected.length; i++)
  {
    var idName = newSelected[i].replace(/\s+/g, '-')
    $('#' + idName + '-button').addClass('active')
    $('#' + idName + '-button').prop('aria-pressed', true)
    $().button('toggle')
  }
  for (var j = 0; j < newDeselected.length; j++)
  {
    $('#' + newDeselected[j].replace(/\s+/g, '-')  + '-button').removeClass('active')
    $('#' + idName + '-button').prop('aria-pressed', false)
  }
  newSelected = []
  newDeselected = []
  $('#random-leader-select-btn').prop('disabled', selected.length < 1)
  // console.log(selected)
}

// Fills in the leader's agenda
function leaderAgendaFill(a_name, a_title, a_text) {
  $('#leader-name').text(a_name)
  $('#leader-agenda').text("Agenda: " + a_title) 
  $('#leader-agenda-text').text(a_text)
}

// Puts the hidden agenda text on the page
function hiddenAgendaFill(a_title, a_text) {
  $('#hidden-agenda').text("Agenda: " + a_title)
  $('#hidden-agenda-text').text(a_text)
}

// Puts the randomly chosen leader's name on the page
function randomLeaderFill(name) {
  $('#random-leader-name').text('')
  $('#random-leader-name').text(name)
}

function selectByType(type) {
  $.each(leaderData, function(i, item) {
    var lname = item['Leader']
    if (item['Leader Tags'].includes(type))
    {
      if (selected.indexOf(lname) < 0)
      {
        selected.push(lname)
        newSelected.push(lname)
      }
    }
  })
  pageUpdate()
}

function deselectByType(type) {
  $.each(leaderData, function(i, item) {
    var lname = item['Leader']
    if (item['Leader Tags'].includes(type))
    {
      var idx = selected.indexOf(lname)
      if (idx >= 0)
      {
        selected.splice(idx, 1)
        newDeselected.push(lname)
      }
    }
  })
  pageUpdate()
}


function buttonClick(name) {
  var idx = selected.indexOf(name)
  if (idx >= 0)
  {
    newDeselected = selected.splice(idx, 1)
  }
  else
  {
    selected.push(name)
    newSelected.push(name)
  }
  pageUpdate()
}

// Matches substrings for predictive list of leaders
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex

    // an array that will be populated with substring matches
    matches = []

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i')

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str)
      }
    });
    if (matches.length == 1) {
      leaderAgendaFill(matches[0], leaderAgenda[matches[0]], agendaDescription[leaderAgenda[matches[0]]])
    }
    else
    {
      leaderAgendaFill('', '','')
    }
    cb(matches)
  };
};





// ToDo: split this off in its own file, as well as the other lists below. Hardcoding in here
// seems silly, lets just read in text files and parse them to our liking.
// Update: Turns out reading this all in and parsing it massively slows down the page.
// gonna leave it here until I find out how to make it better.
var leaders = {
  'Alexander': 'Macedonian',
  'Amanitore': 'Nubian',
  'Catherine de Medici': 'French',
  'Chandragupta': 'Indian',
  'Cleopatra': 'Egyptian',
  'Cyrus': 'Persian',
  'Dido': 'Phoenician',
  'Eleanor of Aquitaine': 'English, French',
  'Frederick Barbarossa': 'German',
  'Gandhi': 'Indian',
  'Genghis Khan': 'Mongolian',
  'Gilgamesh': 'Sumerian',
  'Gitarja': 'Indonesian',
  'Gorgo': 'Greek',
  'Harald Hardrada': 'Norwegian',
  'Hojo Tokimune': 'Japanese',
  'Jadwiga': 'Polish',
  'Jayavarman VII': 'Khmer',
  'John Curtin': 'Australian',
  'Kristina': 'Swedish',
  'Kupe': 'Māori',
  'Lautaro': 'Mapuche',
  'Mansa Musa': 'Mali',
  'Matthias Corvinus': 'Hungarian',
  'Montezuma': 'Aztec',
  'Mvemba a Nzinga': 'Kongolese',
  'Pachacuti': 'Incan',
  'Pedro II': 'Brazilian',
  'Pericles': 'Greek',
  'Peter': 'Russian',
  'Philip II': 'Spanish',
  'Poundmaker': 'Cree',
  'Qin Shi Huang': 'Chinese',
  'Robert the Bruce': 'Scottish',
  'Saladin': 'Arabian',
  'Seondeok': 'Korean',
  'Shaka': 'Zulu',
  'Tamar': 'Georgian',
  'Teddy Roosevelt': 'American',
  'Tomyris': 'Scythian',
  'Trajan': 'Roman',
  'Victoria': 'British',
  'Wilhelmina': 'Dutch',
  'Wilfrid Laurier': 'Canadian',
  }

var leaderAgenda = {
  'Gilgamesh': 'Ally of Enkidu',
  'Jayavarman VII': 'An End to Suffering',
  'Gitarja': 'Archipelagic State',
  'Saladin': 'Ayyubid Dynasty',
  'Tomyris': 'Backstab Averse',
  'Teddy Roosevelt': 'Big Stick Policy',
  'Wilhelmina': 'Billionare',
  'Catherine de Medici': 'Black Queen',
  'Hojo Tokimune': 'Bushido',
  'Seondeok': 'Cheomseongdae',
  'Amanitore': 'City Planner',
  'Philip II': 'Counter Reformer',
  'Pericles': 'Delian League',
  'Mvemba a Nzinga': 'Enthusiastic Disciple',
  'Robert the Bruce': 'Flower of Scotland',
  'Shaka': 'Horn, Chest, Loins',
  'Genghis Khan': 'Horse Lord',
  'Poundmaker': 'Iron Confederacy',
  'Frederick Barbarossa': 'Iron Crown',
  'Harald Hardrada': 'Last Viking King',
  'Chandragupta': 'Maurya Empire',
  'Tamar': 'Narikala Fortress',
  'Cyrus': 'Opportunist',
  'Trajan': 'Optimus Princeps',
  'Pedro II': 'Patron of the Arts',
  'Gandhi': 'Peacekeeper',
  'John Curtin': 'Perpetually on Guard',
  'Cleopatra': 'Queen of the Nile',
  'Jadwiga': 'Saint',
  'Alexander': 'Short Life of Glory',
  'Lautaro': 'Spirit of Tucapel',
  'Victoria': 'Sun Never Sets',
  'Montezuma': 'Tlatoani',
  'Qin Shi Huang': 'Wall of 10,000 Li',
  'Peter': 'Westernizer',
  'Gorgo': 'With Your Shield Or On It',
  'Eleanor of Aquitaine': 'Angevin Empire',
  'Kristina': 'Bibliophile',
  'Wilfrid Laurier': 'Canadian Expeditionary Force',
  'Kupe': 'Kaitiakitanga',
  'Suleiman': 'Lawgiver',
  'Mansa Musa': 'Lord of the Mines',
  'Matthias Corvinus': 'Raven Banner',
  'Dido': 'Sicilian Wars',
  'Pachacuti': 'Qhapaq Ñan'
}

var agendaDescription = {
  'Ally of Enkidu': `Is easy to befriend, and likes civilizations who are 
    his Declared Friends. Dislikes anyone denouncing or attacking his 
    friends.`,
  'An End to Suffering': `Likes civilizations with many Holy Sites and 
    with high average city Population. Dislikes civilizations lacking 
    in either of these areas.`,
  'Archipelagic State': `Likes civilizations who avoid settling or 
    conquering cities on small landmasses. Hates anyone with numerous 
    cities on such islands.`,
  'Ayyubid Dynasty': `Wants his Worship building in as many cities as 
    possible, and likes civilizations with it. Dislikes civilizations 
    following other Religions or waging war on followers of his Religion.`,
  'Backstab Averse': `Likes civilizations who are willing to establish a 
    long-term Alliance with her. Hates civilizations who backstab and 
    declare Suprise Wars.`,
  'Big Stick Policy': `Likes peaceful Civilizations that have a city on his 
    home continent. hates civilizations starting wars on his continent.`,
  'Billionare': `Likes civilizations that send Trade Routes to her cities. 
    Dislikes civilizations who refrain from sending her Trade Routes.`,
  'Black Queen': `Gains as many Spies and as much diplomatic access as 
    possible, and likes those who do the same. Dislikes civilizations 
    that ignore espionage activities and have little diplomatic access.`,
  'Bushido': `Likes civilizations that have a strong military and Faith and 
    Culture output. Dislikes civilizations that are strong in military 
    but weak in Faith or Culture.`,
  'Cheomseongdae': `Focuses on building up Science, and respects 
    civilizations who do the same. Dislikes civilizations with a weak 
    Science output.`,
  'City Planner': `Tries to keep the maximum number of districts in each 
    city and likes civilizations who match that approach. Dislikes 
    civilizations that don't build as many districts as possible in 
    their cities.`,
  'Counter Reformer': `Likes civilizations who follow the same Religion, 
    and wants his cities to all follow the same Religion. Hates anyone 
    trying to spread their Religion into his empire.`,
  'Delian League': `Likes civilizations that aren't competing for the same 
    city-state allegiance. Dislikes civilizations that are directly 
    competing for city-state allegiance.`,
  'Enthusiastic Disciple': `Likes civilizations that bring Religion to the 
    Kongo. Dislikes civilizations that have founded a Religion but not 
    brought it to a Kongolese city.`,
  'Flower of Scotland': `Will never attack his neighboring civilizations 
    unless they break a promise to him, and dislikes anyone waging war 
    on them. Likes civilizations not at war with his neighbors.`,
  'Horn, Chest, Loins': `Tries to form as many Corps and Armies as possible,
     and likes those who follow his lead. Dislikes civilizations with few
     Corps and Armies.`,
  'Horse Lord': `Builds a strong cavalry force, and likes those who do not 
    compete in cavalry. Dislikes civilizations who rival him in cavalry 
    strength.`,
  'Iron Confederacy': `Tries to establish as many Alliances as possible, and
     likes civilizations that do the same. Dislikes civilizations that 
    don\'t establish Alliances.`,
  'Iron Crown': `Will try to conquer city-states, and likes civilizations who
     do not associate with them. Dislikes Suzerains of city-states, or 
    civilizations who have conquered city-states.`,
  'Last Viking King': `Builds a strong navy, and likes civilizations who do 
    the same. Dislikes civilizations with a weak navy.`,
  'Maurya Empire': `Dislikes civilizations that have cities close to his 
    borders and will try to conquer them. Likes civilizations that are 
    not his neighbors.`,
  'Narikala Fortress': `Tries to put high level Walls around her cities and 
    respects civilizations that do the same. Dislikes civilizations that 
    fail to fortify their cities.`,
  'Opportunist': `Will often declare Suprise Wars, and likes civilizations 
    that do the same. Dislikes civilizations who do not use Suprise War 
    declarations.`,
  'Optimus Princeps': `Tries to include as much territory as possible in his
     empire, and respects those who do the same. Dislikes civilizations 
    that control little territory.`,
  'Patron of the Arts': `Likes civilizations who are not competing for Great
     People, and will recruit Great People whenever possible. Dislikes 
    civilizations with more Great People than him.`,
  'Peacekeeper': `Never declares wars for which he can be branded a 
    warmonger, and will try to befriend those who maintain the peace. 
    Hates warmongers.`,
  'Perpetually on Guard': `Forms Defensive Pacts with friends and likes 
    civilizations that liberate cities. Dislikes civilizations that 
    are occupying enemy cities.`,
  'Queen of the Nile': `Likes civilizations with powerful militaries, and 
    will try to ally with them to avoid conflict. Dislikes civilizations 
    with weak militaries.`,
  'Raven Banner': `Levies troops from city-states. Likes civilizations that 
    also use city-state troops, dislikes those that shun such mercenaries.`,
  'Saint': `Focuses on building up Faith, and likes civilizations who do the 
    same. Dislikes civilizations with a weak Faith output.`,
  'Short Life of Glory': `Likes civilizations at war with powers other than 
    Macedon. Has disdain for civilizations at peace.`,
  'Spirit of Tucapel': `Tries to maintain a high degree of loyalty in his 
    cities, and respects civilizations who do the same. Dislikes 
    civilizations that fail to maintain the loyalty of their cities.`,
  'Sun Never Sets': `Likes civilizations on her continent, and will try to 
    expand to all continents. Dislikes civilizations on continents where 
    she has no city.`,
  'Tlatoani': `Likes civilizations who have the same Luxury resources as he 
    does, and will try to collect every Luxury resource available. 
    Dislikes civilizations who have a new Luxury resource he has not yet 
    collected.`,
  'Wall of 10,000 Li': `Builds wonders whenever possible, and likes 
    civilizations not competing for wonders. Dislikes civilizations with 
    more wonders than him.`,
  'Westernizer': `Likes civilizations that are ahead of him in Science and 
    Culture. Dislikes civilizations that are lagging in Science and 
    Culture.`,
  'With Your Shield Or On It': `Never gives up items in a peace deal, and 
    likes civilizations who match that approach. Dislikes civilizations 
    who have capitulated or who have never gone to war.`,
  'Angevin Empire': `Builds up the Population of her cities, and likes 
    likes those whose nearby cities also have a high Population. Dislikes 
    civilizations whose nearby cities have low Population.`,
  'Bibliophile': `Tries to collect as many Great Works as possible and 
    likes those who leave them to her. Dislikes civilizations with 
    many Great Works.`,
  'Canadian Expeditionary Force': `Responds to Emergencies whenever 
    possible, and likes civilizations who do the same. Dislikes those 
    that ignore Emergencies.`,
  'Kaitiakitanga': `Tries to avoid contributing to climate change by not 
    removing features, planting Woods, and founding National Parks, and 
    likes those who do the same. Dislikes civilizations that show little 
    concern for the environment.`,
  'Lawgiver': `Tries to keep his cities happy and loyal, and likes those 
    who do the same, especially if the have taken cities from other 
    civilizations. Dislikes those who struggle with happiness and loyalty, 
    or that own few conquered cities.`,
  'Lord of the Mines': `Tries to build up Gold, and likes those that also 
    focus on Gold. Dislikes civilizations with weak Gold output.`,
  'Sicilian Wars': `Wants ot settle coastal cities, and likes civilizations 
    that settle inland. Dislikes civilizations with many coastal cities.`,
  'Qhapaq Ñan': `Domestic Trade Routes gain +1 Food for every Mountain tile in 
    the origin city. Gain the Qhapaq Ñan unique improvement with Foreign Trade.`
}

var leaderData = [
  {
    "Leader": "Alexander",
    "Civ": "Macedonian",
    "Leader Tags": "War",
    "Leader Bonus": "To World's End:Cities do not incur war weariness. All military units heal completely when this player captures a city with a world wonder.",
    "Leader Agenda": "Short Life of Glory:Likes civilizations at war with powers other than Macedon. Has disdain for civilizations at peace."
  },
  {
    "Leader": "Amanitore",
    "Civ": "Nubian",
    "Leader Tags": "",
    "Leader Bonus": "Kandake of Meroë:+20% Production towards all district rising to +40% if there is a Nubian Pyramid adjacent to the City Center.",
    "Leader Agenda": "City Planner:Tries to keep the maximum number of districts in each city and likes civilizations who match that approach. Dislikes civilizations that don't build as many districts as possible in their cities."
  },
  {
    "Leader": "Catherine de Medici",
    "Civ": "French",
    "Leader Tags": "Culture",
    "Leader Bonus": "Catherine's Flying Squadron:Has 1 level of Diplomatic Visibility greater than normal with every civilization that she's met. Receives a free Spy(and extra spy capacity) with the Castles technology. All spies start as Agents with a free promotion.",
    "Leader Agenda": "Black Queen:Gains as many Spies and as much diplomatic access as possible, and likes those who do the same. Dislikes civilizations that ignore espionage activities and have little diplomatic access."
  },
  {
    "Leader": "Chandragupta",
    "Civ": "Indian",
    "Leader Tags": "War; Religion",
    "Leader Bonus": "Arthashastra:Can declare a War of Territorial Expansion after gaining the Military Training Civic. +2 Movement and +5 Combat Strength for the first 10 turns after declaring a War of Territorial Expansion.",
    "Leader Agenda": "Maurya Empire:Dislikes civilizations that have cities close to his borders and will try to conquer them. Likes civilizations that are not his neighbors."
  },
  {
    "Leader": "Cleopatra",
    "Civ": "Egyptian",
    "Leader Tags": "Economy; Religion",
    "Leader Bonus": "Mediterranean's Bride:Your Trade Routes to other civilizations provide +4 Gold for Egypt. Other civilizations' Trade Routes to Egypt provide +2 Food for them and +2 Gold for Egypt. Trading with Allies earns twice as many bonus Alliance Points.",
    "Leader Agenda": "Queen of the Nile:Likes civilizations with powerful militaries, and will try to ally with them to avoid conflict. Dislikes civilizations with weak militaries."
  },
  {
    "Leader": "Cyrus",
    "Civ": "Persian",
    "Leader Tags": "War; Culture",
    "Leader Bonus": "Fall Of Babylon:+2 Movement for the first 10 turns after declaring a Surprise War on a major civilzation. +5 Loyalty per turn in occupied cities with a garrisoned unit. Declaring a Surprise War only counts as a Formal War for the purposes of Grievances and warmongering.",
    "Leader Agenda": "Opportunist:Will often declare Suprise Wars, and likes civilizations that do the same. Dislikes civilizations who do not use Suprise War declarations."
  },
  {
    "Leader": "Dido",
    "Civ": "Phoenician",
    "Leader Tags": "Economy",
    "Leader Bonus": "Founder Of Carthage:Can move their original Capital to any city with a Cothon they founded by completing a unique project in that city. +1 Trade Route capacity for each Government Plaza building and the Government Plaza district. +50% Production towards districts in the city with the Government Plaza.",
    "Leader Agenda": "Sicilian Wars:Wants ot settle coastal cities, and likes civilizations that settle inland. Dislikes civilizations with many coastal cities"
  },
  {
    "Leader": "Eleanor of Aquitaine",
    "Civ": "English, French",
    "Leader Tags": "Economy",
    "Leader Bonus": "Court of Love:Great Works in Eleanor's cities each cause -1 Loyalty per turn in foreign cities within 9 tiles. A city that leaves another civilization due to a loss of Loyalty and is currently receiving the most Loyalty per turn from Eleanor's civilization skips the Free City step to join this civilization.",
    "Leader Agenda": "Angevin Empire:Builds up the Population of her cities, and likes likes those whose nearby cities also have a high Population. Dislikes civilizations whose nearby cities have low Population."
  },
  {
    "Leader": "Frederick Barbarossa",
    "Civ": "German",
    "Leader Tags": "War",
    "Leader Bonus": "Holy Roman Emperor:Additional Military policy slot. +7 Combat Strength when attacking city-states.",
    "Leader Agenda": "Iron Crown:Will try to conquer city-states, and likes civilizations who do not associate with them. Dislikes Suzerains of city-states, or civilizations who have conquered city-states."
  },
  {
    "Leader": "Gandhi",
    "Civ": "Indian",
    "Leader Tags": "Religion",
    "Leader Bonus": "Satyagraha:+5 Faith for each civilzation(including India) they have met that has founded a Religion and is not currently at war. Opposing civilizations receive double the war weariness fighting against Gandhi.",
    "Leader Agenda": "Peacekeeper:Never declares wars for which he can be branded a warmonger, and will try to befriend those who maintain the peace. Hates warmongers."
  },
  {
    "Leader": "Genghis Khan",
    "Civ": "Mongolian",
    "Leader Tags": "War",
    "Leader Bonus": "Mongol Horde:All cavalry class units gain +3 Combat Strength and a chance to capture defeated enemy cavalry class units.",
    "Leader Agenda": "Horse Lord:Builds a strong cavalry force, and likes those who do not compete in cavalry. Dislikes civilizations who rival him in cavalry strength."
  },
  {
    "Leader": "Gilgamesh",
    "Civ": "Sumerian",
    "Leader Tags": "Science",
    "Leader Bonus": "Adventures of Enkidu:When at war with a common foe, they and their allies share pillage rewards and share combat experience gains if within 5 tiles. Their Alliances gain Alliance Points for being at war with a common foe.",
    "Leader Agenda": "Ally of Enkidu:Is easy to befriend, and likes civilizations who are his Declared Friends. Dislikes anyone denouncing or attacking his friends."
  },
  {
    "Leader": "Gitarja",
    "Civ": "Indonesian",
    "Leader Tags": "",
    "Leader Bonus": "Exalted Goddes Of The Three Worlds:May purchase naval units with Faith. Religious units pay no movement cost to embark or disembark. City Centers adjacent to Coast or Lake tiles gain +2 Faith.",
    "Leader Agenda": "Archipelagic State:Likes civilizations who avoid settling or conquering cities on small landmasses. Hates anyone with numerous cities on such islands."
  },
  {
    "Leader": "Gorgo",
    "Civ": "Greek",
    "Leader Tags": "Culture",
    "Leader Bonus": "Thermopylae:Combat victories provide Culture equal to 50% of the Combat Strength of the defeated unit.",
    "Leader Agenda": "With Your Shield Or On It:Never gives up items in a peace deal, and likes civilizations who match that approach. Dislikes civilizations who have capitulated or who have never gone to war."
  },
  {
    "Leader": "Harald Hardrada",
    "Civ": "Norwegian",
    "Leader Tags": "War",
    "Leader Bonus": "Thunderbolt Of The North:Allows coastal raiding for all naval melee units and +50% Production toward all naval melee units. Receive Science from pillaging and coastal raiding Mines in addition to Gold. Pillaging or coastal raiding Quarries, Pastures, Plantations, and Camps provides Culture in addition to Faith. Gian the Viking Longship unique unit with Sailing.",
    "Leader Agenda": "Last Viking King:Builds a strong navy, and likes civilizations who do the same. Dislikes civilizations with a weak navy."
  },
  {
    "Leader": "Hojo Tokimune",
    "Civ": "Japanese",
    "Leader Tags": "Culture",
    "Leader Bonus": "Divine Wind:Land units receive +5 Combat Strength in land tiles adjacent to Coast; naval units receive +5 Combat Strength in shallow water tiles. Builds Encampment, Holy Site, and Theater Square districe in half the time. Units do not receive damage from Hurricanes. Civilizations that are at war with Japan receive +100% unit damage from Hurricanes in Japanese territory.",
    "Leader Agenda": "Bushido:Likes civilizations that have a strong military and Faith and Culture output. Dislikes civilizations that are strong in military but weak in Faith or Culture."
  },
  {
    "Leader": "Jadwiga",
    "Civ": "Polish",
    "Leader Tags": "",
    "Leader Bonus": "Lithuanian Union:Taking territory from a foreign city with a Culture Bomb converts it to Poland's religion. Relics provide +4 Gold, +2 Culture and +2 Faith. Holy Sites receive a +1 adjacency bonus from districts, instead of +0.5.",
    "Leader Agenda": "Saint:Focuses on building up Faith, and likes civilizations who do the same. Dislikes civilizations with a weak Faith output."
  },
  {
    "Leader": "Jayavarman VII",
    "Civ": "Khmer",
    "Leader Tags": "Religion",
    "Leader Bonus": "Monastaries Of The King:Holy Sites provide +2 Food and +1 Housing if adjacent to a river. Building a Holy Site triggers a Culture Bomb, claiming surrounding tiles.",
    "Leader Agenda": "An End to Suffering:Likes civilizations with many Holy Sites and with high average city Population. Dislikes civilizations lacking in either of these areas."
  },
  {
    "Leader": "John Curtin",
    "Civ": "Australian",
    "Leader Tags": "",
    "Leader Bonus": "Citadel Of Civilization:+100% Production if they have either received a declaration of war or liberated a city in the past 10 turns.",
    "Leader Agenda": "Perpetually on Guard:Forms Defensive Pacts with friends and likes civilizations that liberate cities. Dislikes civilizations that are occupying enemy cities."
  },
  {
    "Leader": "Kristina",
    "Civ": "Swedish",
    "Leader Tags": "Culture",
    "Leader Bonus": "Minerva Of The North:Buildings with at least three Great Work slots are automatically themed when they have all their slots filled. She may construct the Queen's Bibliotheque in the Government Plaza.",
    "Leader Agenda": "Bibliophile:Tries to collect as many Great Works as possible and likes those who leave them to her. Dislikes civilizations with many Great Works."
  },
  {
    "Leader": "Kupe",
    "Civ": "Māori",
    "Leader Tags": "Culture; Religion",
    "Leader Bonus": "Kupe's Voyage:Begin the game in an Ocean tile. Gain a free Builder unit and +1 Population when settling your first city. The Palace receives +3 Housing and +1 Amenity. +2 Science and +2 Culture per turn before you settle your first city.",
    "Leader Agenda": "Kaitiakitanga:Tries to avoid contributing to climate change by not removing features, planting Woods, and founding National Parks, and likes those who do the same. Dislikes civilizations that show little concern for the environment."
  },
  {
    "Leader": "Lautaro",
    "Civ": "Mapuche",
    "Leader Tags": "War",
    "Leader Bonus": "Swift Hawk:If a Mapuche Unit defeats an enemy unit within the borders of the enemy city, that city loses 20 Loyalty. Pillaging a plot in an enemy city causes it to lose 5 Loyalty.",
    "Leader Agenda": "Spirit of Tucapel:Tries to maintain a high degree of loyalty in his cities, and respects civilizations who do the same. Dislikes civilizations that fail to maintain the loyalty of their cities."
  },
  {
    "Leader": "Mansa Musa",
    "Civ": "Mali",
    "Leader Tags": "Economy; Religion",
    "Leader Bonus": "Sahel Merchants:International Trade Routes gian +1 Gold for every flat Desert tile in the origin city. Receive +1 Trade Capacity every time you enter a Golden Age.",
    "Leader Agenda": "Lord of the Mines:Tries to build up Gold, and likes those that also focus on Gold. Dislikes civilizations with weak Gold output."
  },
  {
    "Leader": "Matthias Corvinus",
    "Civ": "Hungarian",
    "Leader Tags": "War",
    "Leader Bonus": "Raven King:Levied units gain an ability giving them +2 Movement and +5 Combat Strength. It costs 75% less Gold and resources to upgrade Levied units. If you Levy troops from a City-State receive 2 Envoys with that City-State. Gain the Black Army unique unit when the Castles tehcnology is researched.",
    "Leader Agenda": "Raven Banner:Levies troops from city-states. Likes civilizations that also use city-state troops, dislikes those that shun such mercenaries."
  },
  {
    "Leader": "Montezuma",
    "Civ": "Aztec",
    "Leader Tags": "War",
    "Leader Bonus": "Gifts for the Tlatoani:Luxury resources in his territory provide an extra Amenity to 2 extra cities. Military units receive +1 Combat Strength when attacking for each different Luxury resource Improved in Aztec lands.",
    "Leader Agenda": "Tlatoani:Likes civilizations who have the same Luxury resources as he does, and will try to collect every Luxury resource available. Dislikes civilizations who have a new Luxury resource he has not yet collected."
  },
  {
    "Leader": "Mvemba a Nzinga",
    "Civ": "Kongolese",
    "Leader Tags": "Economy; Culture",
    "Leader Bonus": "Religious Convert:May not build Holy Site districts, gain Great Prophets, or found Religions. Gains all Beliefs of any Religion that has established itself in a majority of his cities. Receives an Apostle each time he finishes a M'banza or Theater Square district (of that city's majority religion.",
    "Leader Agenda": "Enthusiastic Disciple:Likes civilizations that bring Religion to the Kongo. Dislikes civilizations that have founded a Religion but not brought it to a Kongolese city."
  },
  {
    "Leader": "Pachacuti",
    "Civ": "Incan",
    "Leader Tags": "Economy",
    "Leader Bonus": "Qhapaq Ñan:Domestic Trade Routes gain +1 Food for every Mountain tile in the origin city. Gain the Qhapaq Ñan unique improvement with Foreign Trade.",
    "Leader Agenda": "Sapa Inca:Tries to settle near Mountains, and likes those who leave those areas to him. Dislikes civilizations that also settle near Mountains."
  },
  {
    "Leader": "Pedro II",
    "Civ": "Brazilian",
    "Leader Tags": "Culture",
    "Leader Bonus": "Magnanimous:After recruiting or patronizing a Great Person, 20% of its Great Person point cost is refunded.",
    "Leader Agenda": "Patron of the Arts:Likes civilizations who are not competing for Great People, and will recruit Great People whenever possible. Dislikes civilizations with more Great People than him."
  },
  {
    "Leader": "Pericles",
    "Civ": "Greek",
    "Leader Tags": "Culture",
    "Leader Bonus": "Surrounded By Glory:+5% Culture per city-state you are Suzerain of.",
    "Leader Agenda": "Delian League:Likes civilizations that aren't competing for the same city-state allegiance. Dislikes civilizations that are directly competing for city-state allegiance."
  },
  {
    "Leader": "Peter",
    "Civ": "Russian",
    "Leader Tags": "Faith",
    "Leader Bonus": "The Grand Embassy:Receives Science or Culture from Trade Routes to civilzations that are more advanced than Russia(+1 per 3 technologies or civics ahead).",
    "Leader Agenda": "Westernizer:Likes civilizations that are ahead of him in Science and Culture. Dislikes civilizations that are lagging in Science and Culture."
  },
  {
    "Leader": "Philip II",
    "Civ": "Spanish",
    "Leader Tags": "Faith",
    "Leader Bonus": "El Escorial:Inquisitors can Remove Heresy one extra time. Inquisitors eliminate 100% of the presence of other Religions. Combat units have a bonus of +4 Combat Strength against player following other Religions.",
    "Leader Agenda": "Counter Reformer:Likes civilizations who follow the same Religion, and wants his cities to all follow the same Religion. Hates anyone trying to spread their Religion into his empire."
  },
  {
    "Leader": "Poundmaker",
    "Civ": "Cree",
    "Leader Tags": "Economy",
    "Leader Bonus": "Favorable Terms:All Alliance types provide Shared Visibility. Your outgoing Trade Routes grant +1 Food to Poundmaker per Camp or Pasture at the destination. Trade Routes sent to your cities grant +1 Gold to Poundmaker per Camp or Pasture at the destination.",
    "Leader Agenda": "Iron Confederacy:Tries to establish as many Alliances as possible, and likes civilizations that do the same. Dislikes civilizations that don't establish Alliances."
  },
  {
    "Leader": "Qin Shi Huang",
    "Civ": "Chinese",
    "Leader Tags": "Culture",
    "Leader Bonus": "The First Emperor:When building Ancient or Classical wonders you may spend Builder charges to complete 15% of the original wonder cost. Builders receive an additional charge. Canals are unlocked with the Masonry technology.",
    "Leader Agenda": "Wall of 10,000 Li:Builds wonders whenever possible, and likes civilizations not competing for wonders. Dislikes civilizations with more wonders than him."
  },
  {
    "Leader": "Robert the Bruce",
    "Civ": "Scottish",
    "Leader Tags": "Culture; Economy; Science",
    "Leader Bonus": "Bannockburn:Can declare a War of Liberation after gaining the Defensive Tactics Civic. +100% Production and +2 Movement for the first 10 turns after declaring a War of Liberation.",
    "Leader Agenda": "Flower of Scotland:Will never attack his neighboring civilizations unless they break a promise to him, and dislikes anyone waging war on them. Likes civilizations not at war with his neighbors."
  },
  {
    "Leader": "Saladin",
    "Civ": "Arabian",
    "Leader Tags": "Religion; Science",
    "Leader Bonus": "Righteousness Of The Faith:The worship building for your Religion can be purchased by any player for just one-tenth of the usual Faith cost. This worship building is enhanced to add 10% to the Science, Faith, and Culture output of Arabian cities.",
    "Leader Agenda": "Ayyubid Dynasty:Wants his Worship building in as many cities as possible, and likes civilizations with it. Dislikes civilizations following other Religions or waging war on followers of his Religion."
  },
  {
    "Leader": "Seondeok",
    "Civ": "Korean",
    "Leader Tags": "Science",
    "Leader Bonus": "Hwarang:Governers established in a city provide +3% Culture and Science for each Promotion they have earned, including their first.",
    "Leader Agenda": "Cheomseongdae:Focuses on building up Science, and respects civilizations who do the same. Dislikes civilizations with a weak Science output."
  },
  {
    "Leader": "Shaka",
    "Civ": "Zulu",
    "Leader Tags": "War",
    "Leader Bonus": "Amabutho:May from Corps(Mercenaries Civic) and Armies(Nationalism Civic) earlier. An additional +5 Base Combat Strength to both Corps and Armies.",
    "Leader Agenda": "Horn, Chest, Loins:Tries to form as many Corps and Armies as possible, and likes those who follow his lead. Dislikes civilizations with few Corps and Armies."
  },
  {
    "Leader": "Suleiman",
    "Civ": "Ottoman",
    "Leader Tags": "War",
    "Leader Bonus": "Grand Vizier:Exclusive unique Governor with military and diplomatic abilities. Gain the Janissary unique unit when the Gunpowder technology is researched.",
    "Leader Agenda": "Lawgiver:Tries to keep his cities happy and loyal, and likes those who do the same, especially if the have taken cities from other civilizations. Dislikes those who struggle with happiness and loyalty, or that own few conquered cities."
  },
  {
    "Leader": "Tamar",
    "Civ": "Georgian",
    "Leader Tags": "Religion",
    "Leader Bonus": "Glory Of The World, Kingdom And Faith:+100% Faith for 10 turns after declaring a Protectorate War. Each Envoy you send to a city-state of your majority Religion counts as two Envoys. (Must have a majority Religion).",
    "Leader Agenda": "Narikala Fortress:Tries to put high level Walls around her cities and respects civilizations that do the same. Dislikes civilizations that fail to fortify their cities."
  },
  {
    "Leader": "Teddy Roosevelt",
    "Civ": "American",
    "Leader Tags": "Culture; War",
    "Leader Bonus": "Roosevelt Corollary:Units receive +5 Combat Strength on their home continent. +1 Appeal to all tiles in a city with a National Park. Gain the Rough Rider unique unit when they research the Rifling technology.",
    "Leader Agenda": "Big Stick Policy:Likes peaceful Civilizations that have a city on his home continent. hates civilizations starting wars on his continent."
  },
  {
    "Leader": "Tomyris",
    "Civ": "Scythian",
    "Leader Tags": "War; Faith",
    "Leader Bonus": "Killer of Cyrus:All units receive +5 Combat Strength when attacking wounded units. When they eliminate a unit, they heal up to 30 hit points.",
    "Leader Agenda": "Backstab Averse:Likes civilizations who are willing to establish a long-term Alliance with her. Hates civilizations who backstab and declare Suprise Wars."
  },
  {
    "Leader": "Trajan",
    "Civ": "Roman",
    "Leader Tags": "Economy; War",
    "Leader Bonus": "Trajan's Column:All cities start with an additional City Center building. (Starts with a Monument building in the Ancient era).",
    "Leader Agenda": "Optimus Princeps:Tries to include as much territory as possible in his empire, and respects those who do the same. Dislikes civilizations that control little territory."
  },
  {
    "Leader": "Victoria",
    "Civ": "English",
    "Leader Tags": "Economy",
    "Leader Bonus": "Pax Britannica:Each time you found your first city on a continent other than your home continent receive a free melee unit and a Trade Route capacity. Constructing any Royal Navy Dockyard grants you a copy of the strongest naval unit you can build. Gain the Redcoat unique unit when the Military Science technology is researched.",
    "Leader Agenda": "Sun Never Sets:Likes civilizations on her continent, and will try to expand to all continents. Dislikes civilizations on continents where she has no city."
  },
  {
    "Leader": "Wilfrid Laurier",
    "Civ": "Canadian",
    "Leader Tags": "Culture",
    "Leader Bonus": "The Last Best West:Allows Farms to be build on Tundra terrain. After Civil Engineering is unlocked Farms can be built on Tundra Hills. In Snow, Tundra, Snow Hills, and Tundra Hills, all Mines provide +1 Production, Lumber Mills provide +1 Production, Camps provide +1 Food, and strategic resource accumulation rate is +100%. Reduces the purchase cost of tiles in these terrain types by 50%.",
    "Leader Agenda": "Canadian Expeditionary Force:Responds to Emergencies whenever possible, and likes civilizations who do the same. Dislikes those that ignore Emergencies."
  },
  {
    "Leader": "Wilhelmina",
    "Civ": "Dutch",
    "Leader Tags": "Culture; Economy",
    "Leader Bonus": "Radio Oranje:Your Trade Routes to your own cities provide +1 Loyalty per turn for the starting city. Trade Routes to foreign cities or from foreign cities provide +1 Culture to you.",
    "Leader Agenda": "Billionare:Likes civilizations that send Trade Routes to her cities. Dislikes civilizations who refrain from sending her Trade Routes."
  }
]

var hiddenAgendas = [
  ['Airpower', `Tries to build up air power. Admires civilizations with 
    greater air power. Dislikes civilizations with weaker air power.`],
  ['Barbarian Ally', `Sympathizes with the barbarians. Does not like 
    civilizations that destroy barbarian outposts.`],
  ['City-State Ally', `Likes civilizations that aren't competing for the 
    same city-state allegiance. Dislikes civilizations that are directly 
    competing for city-state allegiance.`],
  ['City-State Protector', `Emphasizes protectorate wars. Admires 
    civilizations that start protectorate wars. Dislikes civilizations 
    that attack city-states.`],
  ['Civilized', `Hates barbarians. Likes civilizations that clear out 
    barbarian outposts. Does not like civilizations that ignore 
    barbarian outposts.`],
  ['Cultured', `Tries to build up Culture, and likes civilizations that also 
    focus on Culture.`],
  ['Darwinist', `Believes in survival of the fittest. Likes civilizations 
    that are at war.`],
  ['Devout', `Tries to build up Faith, and likes civilizations that also 
    focus on Faith.`],
  ['Disciplined', `Likes leaders that build wonders. Also, likes leaders 
    that have high production or those that have high scientific output. 
    Dislikes those that have fewer wonders than they do.`],
  ['Environmentalist', `Builds National Parks, doesn't clear features, 
    plants forests. Likes civilizations that plant forests or found 
    National Parks. Dislikes civilizations that clear features.`],
  ['Exploitative', `Clears all features and improves all possible tiles. 
    Likes civilizations with a high percentage of improved tiles. 
    Dislikes civilizations with a low percentage of improved tiles 
    or that found National Parks.`],
  ['Explorer', `Tries to explore the map, and likes civilizations that have 
    explored less of the map than itself and dislikes civilizations that 
    have explored more of the map than itself.`],
  ['Fun-Loving', `Tries to make citizens in each city as happy as possible. 
    Likes civilizations that also develop in this fashion.`],
  ['Gossip', 'Wants to know everything about everyone.'],
  ['Great Person Advocate', `Likes civilizations who are not competing for 
    Great People and will recruit Great People whenever possible. 
    Dislikes losing a Great Person to another civilization.`],
  ['Heavy Industry', `Tries to build up industry, and likes civilizations 
    that also focus on Production.`],
  ['Ideologue', `Favors civilizations with the same type of government, 
    dislikes civilizations that have different governments, and really 
    dislikes civilizations with different governments of the same era 
    as its own.`],
  ['Money Grubber', `Tries to have the highest possible Gold per turn 
    income. Respects other high income civilizations.`]
  ['Naturalist', `Tries to find all natural wonders. Likes civilizations 
    that keep Woods and Rainforests unchopped, and those that establish 
    National Parks.`],
  ['Nuke Happy', `Has no hesitation to use nuclear weapons. Respects other 
    civilizations that project strength with nuclear weapons.`],
  ['Paranoid', `Likes civilizations who pose no threat. Dislikes 
    civilizations with strong militaries or ones with nearby cities.`],
  ['Populous', `Tries to have the highest overall population. Respects 
    other high population civilizations.`],
  ['Standing Army', `Always tries to keep a large standing army. Respects 
    other civilizations with large armies.`],
  ['Sycophant', 'Impressed by any civilization that earns a Golden Age.'],
  ['Sympathizer', 'Feels bad for those going through Dark Ages.'],
  ['Technophile', `Favors Science development. Dislikes civs who are 
    behind technologically.`],
  ['Wonder Obsessed', `Likes civilizations not competing for wonders, 
    and builds wonders whenever possible. Dislikes losing a wonder to 
    another civilization.`],
  ['Flat Earther', `Wants to block humankind from circumnavigating the 
    globe or going into space.`]
]

var hiddenCount = []

for (var i = 0; i < hiddenAgendas.length; i++)
{
  hiddenCount.push(i)
}

//console.log(hiddenCount)

// messy way to handle leaders with special agenda possibilities
var specialAgendaList = {
  'Theodore Roosevelt': [[9], hiddenCount, hiddenCount],
  'Catherine de Medici': [[13], [13], [13], hiddenCount, hiddenCount, hiddenCount, hiddenCount,
    hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount,
    hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount],
  'Gandhi': [[18], [18], [18], [18], [18], [18], [18], [20], [20], hiddenCount],
  'Gorgo, Peter, Philip II': [[22], hiddenCount, hiddenCount, hiddenCount, hiddenCount,
    hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount],
  'Genghis Khan, Lautaro': [[23], hiddenCount, hiddenCount, hiddenCount, hiddenCount,
    hiddenCount, hiddenCount, hiddenCount, hiddenCount, hiddenCount]
}

// Creates the various buttons people use to select the leaders they want
$(document).ready(function() {
  // Here we create all the buttons for the user to select their leaders
  $.each(leaderData, function(i, item) {
    var button = `<button onclick="buttonClick('` + item['Leader'] + `')" id="` + item['Leader'].replace(/\s+/g, '-') + `-button" 
                  class="btn btn-outline-success leader-button text-dark mq4-hover-shim" role="button" aria-pressed="false" data-toggle="button">
                  <div class="container"><div class="row">
                  <div class="col"><img src="assets/civ_assets/leader-portraits/` + item['Leader'] + 
                  `.png" style="height: 50px; width: 50px;"></div><div class="col"><div class="row">` + item['Leader'] +
                  `</div><div class="row">\n` + item['Civ'] + `</div></div></div></div></button>`
              // <input class='leader-check' type="checkbox" checked autocomplete="off">` + this +'</button>'
    $('#leader-buttons').append(button)
  })

  $("button").on("touchstart", function() {
    $(this).removeClass("mobileHoverFix")
  })
  $("button").on("touchend", function() {
    $(this).addClass("mobileHoverFix")
  })
})




// This is the action that selects which leader they get
$('#random-leader-select-btn').click(function() {
  // var leaderPossibility = []
  // $('#leader-buttons .active').each(function() {
  //   // console.log($(this))
  //   leaderPossibility.push($(this).text().split('\n')[1].trim())
  // })
  randomLeaderFill(selected[Math.floor(Math.random() * selected.length)])
})

// This gives them a random hidden agenda, takes into account special leaders who have
// a greater or lesser chance of getting certain agendas
$('#hidden-agenda-btn').click(function() {
  var agenda_list
  var name = $('#leader-name').text()
  if (name === '')
  {
    agenda_list = hiddenCount
  }
  else if (name === 'Theodore Roosevelt')
  {
    agenda_list = specialAgendaList[name][Math.ceil(Math.random() * 3) - 1]
  }
  else if (name === 'Catherine de Medici')
  {
    agenda_list = specialAgendaList[name][Math.ceil(Math.random() * 20) - 1]
  }
  else if (name === 'Gandhi')
  {
    agenda_list = specialAgendaList[name][Math.ceil(Math.random() * 10) - 1]
  }
  else if (name === 'Gorgo' || name === 'Peter' || name === 'Philip II')
  {
    agenda_list = specialAgendaList['Gorgo, Peter, Philip II'][Math.ceil(Math.random() * 10) - 1]
  }
  else if (name === 'Genghis Khan' || name === 'Lautaro')
  {
    agenda_list = specialAgendaList['Genghis Khan, Lautaro'][Math.ceil(Math.random() * 10) - 1]
  }
  else
  {
    agenda_list = hiddenCount
  }
  var rand = Math.ceil(Math.random() * agenda_list.length) - 1
  hiddenAgendaFill(hiddenAgendas[agenda_list[rand]][0], hiddenAgendas[agenda_list[rand]][1])
})

// Fills in the leaders name correctly when they click it from the predictive menu
$('.typeahead').on('typeahead:selected', function(evt, item) {
  leaderAgendaFill(item, leaderAgenda[item], agendaDescription[leaderAgenda[item]])
})

// Typeahead predictive text for leader names
$('#civ-leaders .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'leaders',
  source: substringMatcher(Object.keys(leaders))
})
