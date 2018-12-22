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
      // console.log('Found it')
      $('#agenda-title').text(leaderAgenda[matches[0]]) 
      $('#leader-agenda .agenda-text').text(agendaDescription[leaderAgenda[matches[0]]])
    }
    else
    {
      $('#agenda-title').text('')
      $('#leader-agenda .agenda-text').text('')
    }

    cb(matches)
  };
};

var leaders = [
  'Alexander',
  'Amanitore',
  'Catherine de Medici',
  'Chandragupta',
  'Cleopatra',
  'Cyrus',
  'Frederick Barbarossa',
  'Gandhi',
  'Genghis Khan',
  'Gilgamesh',
  'Gitarja',
  'Gorgo',
  'Harald Hardrada',
  'Hojo Tokimune',
  'Jadwiga',
  'Jayavarman VII',
  'John Curtin',
  'Lautaro',
  'Matthias Corvinus',
  'Montezuma',
  'Mvemba a Nzinga',
  'Pedro II',
  'Pericles',
  'Peter',
  'Philip II',
  'Poundmaker',
  'Qin Shi Huang',
  'Robert the Bruce',
  'Saladin',
  'Seondeok',
  'Shaka',
  'Tamar',
  'Theodore Roosevelt',
  'Tomyris',
  'Trajan',
  'Victoria',
  'Wilhelmina'
  ]

var leaderAgenda = {
  'Gilgamesh': 'Ally of Enkidu',
  'Jayavarman VII': 'An End to Suffering',
  'Gitarja': 'Archipelagic State',
  'Saladin': 'Ayyubid Dynasty',
  'Tomyris': 'Backstab Averse',
  'Theodore Roosevelt': 'Big Stick Policy',
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
  'Matthias Corvinus': 'Raven Banner',
  'Jadwiga': 'Saint',
  'Alexander': 'Short Life of Glory',
  'Lautaro': 'Spirit of Tucapel',
  'Victoria': 'Sun Never Sets',
  'Montezuma': 'Tlatoani',
  'Qin Shi Huang': 'Wall of 10,000 Li',
  'Peter': 'Westernizer',
  'Gorgo': 'With Your Shield Or On It'
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
    who have capitulated or who have never gone to war.`
}

var hiddenAgendas = {
  'Airpower': `Tries to build up air power. Admires civilizations with 
    greater air power. Dislikes civilizations with weaker air power.`,
  'Barbarian Ally': `Sympathizes with the barbarians. Does not like 
    civilizations that destroy barbarian outposts.`,
  'City-State Ally': `Likes civilizations that aren't competing for the 
    same city-state allegiance. Dislikes civilizations that are directly 
    competing for city-state allegiance.`,
  'City-State Protector': `Emphasizes protectorate wars. Admires 
    civilizations that start protectorate wars. Dislikes civilizations 
    that attack city-states.`,
  'Civilized': `Hates barbarians. Likes civilizations that clear out 
    barbarian outposts. Does not like civilizations that ignore 
    barbarian outposts.`,
  'Cultured': `Tries to build up Culture, and likes civilizations that also 
    focus on Culture.`,
  'Darwinist': `Believes in survival of the fittest. Likes civilizations 
    that are at war.`,
  'Devout': `Tries to build up Faith, and likes civilizations that also 
    focus on Faith.`,
  'Disciplined': `Likes leaders that build wonders. Also, likes leaders 
    that have high production or those that have high scientific output. 
    Dislikes those that have fewer wonders than they do.`,
  'Environmentalist': `Builds National Parks, doesn't clear features, 
    plants forests. Likes civilizations that plant forests or found 
    National Parks. Dislikes civilizations that clear features.`,
  'Exploitative': `Clears all features and improves all possible tiles. 
    Likes civilizations with a high percentage of improved tiles. 
    Dislikes civilizations with a low percentage of improved tiles 
    or that found National Parks.`,
  'Explorer': `Tries to explore the map, and likes civilizations that have 
    explored less of the map than itself and dislikes civilizations that 
    have explored more of the map than itself.`,
  'Fun-Loving': `Tries to make citizens in each city as happy as possible. 
    Likes civilizations that also develop in this fashion.`,
  'Gossip': 'Wants to know everything about everyone.',
  'Great Person Advocate': `Likes civilizations who are not competing for 
    Great People and will recruit Great People whenever possible. 
    Dislikes losing a Great Person to another civilization.`,
  'Heavy Industry': `Tries to build up industry, and likes civilizations 
    that also focus on Production.`,
  'Ideologue': `Favors civilizations with the same type of government, 
    dislikes civilizations that have different governments, and really 
    dislikes civilizations with different governments of the same era 
    as its own.`,
  'Money Grubber': `Tries to have the highest possible Gold per turn 
    income. Respects other high income civilizations.`,
  'Naturalist': `Tries to find all natural wonders. Likes civilizations 
    that keep Woods and Rainforests unchopped, and those that establish 
    National Parks.`,
  'Nuke Happy': `Has no hesitation to use nuclear weapons. Respects other 
    civilizations that project strength with nuclear weapons.`,
  'Paranoid': `Likes civilizations who pose no threat. Dislikes 
    civilizations with strong militaries or ones with nearby cities.`,
  'Populous': `Tries to have the highest overall population. Respects 
    other high population civilizations.`,
  'Standing Army': `Always tries to keep a large standing army. Respects 
    other civilizations with large armies.`,
  'Sycophant': 'Impressed by any civilization that earns a Golden Age.',
  'Sympathizer': 'Feels bad for those going through Dark Ages.',
  'Technophile': `Favors Science development. Dislikes civs who are 
    behind technologically.`,
  'Wonder Obsessed': `Likes civilizations not competing for wonders, 
    and builds wonders whenever possible. Dislikes losing a wonder to 
    another civilization.`
}

$('.typeahead').on('typeahead:selected', function(evt, item) {
  $('#agenda-title').text(leaderAgenda[item])
  $('#leader-agenda .agenda-text').text(agendaDescription[leaderAgenda[item]])
})

$('#civ-leaders .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'leaders',
  source: substringMatcher(leaders)
})
