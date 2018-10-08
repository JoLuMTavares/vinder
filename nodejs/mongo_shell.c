 db.things.find({$or : [{$and : [{ x : {$gt : 0}}, {x : {$lt : 5}}]}, {$and : [{ x : {$gt : 15}}, {x : {$lt : 20}}]}]})


db.things.copy


db.things.find({x : {$gt : 10}}).forEach(function(document) {
db.otherThings.insert(document)
});

db.things.find({x : {$mod : [2, 0]}}).forEach(function(document) {
db.evenThings.insert(document)
});


db.evenThings.remove({x : {$mod : [2, 1]}});


db.students.insert([
{name : 'mark', age : 31, subjects : ['mathematics', 'journalism', 'programming'], gender : 'm'},
{name : 'sandra', age : 28, subjects : ['sport', 'german', 'english'], gender : 'f'},
{name : 'paul', age : 20, subjects : ['history', 'english', 'mathematics'], gender : 'm'},
{name : 'stefan', age : 22, subjects : ['arabic', 'english', 'history'], gender : 'm'},
{name : 'Katja', age : 29, subjects : ['history', 'german', 'arabic'], gender : 'f'},
{name : 'julia', age : 25, subjects : ['german', 'sport', 'arabic'], gender : 'f'}
]);


db.students.find({$or : [{name : "sandra"}, {name : "katja"}]});


db.students.find({$or : [{name : "sandra"}, {age : {$gt : 25}}]});


db.students.find().forEach(function(current) {current.subjects  : 'arabic'}); SYNTAX NOT CORRECT YET

db.students.find({subjects['arabic']});


db.students.find({subjects : { $in : ['arabic']}});

db.students.find({$and : [{ $and : [{age : {$gt : 25}}, {age : {$lt : 30}}]}, {subjects : { $in : ['history']}}]});

db.students.find({$and : [{age : {$gt : 25}}, {age : {$lt : 30}}, {subjects : { $in : ['history']}}]}).pretty();

db.students.find({subjects : {$nin : ['history']}});

db.students.find({subjects : {$not : {$in : ['history']}}});

db.students.find({$and : [{subjects : {$in : ['mathematics']}}, {subjects : {$nin : ['sport']}}]});


// Aggregation

db.students.aggregate({ $group : {_id : '$gender'}});

// Adding aggregation function to the sum

db.students.aggregate({ $group : {_id : '$gender', maxage : {$max : "$age"}}});

db.students.aggregate({ $group : {_id : '$gender', minage : {$min : "$age"}}});

db.students.aggregate({ $group : {_id : '$gender', avgage : {$avg : "$age"}}});

db.students.aggregate({ $group : {_id : '$null', avgage : {$avg : "$age"}}});

db.students.aggregate(
	{ $group : 
		{
			{ $group : {_id : '$gender', avgage : {$avg : "$age"}}}, 
			  avg_age_all : {$avg : "$age"}
			}
		}
	});
