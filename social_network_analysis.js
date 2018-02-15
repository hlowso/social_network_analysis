var data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"]
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"]
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"]
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"]
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"]
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"]
  }
};


// 1. List everyone and for each of them, list the names of who they follow and who follows them
function getNames(data, index_data) {
  if(typeof index_data === "string") {
    return data[index_data].name;
  }
  else {
    var names = [];
    for(var index_index in index_data) {
      names.push(data[index_data[index_index]].name);
    }
    return names;
  }}
function getFollowings(data) {
  var followings = {};
  for(var user_index in data) {
    user = data[user_index];
    for (var followee_index in user.follows) {
      followee = user.follows[followee_index];
      if(followings[followee]) {
        followings[followee].push(user_index);
      }
      else {
        followings[followee] = [user_index];
      }
    }
  }
  return followings; }
function listEveryone(data) {
  followings = getFollowings(data);
  for(var user_index in data){
    user = data[user_index];
    console.log(user.name);
    console.log("\tfollows:", getNames(data, user.follows).toString().split(',').join(', '));
    console.log("\tfollowed by:", getNames(data, followings[user_index]).toString().split(',').join(', '));
  }}

// 2. Identify who follows the most people
function oldFollowsMost(data) {
  var most_follows = 0;
  var follower;
  for(var user_index in data){
    user = data[user_index];
    var count = user.follows.length;
    if(count > most_follows) {
      follower = user.name;
      most_follows = count;
    }
  }
  return follower;}

// 3. Identify who has the most followers
function oldMostFollowed(data) {
  followings = getFollowings(data);
  var most_followers = 0;
  var followed = [];
  for(var user_index in followings) {
    var count = followings[user_index].length;
    if(count > most_followers) {
      most_followers = count;
    }
  }
  for(user_index in followings) {
    var count = followings[user_index].length;
    if(count === most_followers) {
      followed.push(getNames(data, user_index));
    }
  }
  return followed;}

// 4. Identify who has the most followers over 30
function getAges(data, index_data) {
  if(typeof index_data === "string") {
    return data[index_data].age;    
  }
  else {
    ages = [];
    for(var i = 0; i < index_data.length; i ++) {
      ages.push(getAges(data, index_data[i]));
    }
    return ages; 
  }}
function mostFollowed(data, age) {
  followings = getFollowings(data);
  var most_followers = 0;
  var followed = [];
  for(var user_index in followings) {

    var followers = followings[user_index];
    var ages = getAges(data, followers);

    var count = 0;
    for(var i = 0; i < ages.length; i ++){
      if(ages[i] > age) count ++;
    }

    if(count > most_followers) {
      most_followers = count;
    }
  }
  for(user_index in followings) {
    var count = followings[user_index].length;
    if(count === most_followers) {
      followed.push(getNames(data, user_index));
    }
  }
  return followed;}

// 5. Identify who follows the most people over 30
function followsMost(data, age) {
  var most_follows = 0;
  var followers = {};
  for(var user_index in data){
    user = data[user_index];
    var ages = getAges(data, user.follows);

    var count = 0;
    for(var i = 0; i < ages.length; i ++){
      if(ages[i] > age) count ++;
    }
    if(count > most_follows) {
      follower = user.name;
      most_follows = count;
    }
  }
  return follower;}

// 6. List those who follow someone that doesn't follow them back
function follows(data, user_index_1, user_index_2) {
  others = data[user_index_1].follows;
  return others.indexOf(user_index_2) >= 0;}
function iAmALoser(data, user_index) {
  others = data[user_index].follows;
  for(var other_index in others) {
    if(!follows(data, others[other_index], user_index)) return true;
  }
  return false;}
function listLosers(data) {
  var list = [];
  for(var user_index in data) {
    if(iAmALoser(data, user_index)) {
      list.push(getNames(data, user_index));
    }
  }
  return list;}

// 7. List everyone and their reach (sum of # of followers and # of followers of followers)
function sumFollowers(followings, user_index) {
  return followings[user_index].length;
}

function listReaches(data) {
  followings = getFollowings(data);
  for(var user_index in data) {
    var user = data[user_index];
    var reach = sumFollowers(followings, user_index);
    for(var other_index in user.follows) {
      reach += sumFollowers(followings, user.follows[other_index]);
    }
    console.log(user.name, "reaches", reach);
  }
}






