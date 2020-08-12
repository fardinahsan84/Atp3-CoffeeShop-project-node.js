var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();




router.get('/AllFoodItem', function(req, res){

	userModel.getAllFood(function(results){
    console.log(results);
		res.render('home/allFood', { userList : results, username: req.session.username});
	});
});

router.get('/create', function(req, res){
	res.render('home/add');
});


router.post('/create', function(req, res){

	var user ={
    name        :req.body.name,
    price       :req.body.price,
    status      :req.body.status,
    ingredients :req.body.ingredients

	}

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});


router.get('/editProfile/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('manager/edit', {user: result});
	});

});

router.post('/editProfile/:id', function(req, res){

  var user = {
    password     :req.body.password,
    email     	 :req.body.email,
    phone 			 :req.body.phone,
		address      :req.body.address,
		id           :req.params.id
	}

	userModel.updateManager(user, function(status){
		if(status){
			res.redirect('/home');
		}else{
			res.redirect('/manager/editProfile/'+req.params.id);
		}
	});
});

router.get('/edit/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});

});

router.post('/edit/:id', function(req, res){

  var user = {
    price       :req.body.price,
    status      :req.body.status,
    ingredients :req.body.ingredients,
		id          :req.params.id
	}

	userModel.update(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/suggest/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/suggest', {user: result});
	});

});

router.post('/suggest/:id', function(req, res){
	var user={
		suggested	:req.body.suggested,
		id :req.params.id
	}
	userModel.updateSuggest(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/delete/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});

});

router.post('/delete/:id', function(req, res){

	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

module.exports = router;
